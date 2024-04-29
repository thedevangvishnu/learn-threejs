import * as THREE from "three";

let scene = null;

export default class Scene {
  constructor() {
    if (scene) return scene;

    scene = this;
    this.instance = new THREE.Scene();
  }
}
