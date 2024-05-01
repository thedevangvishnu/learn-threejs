import * as THREE from "three";
import App from "./App";
import { sizesStore } from "./Stores/sizesStore";

export default class Renderer {
  constructor() {
    this.app = new App();
    this.sizesStore = sizesStore.getState();

    this.setInstance();
    this.handleResize();
    this.loop();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.app.canvas,
      antialias: true,
    });

    this.instance.setSize(this.sizesStore.width, this.sizesStore.height);
    this.instance.setPixelRatio(this.sizesStore.pixelRatio);
  }

  handleResize() {
    sizesStore.subscribe((state) => {
      this.instance.setSize(state.width, state.height);
      this.instance.setPixelRatio(state.pixelRatio);
    });
  }

  loop() {
    this.instance.render(this.app.scene, this.app.camera.instance);
  }
}
