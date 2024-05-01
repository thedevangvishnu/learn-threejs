import * as THREE from "three";
import App from "../App";

export default class Environment {
  constructor() {
    this.app = new App();
    this.setLights();
  }

  setLights() {
    this.ambientLight = new THREE.AmbientLight("white", 0.3);
    this.app.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight("white", 1);
    this.directionalLight.position.set(3, 4, 5);
    this.app.scene.add(this.directionalLight);
  }
}
