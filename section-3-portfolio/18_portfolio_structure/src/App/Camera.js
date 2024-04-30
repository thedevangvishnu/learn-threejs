import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import App from "./App";
import { sizesStore } from "./Utils/Store";

export default class Camera {
  constructor() {
    this.app = new App();
    this.sizes = sizesStore.getState();

    this.setInstance();
    this.setControls();
    this.loop();
    this.setResizeListener();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
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

  setResizeListener() {
    sizesStore.subscribe((sizes) => {
      this.instance.aspect = sizes.width / sizes.height;
      this.instance.updateProjectionMatrix();
    });
  }
}
