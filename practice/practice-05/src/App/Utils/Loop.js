import * as THREE from "three";
import App from "../App";
import Camera from "../Camera";
import Renderer from "../Renderer";

export default class Loop {
  constructor() {
    this.app = new App();

    this.clock = new THREE.Clock();
    this.previousTime = 0;

    this.loop();
  }

  loop() {
    this.elapsedTime = this.clock.getElapsedTime();
    this.deltaTime = this.elapsedTime - this.previousTime;
    this.previousTime = this.elapsedTime;

    this.app.world.loop(this.elapsedTime, this.deltaTime);
    this.app.camera.loop();
    this.app.renderer.loop();

    window.requestAnimationFrame(() => this.loop());
  }
}
