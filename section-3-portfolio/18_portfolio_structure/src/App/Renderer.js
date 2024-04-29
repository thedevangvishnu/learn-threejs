import * as THREE from "three";
import App from "./App";
import Canvas from "./Canvas";
import Scene from "./Scene";
import Camera from "./Camera";

let renderer = null;

export default class Renderer {
  constructor() {
    if (renderer) return renderer;

    renderer = this;
    this.canvas = new Canvas();
    this.scene = new Scene();
    this.camera = new Camera();
    this.setInstance();
    this.loop();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas.instance,
      antialias: true,
    });
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  loop() {
    this.instance.render(this.scene.instance, this.camera.instance);
  }
}
