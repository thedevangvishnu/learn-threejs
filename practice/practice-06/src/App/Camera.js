import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import App from "./App";
import { sizesStore } from "./Stores/sizesStore";

export default class Camera {
  constructor() {
    this.app = new App();
    this.sizesStore = sizesStore.getState();

    this.setInstance();
    this.setControls();
    this.handleResize();
    this.loop();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizesStore.width / this.sizesStore.height,
      0.1,
      1000
    );
    this.instance.position.set(0, 60, 140);
    this.app.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.app.canvas);
    this.controls.enableDamping = true;
  }

  handleResize() {
    sizesStore.subscribe((state) => {
      this.instance.aspect = state.width / state.height;
      this.instance.updateProjectionMatrix();
    });
  }

  loop() {
    this.controls.update();
    this.characterControllerRB = this.app.world.characterConroller?.rigidBody;

    if (this.characterControllerRB) {
      const bodyPosition = this.characterControllerRB.translation();
      const bodyRotation = this.characterControllerRB.rotation();

      const cameraOffset = new THREE.Vector3(0, 40, 80);
      cameraOffset.add(bodyPosition);
      cameraOffset.applyQuaternion(bodyRotation);

      const targetOffset = new THREE.Vector3(0, 5, 0);
      targetOffset.add(bodyPosition);
      targetOffset.applyQuaternion(bodyRotation);

      this.instance.position.lerp(cameraOffset, 0.1);
      this.controls.target.lerp(targetOffset, 0.1);
    }
  }
}
