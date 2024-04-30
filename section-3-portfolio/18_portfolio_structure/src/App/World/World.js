import * as THREE from "three";
import App from "../App";

export default class World {
  constructor() {
    this.app = new App();

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshBasicMaterial({ color: "yellow" })
    );

    this.app.scene.add(cube);
  }
}
