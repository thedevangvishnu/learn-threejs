import * as THREE from "three";
import App from "../App";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    this.setLights();
    this.addBalls();
    this.addGround();
    this.addWalls();
    this.addStairs();

    this.scene.background = new THREE.Color("#A2C4E0");
  }

  setLights() {
    this.ambientLight = new THREE.AmbientLight("white", 0.3);
    this.app.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight("white", 2);
    this.directionalLight.position.set(3, 4, 5);
    this.app.scene.add(this.directionalLight);
  }

  addBalls() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: "#F7CB2D",
      metalness: 0,
      roughness: 0.2,
    });

    // mesh and its corresponding phsics
    for (let i = 0; i < 100; i++) {
      this.ball = new THREE.Mesh(geometry, material);

      // scale
      const scaleUnit = (Math.random() + 0.4) * 1.5;
      this.ball.scale.setScalar(scaleUnit);

      // position
      this.ball.position.set(
        Math.random() * 10,
        (Math.random() + 5) * 10,
        (Math.random() - 0.5) * 10
      );

      this.scene.add(this.ball);
      this.physics.add(this.ball, "dynamic", "ball");
    }
  }

  addGround() {
    const geometry = new THREE.BoxGeometry(100, 0.4, 100);
    const material = new THREE.MeshStandardMaterial({
      color: "#FCFCFC",
    });

    this.ground = new THREE.Mesh(geometry, material);

    this.physics.add(this.ground, "fixed", "cuboid");
    this.app.scene.add(this.ground);
  }

  addWalls() {
    const geometry = new THREE.BoxGeometry(100, 10, 0.4);
    const material = new THREE.MeshStandardMaterial({
      color: "#034687",
    });

    const wallPositions = [
      { x: 0, y: 4.8, z: -50 },
      { x: 0, y: 4.8, z: 50 },
      { x: -50, y: 4.8, z: 0, rotation: { x: 0, y: Math.PI / 2, z: 0 } },
      { x: 50, y: 4.8, z: 0, rotation: { x: 0, y: Math.PI / 2, z: 0 } },
    ];

    wallPositions.forEach((position) => {
      const wall = new THREE.Mesh(geometry, material);
      wall.position.set(position.x, position.y, position.z);

      if (position.rotation) {
        wall.rotation.x = position.rotation.x || 0;
        wall.rotation.y = position.rotation.y || 0;
        wall.rotation.z = position.rotation.z || 0;
      }

      this.scene.add(wall);
      this.physics.add(wall, "fixed", "cuboid");
    });

    // this.wall.rotation.y = Math.PI / 2;
  }

  addStairs() {
    const geometry = new THREE.BoxGeometry(12, 1.5, 99.5);
    const material = new THREE.MeshStandardMaterial({
      color: "#151B2F",
    });

    const stairPositions = [
      { x: 8, y: 1, z: 0 },
      { x: 20, y: 2.5, z: 0 },
      { x: 32, y: 4, z: 0 },
      { x: 44, y: 5.5, z: 0 },
    ];

    stairPositions.forEach((position) => {
      const stair = new THREE.Mesh(geometry, material);
      stair.position.set(position.x, position.y, position.z);

      this.scene.add(stair);
      this.physics.add(stair, "fixed", "cuboid");
    });
  }
}
