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

      this.rapierLoaded = true;
      appStateStore.setState({ physicsReady: true });
    });
  }

  add(mesh, type) {
    if (!this.rapierLoaded) return;

    let rigidBodyType;
    if (type === "dynamic") {
      rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
    } else if (type === "fixed") {
      rigidBodyType = this.rapier.RigidBodyDesc.fixed();
    }

    this.rigidBody = this.world.createRigidBody(rigidBodyType);

    const position = mesh.getWorldPosition(new THREE.Vector3());
    const rotation = mesh.getWorldQuaternion(new THREE.Quaternion());

    this.rigidBody.setTranslation(position);
    this.rigidBody.setRotation(rotation);

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
      // extracting the position and rotation from the rigid body
      const position = new THREE.Vector3().copy(rigidBody.translation());
      const rotation = new THREE.Quaternion().copy(rigidBody.rotation());

      // transforming the position to the parent mesh's local space
      position.applyMatrix4(
        new THREE.Matrix4().copy(mesh.parent.matrixWorld).invert()
      );

      // transforming the rotation to the parent mesh's local space
      const inverseParentMatrix = new THREE.Matrix4()
        .extractRotation(mesh.parent.matrixWorld)
        .invert();
      const inverseParentRotation =
        new THREE.Quaternion().setFromRotationMatrix(inverseParentMatrix);
      rotation.premultiply(inverseParentRotation);

      mesh.position.copy(position);
      mesh.quaternion.copy(rotation);
    });
  }
}
