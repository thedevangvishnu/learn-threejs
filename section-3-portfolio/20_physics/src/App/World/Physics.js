import * as THREE from "three";
import App from "../App.js";

export default class Physics {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    import("@dimforge/rapier3d").then((RAPIER) => {
      const gravity = { x: 0, y: -9.81, z: 0 };
      this.world = new RAPIER.World(gravity);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: "blue" });
      this.cubeMesh = new THREE.Mesh(geometry, material);
      this.cubeMesh.position.y = 10;
      this.cubeMesh.rotation.x = -1;
      this.cubeMesh.rotation.z = 0.18;
      this.cubeMesh.castShadow = true;
      this.scene.add(this.cubeMesh);

      const groundGeometry = new THREE.BoxGeometry(20, 0.6, 20);
      const groundMaterial = new THREE.MeshStandardMaterial({ color: "gray" });
      this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      this.groundMesh.receiveShadow = true;
      this.scene.add(this.groundMesh);

      //   rapier rigibody
      const rigidBodyType = RAPIER.RigidBodyDesc.dynamic();
      this.rigidBody = this.world.createRigidBody(rigidBodyType);
      this.rigidBody.setTranslation(this.cubeMesh.position);
      this.rigidBody.setRotation(this.cubeMesh.quaternion);

      const colliderType = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
      const collider = this.world.createCollider(colliderType, this.rigidBody);

      const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed();
      this.groundRigidBody = this.world.createRigidBody(groundRigidBodyType);

      const groundCollider = RAPIER.ColliderDesc.cuboid(10, 0.3, 10);
      this.world.createCollider(groundCollider, this.groundRigidBody);

      this.rapierLoaded = true;
    });
  }

  loop() {
    if (!this.rapierLoaded) return;

    this.world.step();

    const position = this.rigidBody.translation();
    const rotation = this.rigidBody.rotation();

    this.cubeMesh.position.copy(position);
    this.cubeMesh.quaternion.copy(rotation);
  }
}
