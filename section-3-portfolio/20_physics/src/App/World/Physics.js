import * as THREE from "three";
import App from "../App.js";
import { appStateStore } from "../Utils/Store.js";

export default class Physics {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    this.meshMap = new Map();

    this.add();
    this.loop();

    import("@dimforge/rapier3d").then((RAPIER) => {
      this.rapier = RAPIER;
      const gravity = { x: 0, y: -9.81, z: 0 };
      this.world = new RAPIER.World(gravity);

      const groundGeometry = new THREE.BoxGeometry(20, 0.6, 20);
      const groundMaterial = new THREE.MeshStandardMaterial({ color: "gray" });
      this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      this.groundMesh.receiveShadow = true;
      this.scene.add(this.groundMesh);

      //   rapier rigibody

      const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed();
      this.groundRigidBody = this.world.createRigidBody(groundRigidBodyType);

      const groundCollider = RAPIER.ColliderDesc.cuboid(10, 0.3, 10);
      this.world.createCollider(groundCollider, this.groundRigidBody);

      this.rapierLoaded = true;
      appStateStore.setState({ physicsReady: true });
    });
  }

  add(mesh) {
    if (!this.rapierLoaded) return;

    const rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
    this.rigidBody = this.world.createRigidBody(rigidBodyType);
    this.rigidBody.setTranslation(mesh.position);
    this.rigidBody.setRotation(mesh.quaternion);

    const dimensions = this.computeMeshDimension(mesh);

    const colliderType = this.rapier.ColliderDesc.cuboid(
      dimensions.x / 2,
      dimensions.y / 2,
      dimensions.z / 2
    );
    this.world.createCollider(colliderType, this.rigidBody);

    this.meshMap.set(mesh, this.rigidBody);
  }

  computeMeshDimension(mesh) {
    mesh.geometry.computeBoundingBox();
    let dimensions = mesh.geometry.boundingBox.getSize(new THREE.Vector3());

    const scale = mesh.getWorldScale(new THREE.Vector3());

    dimensions.multiply(scale);
    return dimensions;
  }

  loop() {
    if (!this.rapierLoaded) return;

    this.world.step();

    this.meshMap.forEach((rigidBody, mesh) => {
      const position = rigidBody.translation();
      const rotation = rigidBody.rotation();

      mesh.position.copy(position);
      mesh.quaternion.copy(rotation);
    });
  }
}
