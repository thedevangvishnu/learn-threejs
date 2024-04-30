import * as THREE from "three";
import App from "./App";

export default class Renderer {
  constructor() {
    this.app = new App();
    this.setInstance();
    this.loop();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.app.canvas,
      antialias: true,
    });
    this.instance.setSize(window.innerWidth, window.innerHeight);
  }

  loop() {
    this.instance.render(this.app.scene, this.app.camera.instance);
  }
}
