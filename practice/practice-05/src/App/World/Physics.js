import * as THREE from "three";
import App from "../App";
import { appStateStore } from "../Stores/appStateStore";

export default class Physics {
  constructor() {
    this.app = new App();

    this.meshMap = new Map();

    import("@dimforge/rapier3d").then((RPAIER) => {
      this.rapier = RPAIER;
      const gravity = { x: 0, y: -9.81, z: 0 };
      this.world = new RPAIER.World(gravity);

      this.rapierLoaded = true;
      appStateStore.setState({
        isRapierLoaded: true,
      });
    });
  }

  add(mesh, type, collider) {
    if (!this.rapierLoaded) return;

    let rigidBodyDesc;
    if (type === "dynamic") {
      rigidBodyDesc = this.rapier.RigidBodyDesc.dynamic();
    } else if (type === "fixed") {
      rigidBodyDesc = this.rapier.RigidBodyDesc.fixed();
    } else if (type === "kinematicV") {
      rigidBodyDesc = this.rapier.RigidBodyDesc.kinematicVelocityBased();
    } else if (type === "kinematicP") {
      rigidBodyDesc = this.rapier.RigidBodyDesc.kinematicPositionBased();
    }

    this.rigidBody = this.world.createRigidBody(rigidBodyDesc);

    const position = mesh.getWorldPosition(new THREE.Vector3());
    const rotation = mesh.getWorldQuaternion(new THREE.Quaternion());
    this.rigidBody.setTranslation(position);
    this.rigidBody.setRotation(rotation);

    // autocompute colliderDesc
    let colliderDesc;
    switch (collider) {
      case "cuboid":
        const dimensions = this.computeCuboidDimensions(mesh);
        colliderDesc = this.rapier.ColliderDesc.cuboid(
          dimensions.x / 2,
          dimensions.y / 2,
          dimensions.z / 2
        );
        break;

      case "ball":
        const radius = this.computeBallDimensions(mesh);
        colliderDesc = this.rapier.ColliderDesc.ball(radius);
        break;

      case "trimesh":
        const { scaledVertices, indeces } = this.computeTrimeshDimensions(mesh);
        colliderDesc = this.rapier.ColliderDesc.trimesh(
          scaledVertices,
          indeces
        );
        break;
    }

    this.world.createCollider(colliderDesc, this.rigidBody);

    // map the mesh to its rigidbody
    this.meshMap.set(mesh, this.rigidBody);

    return this.rigidBody;
  }

  computeCuboidDimensions(mesh) {
    mesh.geometry.computeBoundingBox();
    let dimensions = mesh.geometry.boundingBox.getSize(new THREE.Vector3());

    const scale = mesh.getWorldScale(new THREE.Vector3());

    dimensions.multiply(scale);

    return dimensions;
  }

  computeBallDimensions(mesh) {
    mesh.geometry.computeBoundingSphere();
    const radius = mesh.geometry.boundingSphere.radius;

    const scale = mesh.getWorldScale(new THREE.Vector3());
    const maxScale = Math.max(scale.x, scale.y, scale.z);

    return radius * maxScale;
  }

  computeTrimeshDimensions(mesh) {
    const vertices = mesh.geometry.attributes.position.array;
    const indeces = mesh.geometry.index.array;

    const scale = mesh.getWorldScale(new THREE.Vector3());

    const scaledVertices = vertices.map((vertex, index) => {
      return vertex * scale.getComponent(index % 3);
    });

    console.log(vertices);
    console.log(scaledVertices);
    console.log(scale);

    return { scaledVertices, indeces };
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
