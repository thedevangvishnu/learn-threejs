import * as THREE from "three";
import App from "../App";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    this.setLights();
    this.addMeshes();
  }

  setLights() {
    this.ambientLight = new THREE.AmbientLight("white", 0.3);
    this.app.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight("white", 1);
    this.directionalLight.position.set(3, 4, 5);
    this.app.scene.add(this.directionalLight);
  }

  addMeshes() {
    this.group = new THREE.Group();
    this.group.position.y = 10;

    // geometries
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const spherGeometry = new THREE.SphereGeometry(1, 32, 32);
    const torusKnowGeometry = new THREE.TorusKnotGeometry(0.6, 0.2, 30, 8);

    // materials
    const objectMaterial = new THREE.MeshStandardMaterial({
      color: "red",
      metalness: 0,
      roughness: 0.2,
    });
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: "gray",
      metalness: 0,
      roughness: 0.2,
    });

    // mesh and its corresponding phsics

    for (let i = 0; i < 20; i++) {
      this.sphere = new THREE.Mesh(spherGeometry, objectMaterial);

      // scale
      const scaleUnit = (Math.random() + 0.4) * 2;
      this.sphere.scale.setScalar(scaleUnit);

      // position
      this.sphere.position.set(
        Math.random() * 10,
        (Math.random() + 5) * 10,
        (Math.random() - 0.5) * 10
      );

      this.group.add(this.sphere);
      this.physics.add(this.sphere, "dynamic", "ball");
    }

    this.ground = new THREE.Mesh(boxGeometry, groundMaterial);
    this.ground.scale.set(100, 0.4, 100);
    this.physics.add(this.ground, "fixed", "cuboid");

    // add to group/scene
    this.app.scene.add(this.ground, this.group);
  }
}
