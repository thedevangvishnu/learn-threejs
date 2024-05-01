import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

const pane = new Pane();

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/textures/2k_mars.jpg");
console.log(texture);

const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshStandardMaterial({
  // color: "red",
  metalness: 0,
  roughness: 0.8,
  map: texture,
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

////////////////////////////////////////////////////////////////////

// lights

const ambientLight = new THREE.AmbientLight("white", 0.2);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight("white", 60, 50);
spotLight.position.set(4, 3, 5);

scene.add(spotLight);

////////////////////////////////////////////////////////////////////

// camera and renderer

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;
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

const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
