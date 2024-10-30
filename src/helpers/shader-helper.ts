export class ShaderHelper {
  static async loadShaderModuleFromFile(
    device: GPUDevice,
    url: string
  ): Promise<GPUShaderModule> {
    const response = await fetch(url);
    const shaderCode = await response.text();
    return device.createShaderModule({ code: shaderCode });
  }
}
