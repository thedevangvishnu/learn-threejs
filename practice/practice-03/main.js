import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/addons/libs/stats.module.js";
import { Pane } from "tweakpane";

const pane = new Pane();
const scene = new THREE.Scene();
scene.background = new THREE.Color("#240442");
scene.fog = new THREE.Fog("#240442", 10, 100);

const material = new THREE.MeshStandardMaterial({
  color: "#7221bf",
  metalness: 0.0,
  roughness: 0.1,
});

const pillarGeometry = new THREE.CylinderGeometry(0.4, 0.4, 4, 32, 32);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.7, 0.3, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(200, 200);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: "#903ede",
  shininess: 0,
  specular: 0xaaaaaa,
});

const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.castShadow = true;
// torusKnot.receiveShadow = true;

const ground = new THREE.Mesh(planeGeometry, planeMaterial);
// ground.scale.set(40, 10);
ground.position.y = -2;
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;

const pillarOne = new THREE.Mesh(pillarGeometry, material);
pillarOne.position.set(-4, 0, -3);
pillarOne.castShadow = true;
pillarOne.receiveShadow = true;

const pillarTwo = pillarOne.clone();
pillarTwo.position.set(4, 0, -3);

const pillarThree = pillarOne.clone();
pillarThree.position.set(-4, 0, 3);

const pillarFour = pillarOne.clone();
pillarFour.position.set(4, 0, 3);

scene.add(torusKnot, ground, pillarOne, pillarThree, pillarTwo, pillarFour);

////////////////////////////////////////////////////////////////////

// lights

const ambientLight = new THREE.AmbientLight("white", 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", 0.6);
directionalLight.position.set(8, 8, 5);
directionalLight.castShadow = true;
directionalLight.shadow.radius = 5;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;

scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight
// );
// scene.add(directionalLightHelper);

// const dirLightCameraHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );
// scene.add(dirLightCameraHelper);

const spotLight = new THREE.SpotLight("#f70c0c", 500, 30, Math.PI * 0.1, 0.8);
spotLight.position.set(-4, 6, -4);
spotLight.castShadow = true;
spotLight.shadow.radius = 5;
scene.add(spotLight);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

////////////////////////////////////////////////////////////////////

// camera and renderer

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;
camera.position.y = 5;

const canvas = document.getElementById("threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();
let previousTime = 0;

const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  torusKnot.rotation.x += 0.3 * delta;
  torusKnot.rotation.y += 0.2 * delta;
  torusKnot.rotation.z += 0.4 * delta;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
