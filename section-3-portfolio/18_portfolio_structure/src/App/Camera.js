import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import App from "./App";
import Canvas from "./Canvas";

let camera = null;

export default class Camera {
  constructor() {
    if (camera) return camera;

    camera = this;

    this.canvas = new Canvas();
    this.setInstance();
    this.setControls();
    this.loop();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas.instance);
    this.controls.enableDamping = true;
  }

  loop() {
    this.controls.update();
  }
}
