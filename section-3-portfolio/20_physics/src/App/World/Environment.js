import * as THREE from "three";

import App from "../App.js";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    this.loadEnvironment();
    this.addMeshes();
  }

  loadEnvironment() {
    // lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
  }

  addMeshes() {
    this.group = new THREE.Group();
    this.group.position.y = 10;
    this.scene.add(this.group);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: "blue" });

    this.cubeMesh = new THREE.Mesh(geometry, material);
    this.cubeMesh.position.y = 10;
    this.cubeMesh.rotation.x = -1;
    this.cubeMesh.rotation.z = 0.18;
    this.cubeMesh.scale.setScalar(4);
    this.cubeMesh.castShadow = true;

    this.group.add(this.cubeMesh);
    this.physics.add(this.cubeMesh, "dynamic");

    const groundGeometry = new THREE.BoxGeometry(40, 0.6, 40);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: "gray" });
    this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    this.groundMesh.receiveShadow = true;

    this.scene.add(this.groundMesh);
    this.physics.add(this.groundMesh, "fixed");
  }
}
