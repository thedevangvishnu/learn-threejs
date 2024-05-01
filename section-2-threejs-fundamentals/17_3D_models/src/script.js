import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// initialize the pane
const pane = new Pane();

// add loaders
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("textures/");

const gltfLoader = new GLTFLoader();
const model = gltfLoader.load("/models/boomBoxGLTF/BoomBox.gltf", (gltf) => {
  const modelScene = gltf.scene;
  modelScene.scale.setScalar(50);
  scene.add(gltf.scene);

  console.log(modelScene);
  console.log("Modelscene children:", modelScene.children[0]);
});

// initialize the scene
const scene = new THREE.Scene();

// add the environment map
const envMap = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);

scene.background = envMap;

// add stuff here

const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", 0.5);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

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
