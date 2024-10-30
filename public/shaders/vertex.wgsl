struct Uniforms {
    modelViewProjectionMatrix : mat4x4<f32>
};
@group(0) @binding(0) var<uniform> uniforms : Uniforms;

struct VertexOutput {
    @builtin(position) position : vec4<f32>,
    @location(0) color : vec3<f32>
};

@group(1) @binding(1) var<storage, read> instanceModels : array<mat4x4<f32>>;

@vertex
fn vertexMain(@location(0) position : vec3<f32>,
                @location(1) color : vec3<f32>,
                @builtin(instance_index) instanceIndex : u32) -> VertexOutput {
    var output : VertexOutput;

    let modelMatrix = instanceModels[instanceIndex];

    output.position = uniforms.modelViewProjectionMatrix * modelMatrix * vec4<f32>(position, 1.0);
    output.color = color;
    return output;
}