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
    // const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereGeometry = new THREE.TorusKnotGeometry(1, 0.3, 30, 8);

    const material = new THREE.MeshStandardMaterial({ color: "blue" });

    this.cubeMesh = new THREE.Mesh(geometry, material);
    this.cubeMesh.position.y = 10;
    this.cubeMesh.rotation.x = -1;
    this.cubeMesh.rotation.z = 0.18;
    this.cubeMesh.scale.setScalar(4);
    this.cubeMesh.castShadow = true;
    this.physics.add(this.cubeMesh, "dynamic", "cuboid");

    this.sphereMesh = new THREE.Mesh(sphereGeometry, material);
    this.sphereMesh.position.set(-6, 10, 8);

    this.sphereMesh.rotation.z = 0.18;
    this.sphereMesh.scale.set(2, 2, 3);
    this.sphereMesh.castShadow = true;
    // this.sphereMesh.receiveShadow = true;
    this.physics.add(this.sphereMesh, "dynamic", "trimesh");

    const groundGeometry = new THREE.BoxGeometry(40, 0.6, 40);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: "gray" });
    this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    this.groundMesh.receiveShadow = true;
    this.physics.add(this.groundMesh, "fixed", "cuboid");

    this.group.add(this.sphereMesh, this.cubeMesh);
    this.scene.add(this.groundMesh);
  }
}
