import * as THREE from "three";
import App from "../App";
import { inputsStore } from "../Stores/inputsStore";

export default class Character {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    this.addCharacter();
    this.loop();

    inputsStore.subscribe((state) => {
      this.forward = state.forward;
      this.backward = state.backward;
      this.left = state.left;
      this.right = state.right;
    });
  }

  addCharacter() {
    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const material = new THREE.MeshStandardMaterial({ color: "#E10032" });

    this.character = new THREE.Mesh(geometry, material);
    this.character.position.set(-2, 4, 0);
    this.scene.add(this.character);

    // character physics
  }

  loop() {
    const movement = new THREE.Vector3().copy(this.character.position);

    if (this.forward) movement.z -= 0.4;
    if (this.backward) movement.z += 0.4;
    if (this.left) movement.x -= 0.4;
    if (this.right) movement.x += 0.4;

    this.character.position.set(movement.x, movement.y, movement.z);
  }
}
