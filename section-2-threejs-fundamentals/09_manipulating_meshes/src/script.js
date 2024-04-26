import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true,
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);

cubeMesh2.position.x = 2;
cubeMesh3.position.x = -2;

cubeMesh.position.y = 2;

cubeMesh.rotation.reorder("YXZ");

// rotation is in anti-clock motion

// cubeMesh.rotation.x = 0;
cubeMesh.rotation.y = THREE.MathUtils.degToRad(90); // Math.PI is 180 deg
cubeMesh.rotation.x = THREE.MathUtils.degToRad(45);

// let i = 0;
// setInterval(() => {
//   cubeMesh.rotation.y = i;

//   setInterval(() => {
//     cubeMesh.rotation.x = i;
//   }, 3000);
//   i++;
// }, 2000);

const group = new THREE.Group();

group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);

group.position.y = 1;

scene.add(group);

// explore position, scale, groups
// position and scale are Vector3, meaning they have x,y,z

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 15;

// add axes helper
const axes = new THREE.AxesHelper(2);
const sceneAxes = new THREE.AxesHelper(4);
scene.add(sceneAxes);

// add the axes helper relative to cubeMesh
cubeMesh.add(axes);

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
