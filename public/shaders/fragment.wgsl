@group(2) @binding(0) var atlasTexture: texture_2d<f32>;
@group(2) @binding(1) var atlasSampler: sampler;

@fragment
fn fragmentMain(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
    let color = textureSample(atlasTexture, atlasSampler, uv);
    return color;
}