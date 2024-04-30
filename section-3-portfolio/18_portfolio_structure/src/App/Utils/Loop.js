import * as THREE from "three";
import App from "../App";

export default class Loop {
  constructor() {
    this.app = new App();
    this.loop();
  }

  loop() {
    this.app.camera.loop();
    this.app.renderer.loop();
    window.requestAnimationFrame(() => this.loop());
  }
}
