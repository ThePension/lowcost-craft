export class ShaderHelper {
  static async loadShaderModuleFromFile(
    device: GPUDevice,
    url: string
  ): Promise<GPUShaderModule> {
    const response = await fetch(url);
    const shaderCode = await response.text();
    return device.createShaderModule({ code: shaderCode });
  }

  static async loadAtlasTexture(device: GPUDevice, url: string) {
    // Charger l'image de l'atlas
    const response = await fetch(url);
    const imageBitmap = await createImageBitmap(await response.blob());
  
    // Créer la texture WebGPU avec les dimensions de l'image
    const texture = device.createTexture({
      size: [imageBitmap.width, imageBitmap.height, 1],
      format: 'rgba8unorm',
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
    });
  
    // Copier les pixels de l'image vers la texture GPU
    device.queue.copyExternalImageToTexture(
        { source: imageBitmap },
        { texture: texture },
        [imageBitmap.width, imageBitmap.height]
    );
  
    return texture;
  }
}