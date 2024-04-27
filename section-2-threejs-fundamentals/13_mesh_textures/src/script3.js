import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

// initialize the texture loaders
const textureLoader = new THREE.TextureLoader();

// grass texture maps
const grassAlbedo = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png"
);
const grassMetallic = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png"
);
const grassRoughness = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png"
);
const grassAo = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png"
);
const grassNormal = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png"
);
const grassHeight = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png"
);

// space cruise texture
const spaceCruiseAlbedo = textureLoader.load(
  "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png"
);
const spaceCruiseMetallic = textureLoader.load(
  "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png"
);
const spaceCruiseRoughness = textureLoader.load(
  "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png"
);
const spaceCruiseAo = textureLoader.load(
  "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png"
);
const spaceCruiseNormal = textureLoader.load(
  "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png"
);
const spaceCruiseHeight = textureLoader.load(
  "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png"
);

// blouders texture
const bouldersAlbedo = textureLoader.load(
  "/textures/badlands-boulders-bl/badlands-boulders_albedo.png"
);
const bouldersMetallic = textureLoader.load(
  "/textures/badlands-boulders-bl/badlands-boulders_metallic.png"
);
const bouldersRoughness = textureLoader.load(
  "/textures/badlands-boulders-bl/badlands-boulders_roughness.png"
);
const bouldersAo = textureLoader.load(
  "/textures/badlands-boulders-bl/badlands-boulders_ao.png"
);
const bouldersNormal = textureLoader.load(
  "/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png"
);
const bouldersHeight = textureLoader.load(
  "/textures/badlands-boulders-bl/badlands-boulders_height.png"
);

// grass material
const grassMaterial = new THREE.MeshStandardMaterial();
grassMaterial.map = grassAlbedo;
grassMaterial.metalnessMap = grassMetallic;
grassMaterial.roughnessMap = grassRoughness;
grassMaterial.normalMap = grassNormal;
grassMaterial.displacementMap = grassHeight;
grassMaterial.aoMap = grassAo;

// space cruise map
const spaceCruiseMaterial = new THREE.MeshStandardMaterial();
spaceCruiseMaterial.map = spaceCruiseAlbedo;
spaceCruiseMaterial.metalnessMap = spaceCruiseMetallic;
spaceCruiseMaterial.roughnessMap = spaceCruiseRoughness;
spaceCruiseMaterial.normalMap = spaceCruiseNormal;
spaceCruiseMaterial.displacementMap = spaceCruiseHeight;
spaceCruiseMaterial.aoMap = spaceCruiseAo;

// boulder map
const bouldersMaterial = new THREE.MeshStandardMaterial();
bouldersMaterial.map = bouldersAlbedo;
bouldersMaterial.metalnessMap = bouldersMetallic;
bouldersMaterial.roughnessMap = bouldersRoughness;
bouldersMaterial.normalMap = bouldersNormal;
bouldersMaterial.displacementMap = bouldersHeight;
bouldersMaterial.aoMap = bouldersAo;

// initialize mesh
const grassSphere = new THREE.Mesh(sphereGeometry, grassMaterial);

const spaceCruiseSphere = new THREE.Mesh(sphereGeometry, spaceCruiseMaterial);
spaceCruiseSphere.position.x = -2;

const bouldersSphere = new THREE.Mesh(sphereGeometry, bouldersMaterial);
bouldersSphere.position.x = 2;

// add the mesh to the scene/group
const group = new THREE.Group();
group.add(grassSphere, spaceCruiseSphere, bouldersSphere);
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
  // rewrite again

  // group.children.forEach((child) => {
  //   if (child instanceof THREE.Mesh) {
  //     child.rotation.y += 0.02;
  //   }
  // });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
