import { mat4, vec3 } from "gl-matrix";
import { Cube } from "./cube";
import { Camera } from "./camera";
import { ShaderHelper } from "./helpers/shader-helper";
import { createNoise2D } from 'simplex-noise';

/*
 * Variables declaration
 */

const noise2D = createNoise2D();

const camera: Camera = new Camera();

const uniformBufferSize = 16 * 4; // Taille de la matrice de transformation
let uniformBuffer: GPUBuffer;
let instanceBuffer: GPUBuffer;

let bindGroupLayout: GPUBindGroupLayout;
let bindGroup: GPUBindGroup;

let instanceBindGroupLayout: GPUBindGroupLayout;
let instanceBindGroup: GPUBindGroup;

let depthTexture: GPUTexture;

let cubes: Cube[] = [];

const worldWidth = 100;
const worldMinHeight = -10;

const amplitude = 10;      // Hauteur maximale en blocs
const frequency = 0.01;     // Fréquence du bruit (plus petit pour plus doux)

for (let i = 0; i < worldWidth; i++) {
  for (let j = 0; j < worldWidth; j++) {
    let x = i - worldWidth / 2;
    let z = j - worldWidth / 2;

    // Appliquer la fréquence au bruit et multiplier par l'amplitude
    let y = noise2D(x * frequency, z * frequency) * amplitude;

    // Convertir la hauteur en entier
    y = Math.floor(y);

    // Remplir les blocs en dessous jusqu'à la hauteur minimale
    for (let k = worldMinHeight; k <= y; k++) {
      const position: vec3 = [x, k, z];
      cubes.push(new Cube(position, [1, 1, 1], [1, 1, 1]));
    }
  }
}

function initBuffers(device: GPUDevice) {
  uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  instanceBuffer = device.createBuffer({
    size: cubes.length * 4 * 16, // 16 floats par matrice de 4x4
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
    entries: [{ binding: 1, resource: { buffer: instanceBuffer } }],
  });
}

async function init(device: GPUDevice, context: GPUCanvasContext) {
  initBuffers(device);
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
    100
  );

  const vertexBuffer = device.createBuffer({
    size: Cube.cubeVertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, 0, Cube.cubeVertices);

  const indexBuffer = device.createBuffer({
    size: Cube.cubeIndices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(indexBuffer, 0, Cube.cubeIndices);

  for (let i = 0; i < cubes.length; i++) {
    device.queue.writeBuffer(
      instanceBuffer,
      i * 4 * 16,
      cubes[i].modelMatrix as Float32Array
    );
  }

  const vertexShaderModule = await ShaderHelper.loadShaderModuleFromFile(
    device,
    "./shaders/vertex.wgsl"
  );
  const fragmentShaderModule = await ShaderHelper.loadShaderModuleFromFile(
    device,
    "./shaders/fragment.wgsl"
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
      bindGroupLayouts: [bindGroupLayout, instanceBindGroupLayout],
    }),
    vertex: {
      module: vertexShaderModule,
      entryPoint: "vertexMain",
      buffers: [
        {
          arrayStride: 6 * 4,
          attributes: [
            { shaderLocation: 0, offset: 0, format: "float32x3" },
            { shaderLocation: 1, offset: 3 * 4, format: "float32x3" },
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
          clearValue: { r: 0.1, g: 0.1, b: 0.1, a: 1 },
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
    passEncoder.drawIndexed(36, cubes.length, 0, 0, 0); // Dessine numCubes instances
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

const infoElem = document.querySelector('#info');

const canvas = document.querySelector("canvas");

if (canvas === null) {
  throw new Error("Canvas not found");
}

// browser size
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const adapter = await navigator.gpu.requestAdapter();

if (adapter === null) {
  throw new Error("WebGPU not supported");
}

const device = await adapter.requestDevice();

const context = canvas.getContext("webgpu");

if (context === null) {
  throw new Error("WebGPU context not found");
}

context.configure({
  device: device,
  format: navigator.gpu.getPreferredCanvasFormat(),
});

init(device, context);
