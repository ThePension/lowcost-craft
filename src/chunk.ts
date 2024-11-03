import { vec2, vec3 } from "gl-matrix";
import { Cube } from "./cube";
import { TerrainHelper } from "./helpers/terrain-helper";

export class Chunk {
  chunk_size: number = 16;
  pos: vec2; // Position en chunks (coordonnées chunkX, chunkZ)
  cubes: Map<string, Cube>; // Stocke les cubes par leurs coordonnées locales dans le chunk

  constructor(pos: vec2, chunkSize: number = 16) {
    this.pos = pos;
    this.cubes = new Map<string, Cube>();

    this.chunk_size = chunkSize;
  }

  generateChunk() {
    for (let i = 0; i < this.chunk_size; i++) {
      for (let j = 0; j < this.chunk_size; j++) {
        let x = i - this.chunk_size / 2 + this.pos[0];
        let z = j - this.chunk_size / 2 + this.pos[1];

        let y = TerrainHelper.Instance.getTerrainHeight(x, z);

        for (let k = y; k > -this.chunk_size; k--) {
          const position: vec3 = [x, k, z];

          let textureCoords: vec2;

          if (k === y) {
            textureCoords = [4, 4]; // Herbe
          } else if (k > y - 3) {
            textureCoords = [2, 0]; // Terre
          } else {
            textureCoords = [1, 0]; // Pierre
          }
          
          const cube = new Cube(position, [1, 1, 1], textureCoords, 0.);

          this.addCube(x, k, z, cube);
        }
      }
    }
  }

  // Ajouter un cube dans le chunk
  addCube(x: number, y: number, z: number, cube: Cube) {
    this.cubes.set(`${x},${y},${z}`, cube);
  }

  // Récupérer un cube à des coordonnées locales dans le chunk
  getCube(x: number, y: number, z: number): Cube | undefined {
    return this.cubes.get(`${x},${y},${z}`);
  }

  // Calcul des masques de faces pour tous les cubes du chunk
  calculateFaceMasks(world: Set<string>) {
    this.cubes.forEach((cube) => {
      cube.faceMask = Cube.calculateFaceMask(
        cube.position[0],
        cube.position[1],
        cube.position[2],
        world
      );
    });
  }
}
