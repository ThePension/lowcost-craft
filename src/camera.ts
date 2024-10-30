import { vec3 } from "gl-matrix";

// Class that handles the camera movement
export class Camera {
    position: vec3;
    direction: vec3;
    target: vec3;
    up: vec3;
    cameraSpeed: number = 0.5;
    yaw: number = 0;
    pitch: number = 0;
    sensitivity: number = 0.002;

    // private
    private keysPressed: { [key: string]: boolean } = {};

    constructor() {
        this.position = [0, 0, 0] as vec3;
        this.direction = [0, 0, 0] as vec3;
        this.target = [0, 0, 0] as vec3;
        this.up = [0, 1, 0] as vec3;

        window.addEventListener("keydown", (event) => {
            this.keysPressed[event.key] = true;
        });
        
        window.addEventListener("keyup", (event) => {
            this.keysPressed[event.key] = false;
        });
        

        document.addEventListener("click", () => {
            document.body.requestPointerLock();
        });

        window.addEventListener("mousemove", (event) => this.hanbleMouseMoveEvent(event));
    }

    hanbleMouseMoveEvent(event: MouseEvent) {
        if (document.pointerLockElement === document.body) {
            // Ajuster les angles de rotation en fonction du mouvement de la souris
            this.yaw += event.movementX * this.sensitivity;
            this.pitch -= event.movementY * this.sensitivity;
        
            // Limiter le pitch pour éviter une rotation complète verticale
            this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch));
          }
    }

    updateCameraDirection(): void {
        this.direction = [
          Math.cos(this.pitch) * Math.cos(this.yaw),
          Math.sin(this.pitch),
          Math.cos(this.pitch) * Math.sin(this.yaw),
        ];
    
        // Calculer la cible de la caméra (sa direction + sa position)
        vec3.add(this.target as vec3, this.position as vec3, this.direction as vec3);
      }

      updateCameraPosition(): void {
        const forward = vec3.create();
        const right = vec3.create();
        const up: vec3 = [0, 1, 0]; // Vecteur "up" (haut)
    
        // Calculer le vecteur de direction de la caméra
        vec3.normalize(forward, this.direction as vec3);
    
        // Calculer le vecteur "right" (droite) en croisant la direction avec le vecteur "up"
        vec3.cross(right, forward, up);
        vec3.normalize(right, right);
    
        // Mettre à jour la position de la caméra selon les touches pressées
        if (this.keysPressed["w"]) {
          vec3.scaleAndAdd(
            this.position,
            this.position,
            forward,
            this.cameraSpeed
          );
        }
        if (this.keysPressed["s"]) {
          vec3.scaleAndAdd(
            this.position,
            this.position,
            forward,
            -this.cameraSpeed
          );
        }
        if (this.keysPressed["a"]) {
          vec3.scaleAndAdd(
            this.position,
            this.position,
            right,
            -this.cameraSpeed
          );
        }
        if (this.keysPressed["d"]) {
          vec3.scaleAndAdd(
            this.position,
            this.position,
            right,
            this.cameraSpeed
          );
        }
        // space and shift
        if (this.keysPressed[" "]) {
          vec3.scaleAndAdd(this.position, this.position, up, this.cameraSpeed);
        }
        if (this.keysPressed["Shift"]) {
          vec3.scaleAndAdd(this.position, this.position, up, -this.cameraSpeed);
        }
      }
}