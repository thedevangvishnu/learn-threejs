import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add meshes to the scene

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
const circleGeometry = new THREE.CircleGeometry(0.5, 32);

const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.0,
  roughness: 0.5,
});

const box = new THREE.Mesh(boxGeometry, material);
box.position.x = -2;

const box2 = new THREE.Mesh(boxGeometry, material);
box2.position.x = -2;
box2.position.z = -2;

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 0;

const sphere2 = new THREE.Mesh(sphereGeometry, material);
sphere2.position.x = 0;
sphere2.position.z = -2;

const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = 2;

const torusKnot2 = new THREE.Mesh(torusKnotGeometry, material);
torusKnot2.position.x = 2;
torusKnot2.position.z = -2;

const circle = new THREE.Mesh(circleGeometry, material);
circle.scale.setScalar(20);
circle.position.y = -2;
circle.rotation.x = -Math.PI / 2;

scene.add(box, sphere, torusKnot, circle);
scene.add(box2, sphere2, torusKnot2);

// initialize the light
const spotLight = new THREE.SpotLight(0x7ee0ed, 0.5);
spotLight.position.set(-2, 2, 0);
spotLight.target.position.set(0, 0, -2);
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight, "black");
scene.add(spotLightHelper);

const spotLightPane = pane.addFolder({ title: "Spot Light", extended: true });

spotLightPane.addInput(spotLight, "color", { color: { type: "float" } });
spotLightPane.addInput(spotLight, "position", {
  x: { min: -10, max: 10, step: 1 },
  y: { min: -10, max: 10, step: 1 },
  z: { min: -10, max: 10, step: 1 },
});

spotLightPane.addInput(spotLight, "distance", { min: 0, max: 1000, step: 1 });
spotLightPane.addInput(spotLight, "angle", {
  min: 0,
  max: Math.PI / 2,
  step: 0.01,
});
spotLightPane.addInput(spotLight, "penumbra", { min: 0, max: 1, step: 0.01 });
spotLightPane.addInput(spotLight, "decay", { min: 0, max: 10, step: 0.1 });

const ambientLight = new THREE.AmbientLight("white", 0.2);
scene.add(ambientLight);

const ambientPane = pane.addFolder({ title: "Ambient Light", extended: false });
ambientPane.addInput(ambientLight, "color", {
  color: { type: "float" },
});
ambientPane.addInput(ambientLight, "intensity", { min: 0, max: 1, step: 0.01 });

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.z = 10;
camera.position.y = 5;

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
