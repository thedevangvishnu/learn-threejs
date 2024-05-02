import * as THREE from "three";
import App from "../App.js";
import { inputStore } from "../Utils/Store.js";

export default class Character {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    inputStore.subscribe((state) => {
      this.forward = state.forward;
      this.backward = state.backward;
      this.left = state.left;
      this.right = state.right;
    });

    this.instantiateCharacter();
  }

  instantiateCharacter() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: "brown" });
    this.character = new THREE.Mesh(geometry, material);
    this.character.position.set(0, 2, 0);
    this.scene.add(this.character);
    this.characterRigidBody = this.physics.add(
      this.character,
      "kinematicP",
      "ball"
    );
  }

  loop() {
    // for kinematic velocity-based bodies
    // this.characterRigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    // let x = 0,
    //   y = 0,
    //   z = 0;
    // if (this.forward) z -= 5;
    // if (this.backward) z += 5;
    // if (this.left) x -= 5;
    // if (this.right) x += 5;
    // this.characterRigidBody.setLinvel({ x, y, z }, true);

    // for kinematic position-based bodies
    let { x, y, z } = this.characterRigidBody.translation();

    if (this.forward) z -= 0.1;
    if (this.backward) z += 0.1;
    if (this.left) x -= 0.1;
    if (this.right) x += 0.1;

    this.characterRigidBody.setNextKinematicTranslation({ x, y, z });
  }
}
