struct Uniforms {
    modelViewProjectionMatrix: mat4x4<f32>
};
@group(0) @binding(0) var<uniform> uniforms : Uniforms;

struct InstanceData {
    modelMatrix: mat4x4<f32>,
    textureCoords: vec2<f32>, // Indices de tuile (x, y) dans l'atlas,
    faceMask : f32, // Ajout du faceMask
    _padding: i32 // padding pour alignement
};

struct InstanceDatas {
  data: array<InstanceData>
};

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
    @location(1) normal: vec3<f32>
};

@group(1) @binding(1) var<storage, read> instanceDatas : InstanceDatas;

// Définition des indices de faces
const FRONT_FACE: i32 = 1 << 0;
const BACK_FACE: i32 = 1 << 1;
const TOP_FACE: i32 = 1 << 2;
const BOTTOM_FACE: i32 = 1 << 3;
const RIGHT_FACE: i32 = 1 << 4;
const LEFT_FACE: i32 = 1 << 5;

@vertex
fn vertexMain(
    @location(0) position: vec3<f32>,
    @location(1) localUV: vec2<f32>,
    @location(2) normal: vec3<f32>,
    @builtin(instance_index) instanceIndex: u32
) -> VertexOutput {
    var output: VertexOutput;

    let instance = instanceDatas.data[instanceIndex];
    let modelMatrix = instance.modelMatrix;

    let faceMask: i32 = i32(instance.faceMask);

    var isFaceVisible = false;
    if (all(normal == vec3<f32>(0.0, 0.0, 1.0)) && (faceMask & FRONT_FACE) != 0) {
        isFaceVisible = true; // Face avant
    } else if (all(normal == vec3<f32>(0.0, 0.0, -1.0)) && (faceMask & BACK_FACE) != 0) {
        isFaceVisible = true; // Face arrière
    } else if (all(normal == vec3<f32>(0.0, 1.0, 0.0)) && (faceMask & TOP_FACE) != 0) {
        isFaceVisible = true; // Face du haut
    } else if (all(normal == vec3<f32>(0.0, -1.0, 0.0)) && (faceMask & BOTTOM_FACE) != 0) {
        isFaceVisible = true; // Face du bas
    } else if (all(normal == vec3<f32>(1.0, 0.0, 0.0)) && (faceMask & RIGHT_FACE) != 0) {
        isFaceVisible = true; // Face droite
    } else if (all(normal == vec3<f32>(-1.0, 0.0, 0.0)) && (faceMask & LEFT_FACE) != 0) {
        isFaceVisible = true; // Face gauche
    }

    // Si la face est invisible, place sa position en dehors du champ de vision
    if (!isFaceVisible) {
        output.position = vec4<f32>(99999.0, 99999.0, 99999.0, 1.0);
        return output;
    }

    // Transformation de la position et calcul des coordonnées UV
    output.position = uniforms.modelViewProjectionMatrix * modelMatrix * vec4<f32>(position, 1.0); 

    let tileOffset = instance.textureCoords;
    let tileSize = vec2<f32>(1. / (1020. / 64.), 1. / (704. / 64.)); // Taille de chaque tuile dans l'atlas

    output.normal = normalize((modelMatrix * vec4<f32>(normal, 0.0)).xyz);

    // Décale localement les UV en fonction de la tuile
    output.uv = (tileOffset * tileSize + localUV * tileSize);

    return output;
}
