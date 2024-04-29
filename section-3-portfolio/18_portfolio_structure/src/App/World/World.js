import * as THREE from "three";
import Scene from "../Scene";

let world = null;

export default class World {
  constructor() {
    if (world) return world;

    world = this;
    this.scene = new Scene();
    this.setInstance();
  }

  setInstance() {
    const sphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({ color: "yellow" })
    );

    this.scene.instance.add(sphereMesh);
    // console.log(this.scene.instance);
  }
}
