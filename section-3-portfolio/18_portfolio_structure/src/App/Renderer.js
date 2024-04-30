import * as THREE from "three";
import App from "./App";
import { sizesStore } from "./Utils/Store";

export default class Renderer {
  constructor() {
    this.app = new App();
    this.sizes = sizesStore.getState();

    this.setInstance();
    this.loop();
    this.setResizeListener();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.app.canvas,
      antialias: true,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  loop() {
    this.instance.render(this.app.scene, this.app.camera.instance);
  }

  setResizeListener() {
    sizesStore.subscribe((sizes) => {
      this.instance.setSize(sizes.width, sizes.height);
      this.instance.setPixelRatio(sizes.pixelRatio);
    });
  }
}
