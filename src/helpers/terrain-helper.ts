import { createNoise2D, NoiseFunction2D } from "simplex-noise";

export class TerrainHelper {
  static amplitude = 20; // Hauteur maximale en blocs
  static frequency = 0.01; // Fréquence du bruit (plus petit pour plus doux)

  private static _instance: TerrainHelper;
  private noise2D: NoiseFunction2D;

  private constructor() {
    this.noise2D = createNoise2D();
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  getTerrainHeight(x: number, z: number): number {
    return Math.floor(
      this.noise2D(x * TerrainHelper.frequency, z * TerrainHelper.frequency) * TerrainHelper.amplitude
    );
  }
}
