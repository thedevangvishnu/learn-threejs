import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { grassMaterial, wallMaterial } from "./materials";

const scene = new THREE.Scene();
scene.background = new THREE.Color("gray");

// const uv2Geometry = new THREE.BufferAttribute(
//   planeGeometry.attributes.uv.array,
//   2
// );
// planeGeometry.setAttribute("uv2", uv2Geometry);

const grassGeometry = new THREE.BoxGeometry(20, 20, 1);
const planeMesh = new THREE.Mesh(grassGeometry, grassMaterial);
// console.log({ planeMesh });
planeMesh.rotation.x = -(Math.PI * 0.5);

scene.add(planeMesh);

const wallGeometry = new THREE.BoxGeometry(20, 15, 1);
const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
wallMesh.position.set(0, 7, -10);
scene.add(wallMesh);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.set(0, 10, 20);
scene.add(camera);

const canvas = document.getElementById("threejs");

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight("white", 0.8);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("white", 0.9);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

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
