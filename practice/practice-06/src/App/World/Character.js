import * as THREE from "three";
import App from "../App";
import { inputsStore } from "../Stores/inputsStore";

export default class Character {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    this.addInstance();
  }

  addInstance() {
    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const material = new THREE.MeshStandardMaterial({ color: "#E10032" });

    this.instance = new THREE.Mesh(geometry, material);
    this.instance.position.set(-2, 4, 0);
    this.scene.add(this.instance);
  }
}

// 1 - basic input using js and basic threejs logic
/*
        - get the mesh current position on the start of every frame
        - update the mesh position based on some condition
        - that condition can be the boolean state of key-down or key-up
        - set the mesh position at the end of the frame to this new position

        // let { x, y, z } = new THREE.Vector3().copy(this.character.position);
        // if (this.forward) z -= 0.5;
        // if (this.backward) z += 0.5;
        // if (this.left) x -= 0.5;
        // if (this.right) x += 0.5;
        // this.character.position.set(x, y, z);

    */

// 2 - adding motion using native rapier methods
/*
        * for dynamic bodies

            - to influence position
                - addForce()
                - applyImpluse()
            - to influence rotation 
                - addTorque()
                - applyTorqueImpulse()
            these methods are directly applied on the rigid body

            // if (this.forward) {
            //   this.characterRigidBody.applyTorqueImpulse({ x: 0, y: -20, z: 0 }, true);
            // }
            // if (this.backward) {
            //   this.characterRigidBody.applyTorqueImpulse({ x: 0, y: 20, z: 0 }, true);
            // }

        * for kinematic velocity based bodies

            - setLinvel() method can be used to add velocity to the object
            - important to reset the linvel to 0 at the start of each frame, othrewise the object will keep moving

            // this.characterRigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
            // let x = 0,
            // y = 0,
            // z = 0;
            // if (this.forward) z -= 10;
            // if (this.backward) z += 10;
            // if (this.left) x -= 10;
            // if (this.right) x += 10;
            // this.characterRigidBody.setLinvel({ x, y, z }, true);


        * for kinematic position based bodies

            - setNextKinematicTranslation() method can be used to update the position
            - get the current positon of the rigid body at the start of each frame
            - update the positon based on condition
            - change the position of the rigid body using the setNextKinematicTranslation() using the new position value

            // let { x, y, z } = this.characterRigidBody.translation();
            // if (this.forward) z -= 0.2;
            // if (this.backward) z += 0.2;
            // if (this.left) x -= 0.2;
            // if (this.right) x += 0.2;
            // this.characterRigidBody.setNextKinematicTranslation({ x, y, z });

    */

// 3 - adding motion using character controller
/*
      - separate the physics for this character
      - the animation loop for this physical entity should also be seprated from a generic physical loop (that acts on all bodies who don't use character controller)
      - create the phsyics and map position to the mesh 
      - create the character controller 
      - compute the new movement using the character controller 
      - use this new computed movement to update the position of the physical body and thne the threejs mesh's
*/
