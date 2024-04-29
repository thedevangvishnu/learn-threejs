import App from "../App";
import Camera from "../Camera";
import Renderer from "../Renderer";

export default class Loop {
  constructor() {
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.loop();
  }

  loop() {
    this.camera.loop();
    this.renderer.loop();
    window.requestAnimationFrame(() => this.loop());
  }
}
