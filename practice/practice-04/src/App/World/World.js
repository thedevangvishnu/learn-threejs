import * as THREE from "three";
import App from "../App";
import Environment from "./Environment";

export default class World {
  constructor() {
    this.app = new App();
    this.environment = new Environment();

    this.setCube();
  }

  setCube() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: "yellow",
      metalness: 0,
      roughness: 0.2,
    });

    this.sphere = new THREE.Mesh(geometry, material);
    this.app.scene.add(this.sphere);
  }
}
