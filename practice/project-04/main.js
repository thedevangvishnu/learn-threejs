import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import {
  sunTexture,
  backGroundTextureMap,
  moonTexture,
  saturnRingTexture,
} from "./textures";
import { planets } from "./planets";

const pane = new Pane();

const scene = new THREE.Scene();
scene.background = backGroundTextureMap;

const geometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });

const sun = new THREE.Mesh(geometry, sunMaterial);
sun.scale.setScalar(6);
scene.add(sun);

const createPlanet = (planet) => {
  const planetMesh = new THREE.Mesh(geometry, planet.material);
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  return planetMesh;
};

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
};

const planetsMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);

  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });

  scene.add(planetMesh);
  return planetMesh;
});

// add ring to saturn
const ringGeometry = new THREE.RingGeometry(1.5, 2);
const ringMaterial = new THREE.MeshStandardMaterial({
  map: saturnRingTexture,
  side: THREE.DoubleSide,
});
const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);

ringMesh.rotation.x = Math.PI * 0.6;
ringMesh.rotation.y = Math.PI * 0.2;
const saturn = planetsMeshes[5];
saturn.add(ringMesh);
console.log(saturn);

////////////////////////////////////////////////////////////////////

// lights

const ambientLight = new THREE.AmbientLight("white", 0.05);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("white", 1500);
scene.add(pointLight);

////////////////////////////////////////////////////////////////////

// camera and renderer

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 100;
camera.position.y = 5;

const canvas = document.getElementById("threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 10;
controls.maxDistance = 200;

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
