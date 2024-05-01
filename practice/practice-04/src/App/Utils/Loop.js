import * as THREE from "three";
import App from "../App";
import Camera from "../Camera";
import Renderer from "../Renderer";

export default class Loop {
  constructor() {
    this.app = new App();

    this.loop();
  }

  loop() {
    this.app.world.loop();

    this.app.camera.loop();
    this.app.renderer.loop();

    window.requestAnimationFrame(() => this.loop());
  }
}
