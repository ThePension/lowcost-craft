import { mat4, vec3 } from "gl-matrix";
import { Cube } from "./cube";
import { Camera } from "./camera";
import { ShaderHelper } from "./helpers/shader-helper";
import { Chunk } from "./chunk";

/*
 * Variables declaration
 */

const camera: Camera = new Camera();

const uniformBufferSize = 16 * 4; // Taille de la matrice de transformation
let uniformBuffer: GPUBuffer;
let instanceBuffer: GPUBuffer;
let vertexBuffer: GPUBuffer;

let bindGroupLayout: GPUBindGroupLayout;
let bindGroup: GPUBindGroup;

let instanceBindGroupLayout: GPUBindGroupLayout;
let instanceBindGroup: GPUBindGroup;

let textureBindGroupLayout: GPUBindGroupLayout;
let textureBindGroup: GPUBindGroup;

let depthTexture: GPUTexture;

let instanceBufferData: Float32Array;

let atlasTexture: GPUTexture;
let sampler: GPUSampler;

const CHUNK_SIZE = 16; // Taille d'un chunk en blocs
const chunks = new Map<string, Chunk>();

const VIEW_DISTANCE = 5; // Nombre de chunks autour de l'utilisateur à charger
const activeChunks = new Map<string, Chunk>();
let numberOfVisibleCubes = 0;

function getChunkKey(x: number, z: number): string {
  const chunkX = Math.floor(x / CHUNK_SIZE);
  const chunkZ = Math.floor(z / CHUNK_SIZE);
  return `${chunkX},${chunkZ}`;
}


function getChunksInViewRange(playerX: number, playerZ: number, direction: vec3): Set<string> {
  const playerChunkX = playerX - (playerX % CHUNK_SIZE);
  const playerChunkZ = playerZ - (playerZ % CHUNK_SIZE);

  const chunksToLoad = new Set<string>();

  for (let dx = -VIEW_DISTANCE * CHUNK_SIZE; dx <= VIEW_DISTANCE * CHUNK_SIZE; dx += CHUNK_SIZE) {
    for (let dz = -VIEW_DISTANCE * CHUNK_SIZE; dz <= VIEW_DISTANCE * CHUNK_SIZE; dz += CHUNK_SIZE) {
      const chunkX = playerChunkX + dx;
      const chunkZ = playerChunkZ + dz;
      const chunkKey = `${chunkX},${chunkZ}`;

      // Calculer la direction vers le chunk
      const chunkDirection = vec3.normalize(
        vec3.create(),
        vec3.fromValues(chunkX - playerX, 0, chunkZ - playerZ)
      );

      // Calculer l'angle entre la direction de l'utilisateur et celle du chunk
      const dotProduct = vec3.dot(direction, chunkDirection);
      const angle = Math.acos(dotProduct);

      // Vérifier si l'angle est dans le champ de vision (45 degrés de chaque côté)
      if (angle <= Math.PI / 2) { // 45 degrés en radians
        chunksToLoad.add(chunkKey);
      }
    }
  }

  return chunksToLoad;
}

function getActiveAdjacentChunks(chunkX: number, chunkZ: number): Chunk[] {
  var adjacentChunks: Chunk[] = [];

  for (let dx = -1; dx <= 1; dx += 1) {
    for (let dz = -1; dz <= 1; dz += 1) {
      const adjacentChunkX = Math.floor(chunkX / CHUNK_SIZE) + dx;
      const adjacentChunkZ = Math.floor(chunkZ / CHUNK_SIZE) + dz;

      const adjacentChunkKey = `${adjacentChunkX},${adjacentChunkZ}`;

      if (chunks.has(adjacentChunkKey)) {
        console.log("Has value", adjacentChunkKey)
        adjacentChunks.push(chunks.get(adjacentChunkKey));
      }
    }
  }

  return adjacentChunks;
}



// Remplit le monde avec des cubes et utilise le masque de faces
const worldSet = new Set<string>();

// Generate chunks
for (let i = -VIEW_DISTANCE * CHUNK_SIZE; i < VIEW_DISTANCE * CHUNK_SIZE; i += CHUNK_SIZE) {
  for (let j = -VIEW_DISTANCE * CHUNK_SIZE; j < VIEW_DISTANCE * CHUNK_SIZE; j += CHUNK_SIZE) {
  
    const chunkKey = getChunkKey(i, j);
    if (!chunks.has(chunkKey)) {
      const chunk = new Chunk([i, j]);
      chunk.generateChunk();
      chunks.set(chunkKey, chunk);

      activeChunks.set(chunkKey, chunk);

      // Update worldSet with chunk cubes
      chunk.cubes.keys().forEach((key) => {
        worldSet.add(key);
      });
    }
  }
}

// chunks.forEach((chunk) => chunk.calculateFaceMasks(worldSet));

function updateInstanceBufferWithChunk(device: GPUDevice) {
  let numberOfVisibleCubesLocal = 0;

  activeChunks.forEach((chunk) => {
    numberOfVisibleCubesLocal += [...chunk.cubes]
    .filter(([, cube]) => cube.faceMask > 0 ).length;
  });

  if (numberOfVisibleCubesLocal === 0 || numberOfVisibleCubesLocal === numberOfVisibleCubes) {
    return;
  }

  numberOfVisibleCubes = numberOfVisibleCubesLocal;

  instanceBufferData = new Float32Array(numberOfVisibleCubesLocal * (4 * 4 + 2 + 1 + 1)); // modelMatrix (64 octets) + textureCoords (8 octets) + faceMask (4 octets) + padding (4 octets)

  let instanceIndex = 0; // Pour suivre l'index d'instance dans instanceBufferData

  activeChunks.forEach((chunk) => {
    [...chunk.cubes]
      .map(([, cube]) => cube)
      .filter((cube) => cube.faceMask > 0 ).forEach((cube) => {
      const baseIndex = instanceIndex * (4 * 4 + 2 + 1 + 1); // Calcule l'offset de l'instance actuelle

      instanceBufferData.set(cube.modelMatrix, baseIndex);
      instanceBufferData.set(cube.textureCoords, baseIndex + 4 * 4);

      instanceBufferData[baseIndex + 4 * 4 + 2] = cube.faceMask;

      instanceIndex++;
    });
  });

  instanceBuffer = device.createBuffer({
    label: "instanceBuffer",
    size: instanceBufferData.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });

  
  instanceBindGroup = device.createBindGroup({
    layout: instanceBindGroupLayout,
    entries: [{ binding: 1, resource: { buffer: instanceBuffer } },],
  });

  // Transmettre les données mises à jour au GPU
  device.queue.writeBuffer(instanceBuffer, 0, instanceBufferData);
}


function updateChunks(device: GPUDevice, playerX: number, playerZ: number, direction: vec3) {
  const chunksInView = getChunksInViewRange(playerX, playerZ, direction);

  // If chunksInView is empty, or there are no new chunks, return
  let areChunksEqual = true;

  chunksInView.forEach((chunkKey) => {
    if (!activeChunks.has(chunkKey)) {
      areChunksEqual = false;
      return;
    }
  });

  if (areChunksEqual) {
    return;
  }

  // Charger les nouveaux chunks nécessaires
  chunksInView.forEach((chunkKey) => {
    if (!activeChunks.has(chunkKey)) {
      // Si le chunk n'est pas chargé, crée-le et ajoute-le aux chunks actifs
      const [chunkX, chunkZ] = chunkKey.split(",").map(Number);

      const chunk = new Chunk([chunkX, chunkZ]);
      chunk.generateChunk();
      activeChunks.set(chunkKey, chunk);

      // Update face masks of each adjacent chunk
      // const adjacentChunks = getActiveAdjacentChunks(chunkX, chunkZ);

      // worldSet.clear();

      // Update worldSet with chunk cubes
      // chunk.cubes.keys().forEach((key) => {
      //   worldSet.add(key);
      // });

      // adjacentChunks.forEach((adjacentChunk) => {
      //   adjacentChunk.cubes.keys().forEach((key) => {
      //     worldSet.add(key);
      //   });
      // });

      // chunk.calculateFaceMasks(worldSet);

      // adjacentChunks.forEach((adjacentChunkKey) => {
      //   adjacentChunkKey.calculateFaceMasks(worldSet);
      // });
    }
  });

  // Décharger les chunks en dehors de la zone de vue
  activeChunks.forEach((chunk, chunkKey) => {
    if (!chunksInView.has(chunkKey)) {
      activeChunks.delete(chunkKey);
      // Suppression du chunk du buffer GPU peut être ajoutée si nécessaire
    }
  });

  worldSet.clear();

  // Update worldSet with chunk cubes
  activeChunks.forEach((chunk) => {
    chunk.cubes.keys().forEach((key) => {
      worldSet.add(key);
    });
  });

  // Update every faceMask
  activeChunks.forEach((chunk) => {
    chunk.calculateFaceMasks(worldSet);
  });

  // Mettre a jour les instances des chunks actifs
  updateInstanceBufferWithChunk(device);
}


function initBuffers(device: GPUDevice) {
  let numberOfCubes = 0;

  activeChunks.forEach((chunk) => {
    numberOfCubes += chunk.cubes.size;
  });

  instanceBufferData = new Float32Array(numberOfCubes * (4 * 4 + 2 + 1 + 1)); // modelMatrix (64 octets) + textureCoords (8 octets) + faceMask (4 octets) + padding (4 octets)

  uniformBuffer = device.createBuffer({
    label: "uniformBuffer",
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  vertexBuffer = device.createBuffer({
    label: "vertexBuffer",
    size: Cube.cubeVertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  let instanceIndex = 0; // Pour suivre l'index d'instance dans instanceBufferData

  activeChunks.forEach((chunk) => {
    chunk.cubes.forEach((cube) => {
      const baseIndex = instanceIndex * (4 * 4 + 2 + 1 + 1); // Calcule l'offset de l'instance actuelle

      instanceBufferData.set(cube.modelMatrix, baseIndex);
      instanceBufferData.set(cube.textureCoords, baseIndex + 4 * 4);

      instanceBufferData[baseIndex + 4 * 4 + 2] = cube.faceMask;

      instanceIndex++;
    });
  });

  instanceBuffer = device.createBuffer({
    label: "instanceBuffer",
    size: instanceBufferData.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
}

function initBinding(device: GPUDevice) {
  bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX,
        buffer: { type: "uniform" },
      },
    ],
  });

  bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
  });

  instanceBindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 1,
        visibility: GPUShaderStage.VERTEX,
        buffer: { type: "read-only-storage" },
      },
    ],
  });

  instanceBindGroup = device.createBindGroup({
    layout: instanceBindGroupLayout,
    entries: [{ binding: 1, resource: { buffer: instanceBuffer } },],
  });

  textureBindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { sampleType: "float" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        sampler: {},
      },
    ],
  });

  textureBindGroup = device.createBindGroup({
    layout: textureBindGroupLayout,
    entries: [
      { binding: 0, resource: atlasTexture.createView() },
      { binding: 1, resource: sampler },
    ],
  });
}

async function init(device: GPUDevice, context: GPUCanvasContext) {
  initBuffers(device);

  atlasTexture = await ShaderHelper.loadAtlasTexture(
    device,
    "basic_atlas.png"
  );

  sampler = device.createSampler({
    magFilter: "linear",
    minFilter: "linear",
  });

  initBinding(device);

  depthTexture = device.createTexture({
    size: [canvas!.width, canvas!.height],
    format: "depth24plus",
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });

  const projectionMatrix = mat4.create();
  mat4.perspective(
    projectionMatrix,
    Math.PI / 4,
    canvas!.width / canvas!.height,
    0.1,
    500
  );

  device.queue.writeBuffer(instanceBuffer, 0, instanceBufferData);

  device.queue.writeBuffer(vertexBuffer, 0, Cube.cubeVertices);

  const indexBuffer = device.createBuffer({
    size: Cube.cubeIndices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(indexBuffer, 0, Cube.cubeIndices);

  const vertexShaderModule = await ShaderHelper.loadShaderModuleFromFile(
    device,
    "shaders/vertex.wgsl"
  );
  const fragmentShaderModule = await ShaderHelper.loadShaderModuleFromFile(
    device,
    "shaders/fragment.wgsl"
  );

  function updateViewMatrix() {
    const viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, camera.position, camera.target, camera.up);

    const viewProjectionMatrix = mat4.create();
    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);
    device.queue.writeBuffer(
      uniformBuffer,
      0,
      viewProjectionMatrix as Float32Array
    );
  }

  const pipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({
      bindGroupLayouts: [
        bindGroupLayout,
        instanceBindGroupLayout,
        textureBindGroupLayout,
      ],
    }),
    vertex: {
      module: vertexShaderModule,
      entryPoint: "vertexMain",
      buffers: [
        {
          arrayStride: 8 * 4, // Position (3) + UV (2) + Normale (3)
          attributes: [
            { shaderLocation: 0, offset: 0, format: "float32x3" },
            { shaderLocation: 1, offset: 3 * 4, format: "float32x2" },
            { shaderLocation: 2, offset: 5 * 4, format: "float32x3" }, // Normale
          ],
        },
      ],
    },
    fragment: {
      module: fragmentShaderModule,
      entryPoint: "fragmentMain",
      targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }],
    },
    primitive: {
      topology: "triangle-list",
      cullMode: "none",
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: "less",
      format: "depth24plus",
    },
  });

  let then = 0;

  function render() {
    // Mettre à jour la position de la caméra
    camera.updateCameraPosition();

    updateChunks(device, camera.position[0], camera.position[2], camera.direction); 

    // Mettre à jour la direction de la caméra
    camera.updateCameraDirection();

    // Mettre à jour la matrice de vue en fonction de la nouvelle position
    updateViewMatrix();

    const now = performance.now() / 1000;
    const deltaTime = now - then;
    then = now;

    const startTime = performance.now();

    const commandEncoder = device.createCommandEncoder();

    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          loadOp: "clear",
          clearValue: { r: 0.5, g: 0.8, b: 1.0, a: 1 },
          storeOp: "store",
        },
      ],
      depthStencilAttachment: {
        view: depthTexture.createView(),
        depthLoadOp: "clear",
        depthClearValue: 1.0,
        depthStoreOp: "store",
      },
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

    passEncoder.setPipeline(pipeline);
    passEncoder.setVertexBuffer(0, vertexBuffer);
    passEncoder.setIndexBuffer(indexBuffer, "uint16");

    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.setBindGroup(1, instanceBindGroup);
    passEncoder.setBindGroup(2, textureBindGroup);
    passEncoder.drawIndexed(36, numberOfVisibleCubes, 0, 0, 0); // Dessine numCubes instances
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);

    const jsTime = performance.now() - startTime;

    infoElem!.textContent = `\
        fps: ${(1 / deltaTime).toFixed(1)}
        js: ${jsTime.toFixed(1)}ms
        `;

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

const infoElem = document.querySelector("#info");

const canvas = document.querySelector("canvas");

if (canvas === null) {
  throw new Error("Canvas not found");
}

// browser size
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let adapter: GPUAdapter | null;

navigator.gpu.requestAdapter().then((gpuAdapter) => {
  adapter = gpuAdapter;

  if (adapter === null) {
    throw new Error("WebGPU not supported");
  }

  let device: GPUDevice | null = null;

  adapter.requestDevice().then((gpuDevice) => {
    device = gpuDevice;

    const context = canvas.getContext("webgpu");

    if (context === null) {
      throw new Error("WebGPU context not found");
    }

    context.configure({
      device: device,
      format: navigator.gpu.getPreferredCanvasFormat(),
    });

    init(device, context);
  });
});
