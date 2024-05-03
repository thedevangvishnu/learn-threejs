import * as THREE from "three";

import App from "../App.js";
import assetStore from "../Utils/AssetStore.js";
export default class Character {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.assetStore = assetStore.getState();
    this.avatar = this.assetStore.loadedAssets.avatar;

    // create character and add to scene
    const geometry = new THREE.BoxGeometry(2, 6.8, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      wireframe: true,
      visible: false,
    });
    this.instance = new THREE.Mesh(geometry, material);
    this.instance.position.set(0, 5, 0);
    this.scene.add(this.instance);

    const avatar = this.avatar.scene;
    avatar.scale.setScalar(4);
    avatar.position.y = -3.4;
    // avatar.rotation.y = Math.PI;
    this.instance.add(avatar);
  }
}
