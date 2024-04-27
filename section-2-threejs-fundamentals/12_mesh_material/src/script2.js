import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const torusKnotGeomety = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);

// initialize the material
const material = new THREE.MeshPhongMaterial();
material.color = new THREE.Color("yellow");
material.side = THREE.DoubleSide;
material.shininess = 90;

// add a pane for shininess
pane.addInput(material, "shininess", {
  min: 0,
  max: 100,
  step: 1,
});

// initialize the mesh
const mesh = new THREE.Mesh(boxGeometry, material);
const mesh2 = new THREE.Mesh(torusKnotGeomety, material);
const mesh3 = new THREE.Mesh(planeGeometry, material);

mesh2.position.x = 1.5;
mesh3.position.x = -1.5;

scene.add(mesh);
scene.add(mesh2);
scene.add(mesh3);

scene.background = new THREE.Color(0x111010);

// initialize the lighting
const ambientLight = new THREE.AmbientLight("white", 0.3);
const pointLight = new THREE.PointLight("white", 0.5);
pointLight.position.set(4, 4, 4);

scene.add(ambientLight);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 8;

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
