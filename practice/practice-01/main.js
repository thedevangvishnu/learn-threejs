import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.y = 1;
scene.add(cubeMesh);

// cone mesh
const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
const coneMaterial = new THREE.MeshBasicMaterial({
  color: "brown",
  wireframe: true,
});
const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
coneMesh.position.set(2, 2, 0);
scene.add(coneMesh);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  20
);
camera.position.z = 6;
scene.add(camera);

const axes = new THREE.AxesHelper(3);
scene.add(axes);

const canvas = document.getElementById("threejs");

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();
let previousTime = 0;

const renderLoop = () => {
  controls.update();

  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  // add animation
  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 30;
  renderer.render(scene, camera);

  // requestAnimationFrame() is the browser api that optimizes the animation loop (the specified function, in this case, the renderLoop()) for displaying smooth animations based on browser's frame rate and display refresh rate
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
