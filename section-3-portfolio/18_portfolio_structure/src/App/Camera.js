import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import App from "./App";

export default class Camera {
  constructor() {
    this.app = new App();
    this.setInstance();
    this.setControls();
    this.loop();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      400
    );

    this.instance.position.z = 8;
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.app.canvas);
    this.controls.enableDamping = true;
  }

  loop() {
    this.controls.update();
  }
}
