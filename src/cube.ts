import { mat4, vec2, vec3 } from "gl-matrix";

export class Cube {
  // Attributes
  position: vec3;
  modelMatrix: mat4;
  textureCoords: vec2;

  // Constructor
  constructor(position: vec3, scale: vec3, textureCoords: vec2) {
    this.position = position;

    this.modelMatrix = mat4.create();
    mat4.translate(this.modelMatrix, this.modelMatrix, position);
    mat4.scale(this.modelMatrix, this.modelMatrix, scale);

    this.textureCoords = textureCoords;
  }

  // static attributes

  // prettier-ignore
  static cubeVertices = new Float32Array([
    // Avant
    -0.5, -0.5,  0.5, 0.0, 1.0, // Bas gauche (inversé en Y)
     0.5, -0.5,  0.5, 1.0, 1.0, // Bas droite (inversé en Y)
     0.5,  0.5,  0.5, 1.0, 0.0, // Haut droite
    -0.5,  0.5,  0.5, 0.0, 0.0, // Haut gauche

    // Arrière
    -0.5, -0.5, -0.5, 0.0, 1.0, // Bas gauche (inversé en Y)
     0.5, -0.5, -0.5, 1.0, 1.0, // Bas droite (inversé en Y)
     0.5,  0.5, -0.5, 1.0, 0.0, // Haut droite
    -0.5,  0.5, -0.5, 0.0, 0.0, // Haut gauche

    // Haut
    -0.5,  0.5,  0.5, -2.0, 0.0, // Avant gauche
     0.5,  0.5,  0.5, -1.0, 0.0, // Avant droite
     0.5,  0.5, -0.5, -1.0, 1.0, // Arrière droite
    -0.5,  0.5, -0.5, -2.0, 1.0, // Arrière gauche

    // Bas
    -0.5, -0.5,  0.5, 0.0, 1.0, // Avant gauche (inversé en Y)
     0.5, -0.5,  0.5, 1.0, 1.0, // Avant droite (inversé en Y)
     0.5, -0.5, -0.5, 1.0, 0.0, // Arrière droite
    -0.5, -0.5, -0.5, 0.0, 0.0, // Arrière gauche

    // Droite
     0.5, -0.5,  0.5, 0.0, 1.0, // Avant bas (inversé en Y)
     0.5, -0.5, -0.5, 1.0, 1.0, // Arrière bas (inversé en Y)
     0.5,  0.5, -0.5, 1.0, 0.0, // Arrière haut
     0.5,  0.5,  0.5, 0.0, 0.0, // Avant haut

    // Gauche
    -0.5, -0.5,  0.5, 1.0, 1.0, // Avant bas (inversé en Y)
    -0.5, -0.5, -0.5, 0.0, 1.0, // Arrière bas (inversé en Y)
    -0.5,  0.5, -0.5, 0.0, 0.0, // Arrière haut
    -0.5,  0.5,  0.5, 1.0, 0.0, // Avant haut
]);


  // prettier-ignore
  static cubeIndices = new Uint16Array([
    0, 1, 2, 0, 2, 3,   // Face avant
    4, 5, 6, 4, 6, 7,   // Face arrière
    8, 9, 10, 8, 10, 11, // Face supérieure
    12, 13, 14, 12, 14, 15, // Face inférieure
    16, 17, 18, 16, 18, 19, // Face droite
    20, 21, 22, 20, 22, 23  // Face gauche
  ]);

}
