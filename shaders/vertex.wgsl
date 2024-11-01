struct Uniforms {
    modelViewProjectionMatrix: mat4x4<f32>
};
@group(0) @binding(0) var<uniform> uniforms : Uniforms;

struct InstanceData {
    modelMatrix: mat4x4<f32>,
    textureCoords: vec2<f32>, // Indices de tuile (x, y) dans l'atlas
    _padding: vec2<f32>, // ajouter un padding pour alignement
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

@vertex
fn vertexMain(
    @location(0) position: vec3<f32>,
    @location(1) localUV: vec2<f32>,
    @location(2) normal: vec3<f32>,
    @builtin(instance_index) instanceIndex: u32
) -> VertexOutput {
    var output: VertexOutput;

    let modelMatrix = instanceDatas.data[instanceIndex].modelMatrix;
    output.position = uniforms.modelViewProjectionMatrix * modelMatrix * vec4<f32>(position, 1.0);

    let tileOffset = instanceDatas.data[instanceIndex].textureCoords;
    let tileSize = vec2<f32>(1. / (1020. / 64.), 1. / (704. / 64.)); // Taille de chaque tuile dans l'atlas

    output.normal = normalize((modelMatrix * vec4<f32>(normal, 0.0)).xyz);

    // Décale localement les UV en fonction de la tuile
    output.uv = (tileOffset * tileSize + localUV * tileSize);

    return output;
}