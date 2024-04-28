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

const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();

/////////////////////////////////////////////

// let camera, scene, renderer, clock, stats;
// let dirLight, spotLight;
// let torusKnot, dirGroup;

// init();
// animate();

// function init() {
//   initScene();
//   initMisc();

//   document.body.appendChild(renderer.domElement);
//   window.addEventListener("resize", onWindowResize);
// }

// function initScene() {
//   camera = new THREE.PerspectiveCamera(
//     45,
//     window.innerWidth / window.innerHeight,
//     1,
//     1000
//   );
//   camera.position.set(0, 10, 30);

//   scene = new THREE.Scene();
//   scene.background = new THREE.Color(0x222244);
//   scene.fog = new THREE.Fog(0x222244, 50, 100);

//   // Lights

//   scene.add(new THREE.AmbientLight(0x444444));

//   spotLight = new THREE.SpotLight(0xff8888, 400);
//   spotLight.angle = Math.PI / 5;
//   spotLight.penumbra = 0.3;
//   spotLight.position.set(8, 10, 5);
//   spotLight.castShadow = true;
//   spotLight.shadow.camera.near = 8;
//   spotLight.shadow.camera.far = 200;
//   spotLight.shadow.mapSize.width = 256;
//   spotLight.shadow.mapSize.height = 256;
//   spotLight.shadow.bias = -0.002;
//   spotLight.shadow.radius = 4;
//   scene.add(spotLight);

//   dirLight = new THREE.DirectionalLight(0x8888ff, 3);
//   dirLight.position.set(3, 12, 17);
//   dirLight.castShadow = true;
//   dirLight.shadow.camera.near = 0.1;
//   dirLight.shadow.camera.far = 500;
//   dirLight.shadow.camera.right = 17;
//   dirLight.shadow.camera.left = -17;
//   dirLight.shadow.camera.top = 17;
//   dirLight.shadow.camera.bottom = -17;
//   dirLight.shadow.mapSize.width = 512;
//   dirLight.shadow.mapSize.height = 512;
//   dirLight.shadow.radius = 4;
//   dirLight.shadow.bias = -0.0005;

//   dirGroup = new THREE.Group();
//   dirGroup.add(dirLight);
//   scene.add(dirGroup);

//   // Geometry

//   const geometry = new THREE.TorusKnotGeometry(25, 8, 75, 20);
//   const material = new THREE.MeshPhongMaterial({
//     color: 0x999999,
//     shininess: 0,
//     specular: 0x222222,
//   });

//   torusKnot = new THREE.Mesh(geometry, material);
//   torusKnot.scale.multiplyScalar(1 / 18);
//   torusKnot.position.y = 3;
//   torusKnot.castShadow = true;
//   torusKnot.receiveShadow = true;
//   scene.add(torusKnot);

//   const cylinderGeometry = new THREE.CylinderGeometry(0.75, 0.75, 7, 32);

//   const pillar1 = new THREE.Mesh(cylinderGeometry, material);
//   pillar1.position.set(8, 3.5, 8);
//   pillar1.castShadow = true;
//   pillar1.receiveShadow = true;

//   const pillar2 = pillar1.clone();
//   pillar2.position.set(8, 3.5, -8);
//   const pillar3 = pillar1.clone();
//   pillar3.position.set(-8, 3.5, 8);
//   const pillar4 = pillar1.clone();
//   pillar4.position.set(-8, 3.5, -8);

//   scene.add(pillar1);
//   scene.add(pillar2);
//   scene.add(pillar3);
//   scene.add(pillar4);

//   const planeGeometry = new THREE.PlaneGeometry(200, 200);
//   const planeMaterial = new THREE.MeshPhongMaterial({
//     color: 0x999999,
//     shininess: 0,
//     specular: 0x111111,
//   });

//   const ground = new THREE.Mesh(planeGeometry, planeMaterial);
//   ground.rotation.x = -Math.PI / 2;
//   ground.scale.multiplyScalar(3);
//   ground.castShadow = true;
//   ground.receiveShadow = true;
//   scene.add(ground);
// }

// function initMisc() {
//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.shadowMap.enabled = true;
//   renderer.shadowMap.type = THREE.VSMShadowMap;

//   // Mouse control
//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.target.set(0, 2, 0);
//   controls.update();

//   clock = new THREE.Clock();

//   stats = new Stats();
//   document.body.appendChild(stats.dom);
// }

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function animate(time) {
//   requestAnimationFrame(animate);

//   const delta = clock.getDelta();

//   torusKnot.rotation.x += 0.25 * delta;
//   torusKnot.rotation.y += 0.5 * delta;
//   torusKnot.rotation.z += 1 * delta;

//   dirGroup.rotation.y += 0.7 * delta;
//   dirLight.position.z = 17 + Math.sin(time * 0.001) * 5;

//   renderer.render(scene, camera);

//   stats.update();
// }
