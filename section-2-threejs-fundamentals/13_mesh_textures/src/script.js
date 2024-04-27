import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32, 32);

// initialize the texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png"
);

// initialize the material
const material = new THREE.MeshPhongMaterial();
material.side = THREE.DoubleSide;
material.map = texture;
material.color = new THREE.Color("yellow");

// initialize the mesh
const cube = new THREE.Mesh(geometry, material);

const knot = new THREE.Mesh(torusKnotGeometry, material);
knot.position.x = 2;

const plane = new THREE.Mesh(planeGeometry, material);

plane.position.x = -2;

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.y = 2;

const cylinder = new THREE.Mesh(cylinderGeometry, material);
cylinder.position.y = -2;

// add the mesh to the scene/group
const group = new THREE.Group();
group.add(cube, knot, plane, sphere, cylinder);
scene.add(group);

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 10;

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
  group.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      child.rotation.y += 0.02;
    }
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
