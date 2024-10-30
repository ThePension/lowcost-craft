import { mat4, vec3 } from "gl-matrix";

export class Cube {
  // Attributes
  position: vec3;
  modelMatrix: mat4;

  // Constructor
  constructor(position: vec3, scale: vec3, color: vec3) {
    this.position = position;

    this.modelMatrix = mat4.create();
    mat4.translate(this.modelMatrix, this.modelMatrix, position);
    mat4.scale(this.modelMatrix, this.modelMatrix, scale);
  }

  // static attributes

  // prettier-ignore
  static cubeVertices = new Float32Array([
    // x,    y,    z    r,   g,   b
    -0.5, -0.5,  0.5, 0.5, 0.0, 0.0,
     0.5, -0.5,  0.5, 0.0, 0.5, 0.0,
     0.5,  0.5,  0.5, 0.0, 0.0, 0.5,
    -0.5,  0.5,  0.5, 0.5, 0.5, 0.0,
    -0.5, -0.5, -0.5, 0.0, 0.5, 0.5,
     0.5, -0.5, -0.5, 0.5, 0.0, 0.5,
     0.5,  0.5, -0.5, 0.5, 0.5, 0.5,
    -0.5,  0.5, -0.5, 0.0, 0.0, 0.0
  ]);

  // prettier-ignore
  static cubeIndices = new Uint16Array([
    0, 1, 2, 0, 2, 3, // Front face
    4, 5, 6, 4, 6, 7, // Back face
    3, 2, 6, 3, 6, 7, // Top face
    0, 1, 5, 0, 5, 4, // Bottom face
    1, 2, 6, 1, 6, 5, // Right face
    0, 3, 7, 0, 7, 4  // Left face
  ]);
}
