import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const cubeMeshGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMeshMaterial = new THREE.MeshBasicMaterial({
  color: "rgb(66, 245, 206)",
});
const cubeMesh = new THREE.Mesh(cubeMeshGeometry, cubeMeshMaterial);

scene.add(cubeMesh);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);

camera.position.z = 5;
scene.add(camera);

const canvas = document.getElementById("threejs");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
