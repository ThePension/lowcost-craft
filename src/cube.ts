import { mat4, vec2, vec3 } from "gl-matrix";

export class Cube {
  // Attributes
  position: vec3;
  modelMatrix: mat4;
  textureCoords: vec2;
  faceMask: number;

  // Constructor
  constructor(position: vec3, scale: vec3, textureCoords: vec2, faceMask: number) {
    this.position = position;

    this.faceMask = faceMask;

    this.modelMatrix = mat4.create();
    mat4.translate(this.modelMatrix, this.modelMatrix, position);
    mat4.scale(this.modelMatrix, this.modelMatrix, scale);

    this.textureCoords = textureCoords;
  }

  // static attributes

  // prettier-ignore
  static cubeVertices = new Float32Array([
    // x,    y,    z,   u,   v,   nx,   ny,   nz
    // Avant
    -0.5, -0.5,  0.5, 0.0, 1.0,  0.0,  0.0,  1.0, // Bas gauche, normale face avant
     0.5, -0.5,  0.5, 1.0, 1.0,  0.0,  0.0,  1.0, // Bas droite
     0.5,  0.5,  0.5, 1.0, 0.0,  0.0,  0.0,  1.0, // Haut droite
    -0.5,  0.5,  0.5, 0.0, 0.0,  0.0,  0.0,  1.0, // Haut gauche

    // Arrière
    -0.5, -0.5, -0.5, 0.0, 1.0,  0.0,  0.0, -1.0, // Bas gauche, normale face arrière
     0.5, -0.5, -0.5, 1.0, 1.0,  0.0,  0.0, -1.0, // Bas droite
     0.5,  0.5, -0.5, 1.0, 0.0,  0.0,  0.0, -1.0, // Haut droite
    -0.5,  0.5, -0.5, 0.0, 0.0,  0.0,  0.0, -1.0, // Haut gauche

    // Haut
    -0.5,  0.5,  0.5, -2.0, 0.0,  0.0,  1.0,  0.0, // Avant gauche
     0.5,  0.5,  0.5, -1.0, 0.0,  0.0,  1.0,  0.0, // Avant droite
     0.5,  0.5, -0.5, -1.0, 1.0,  0.0,  1.0,  0.0, // Arrière droite
    -0.5,  0.5, -0.5, -2.0, 1.0,  0.0,  1.0,  0.0, // Arrière gauche

    // Bas
    -0.5, -0.5,  0.5, 0.0, 1.0,  0.0, -1.0,  0.0, // Avant gauche
     0.5, -0.5,  0.5, 1.0, 1.0,  0.0, -1.0,  0.0, // Avant droite
     0.5, -0.5, -0.5, 1.0, 0.0,  0.0, -1.0,  0.0, // Arrière droite
    -0.5, -0.5, -0.5, 0.0, 0.0,  0.0, -1.0,  0.0, // Arrière gauche

    // Droite
     0.5, -0.5,  0.5, 0.0, 1.0,  1.0,  0.0,  0.0, // Avant bas
     0.5, -0.5, -0.5, 1.0, 1.0,  1.0,  0.0,  0.0, // Arrière bas
     0.5,  0.5, -0.5, 1.0, 0.0,  1.0,  0.0,  0.0, // Arrière haut
     0.5,  0.5,  0.5, 0.0, 0.0,  1.0,  0.0,  0.0, // Avant haut

    // Gauche
    -0.5, -0.5,  0.5, 1.0, 1.0, -1.0,  0.0,  0.0, // Avant bas
    -0.5, -0.5, -0.5, 0.0, 1.0, -1.0,  0.0,  0.0, // Arrière bas
    -0.5,  0.5, -0.5, 0.0, 0.0, -1.0,  0.0,  0.0, // Arrière haut
    -0.5,  0.5,  0.5, 1.0, 0.0, -1.0,  0.0,  0.0  // Avant haut
  ]);

  static FACE_FRONT = 1 << 0;
  static FACE_BACK = 1 << 1;
  static FACE_TOP = 1 << 2;
  static FACE_BOTTOM = 1 << 3;
  static FACE_RIGHT = 1 << 4;
  static FACE_LEFT = 1 << 5;


  // prettier-ignore
  static cubeIndices = new Uint16Array([
    0, 1, 2, 0, 2, 3,   // Face avant
    4, 5, 6, 4, 6, 7,   // Face arrière
    8, 9, 10, 8, 10, 11, // Face supérieure
    12, 13, 14, 12, 14, 15, // Face inférieure
    16, 17, 18, 16, 18, 19, // Face droite
    20, 21, 22, 20, 22, 23  // Face gauche
  ]);

  static calculateFaceMask(x: number, y: number, z: number, world: Set<string>): number {
    let mask = 0;
  
    if (!world.has(`${x + 1},${y},${z}`)) mask |= this.FACE_RIGHT;
    if (!world.has(`${x - 1},${y},${z}`)) mask |= this.FACE_LEFT;
    if (!world.has(`${x},${y + 1},${z}`)) mask |= this.FACE_TOP;
    if (!world.has(`${x},${y - 1},${z}`)) mask |= this.FACE_BOTTOM;
    if (!world.has(`${x},${y},${z + 1}`)) mask |= this.FACE_FRONT;
    if (!world.has(`${x},${y},${z - 1}`)) mask |= this.FACE_BACK;

    return mask;
  }
}
