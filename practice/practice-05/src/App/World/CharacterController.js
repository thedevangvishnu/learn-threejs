import * as THREE from "three";
import App from "../App";
import { inputsStore } from "../Stores/inputsStore";

export default class CharacterController {
  constructor() {
    this.app = new App();
    this.physics = this.app.world.physics;
    this.character = this.app.world.character.instance;

    this.instanticateController();

    this.loop();

    inputsStore.subscribe((state) => {
      this.forward = state.forward;
      this.backward = state.backward;
      this.left = state.left;
      this.right = state.right;
    });
  }

  instanticateController() {
    // create rigid body and collider for the character
    this.rigidBodyDesc =
      this.physics.rapier.RigidBodyDesc.kinematicPositionBased();
    this.rigidBody = this.physics.world.createRigidBody(this.rigidBodyDesc);

    this.colliderDesc = this.physics.rapier.ColliderDesc.cuboid(2, 2, 2);
    this.collider = this.physics.world.createCollider(
      this.colliderDesc,
      this.rigidBody
    );

    const worldPosition = this.character.getWorldPosition(new THREE.Vector3());
    const worldRotation = this.character.getWorldQuaternion(
      new THREE.Quaternion()
    );

    this.rigidBody.setTranslation(worldPosition);
    this.rigidBody.setRotation(worldRotation);

    this.characterController =
      this.physics.world.createCharacterController(0.01);

    this.characterController.setApplyImpulsesToDynamicBodies(true);
    this.characterController.enableAutostep(2, 0.1, false);
    this.characterController.enableSnapToGround(0.5);
  }

  loop(deltaTime) {
    const movement = new THREE.Vector3();

    if (this.forward) movement.z -= 1;
    if (this.backward) movement.z += 1;
    if (this.left) movement.x -= 1;
    if (this.right) movement.x += 1;

    movement.normalize().multiplyScalar(deltaTime * 20);
    movement.y = -1;

    this.characterController.computeColliderMovement(this.collider, movement);

    const newPosition = new THREE.Vector3()
      .copy(this.rigidBody.translation())
      .add(this.characterController.computedMovement());

    this.rigidBody.setNextKinematicTranslation(newPosition);
    this.character.position.copy(this.rigidBody.translation());
  }
}
