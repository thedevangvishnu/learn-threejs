import * as THREE from "three";
import App from "../App";

export default class Physics {
  constructor() {
    this.app = new App();

    import("@dimforge/rapier3d").then((RPAIER) => {
      const gravity = { x: 0, y: -9.81, z: 0 };
      this.world = new RPAIER.World(gravity);
      this.loop();

      //   threejs mesh
      const geometry = new THREE.SphereGeometry(0.8, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: "red",
        metalness: 0,
        roughness: 0.2,
      });
      this.sphere = new THREE.Mesh(geometry, material);
      this.sphere.position.y = 7;

      const groundGeometry = new THREE.BoxGeometry(16, 0.4, 16);
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: "gray",
        metalness: 0,
        roughness: 0.2,
      });
      this.ground = new THREE.Mesh(groundGeometry, groundMaterial);

      this.app.scene.add(this.sphere, this.ground);

      //   rigid body and collider
      const rigidBodyType = RPAIER.RigidBodyDesc.dynamic();
      this.rigidBody = this.world.createRigidBody(rigidBodyType);
      this.rigidBody.setTranslation(this.sphere.position);

      const colliderType = RPAIER.ColliderDesc.ball(0.8);
      this.world.createCollider(colliderType, this.rigidBody);

      const groundRigidBodyType = RPAIER.RigidBodyDesc.fixed();
      this.groundRigidBody = this.world.createRigidBody(groundRigidBodyType);
      this.groundRigidBody.setTranslation(this.ground.position);

      const groundColliderType = RPAIER.ColliderDesc.cuboid(8, 0.2, 8);
      this.world.createCollider(groundColliderType, this.groundRigidBody);

      this.rapierLoaded = true;
    });
  }

  loop() {
    if (!this.rapierLoaded) return;

    this.world.step();

    const position = this.rigidBody.translation();
    const rotation = this.rigidBody.rotation();

    this.sphere.position.copy(position);
    this.sphere.quaternion.copy(rotation);
  }
}
