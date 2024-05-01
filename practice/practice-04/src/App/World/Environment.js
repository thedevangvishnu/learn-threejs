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
    this.sphere = new THREE.Mesh(spherGeometry, objectMaterial);
    this.sphere.scale.set(0.8, 0.8, 0.8);
    this.group.add(this.sphere);
    this.physics.add(this.sphere, "dynamic", "ball");

    this.cube = new THREE.Mesh(boxGeometry, objectMaterial);
    this.cube.position.set(4, 0, 2);
    this.cube.rotation.x = 0.5;
    this.group.add(this.cube);
    this.physics.add(this.cube, "dynamic", "cuboid");

    this.torusKnot = new THREE.Mesh(torusKnowGeometry, objectMaterial);
    this.torusKnot.position.set(-4, 0, 3);
    this.torusKnot.scale.set(1, 1, 1.4);
    this.group.add(this.torusKnot);
    this.physics.add(this.torusKnot, "dynamic", "trimesh");

    this.ground = new THREE.Mesh(boxGeometry, groundMaterial);
    this.ground.scale.set(16, 0.4, 16);
    this.physics.add(this.ground, "fixed", "cuboid");

    // add to group/scene
    this.app.scene.add(this.ground, this.group);
  }
}
