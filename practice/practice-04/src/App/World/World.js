import * as THREE from "three";
import App from "../App";
import Environment from "./Environment";
import Physics from "./Physics";

export default class World {
  constructor() {
    this.app = new App();
    this.physics = new Physics();
    this.environment = new Environment();

    this.loop();

    // this.setCube();
  }

  loop() {
    this.physics.loop();
  }

  // setCube() {
  //   const geometry = new THREE.SphereGeometry(1, 32, 32);
  //   const material = new THREE.MeshStandardMaterial({
  //     color: "yellow",
  //     metalness: 0,
  //     roughness: 0.2,
  //   });

  //   this.sphere = new THREE.Mesh(geometry, material);
  //   this.app.scene.add(this.sphere);
  // }
}
