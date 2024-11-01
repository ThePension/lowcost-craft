@group(2) @binding(0) var atlasTexture: texture_2d<f32>;
@group(2) @binding(1) var atlasSampler: sampler;

@fragment
fn fragmentMain(@location(0) uv: vec2<f32>, @location(1) normal: vec3<f32>) -> @location(0) vec4<f32> {
    // Configuration de la lumière
    let lightDir = normalize(vec3<f32>(0.5, 1.0, -0.5)); // Direction de la lumière
    let lightColor = vec3<f32>(1.0, 1.0, 1.0);           // Couleur de la lumière
    let ambientIntensity = 0.1;                          // Intensité de la lumière ambiante (valeur entre 0 et 1)

    // Échantillonner la couleur de la texture en utilisant les UV
    let textureColor = textureSample(atlasTexture, atlasSampler, uv).rgb;

    // Calcul de l'intensité lumineuse en utilisant le modèle Lambertien
    let diffuse = max(dot(normalize(normal), lightDir), 0.0);

    // Calcul de l'ombre finale en combinant la lumière ambiante et directionnelle
    let lighting = ambientIntensity + diffuse * (1.0 - ambientIntensity);

    // Appliquer la lumière sur la couleur de la texture
    let finalColor = lighting * lightColor * textureColor;

    return vec4<f32>(finalColor, 1.0); // Couleur finale avec alpha
}
