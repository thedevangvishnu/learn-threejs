import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const uv2Geometry = new THREE.BufferAttribute(
  sphereGeometry.attributes.uv.array,
  2
);
sphereGeometry.setAttribute("uv2", uv2Geometry);

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
grassMaterial.displacementScale = 0.05;
grassMaterial.aoMap = grassAo;

// grass pane
const grassPane = pane.addFolder({
  title: "Grass Material",
  expanded: true,
});

grassPane.addInput(grassMaterial, "metalness", { min: 0, max: 1, step: 0.01 });
grassPane.addInput(grassMaterial, "roughness", { min: 0, max: 1, step: 0.01 });
grassPane.addInput(grassMaterial, "displacementScale", {
  min: 0,
  max: 1,
  step: 0.01,
});
grassPane.addInput(grassMaterial, "aoMapIntensity", {
  min: 0,
  max: 1,
  step: 0.01,
});

// space cruise map
const spaceCruiseMaterial = new THREE.MeshStandardMaterial();
spaceCruiseMaterial.map = spaceCruiseAlbedo;
spaceCruiseMaterial.metalnessMap = spaceCruiseMetallic;
spaceCruiseMaterial.roughnessMap = spaceCruiseRoughness;
spaceCruiseMaterial.normalMap = spaceCruiseNormal;
spaceCruiseMaterial.displacementMap = spaceCruiseHeight;
spaceCruiseMaterial.displacementScale = 0.05;
spaceCruiseMaterial.aoMap = spaceCruiseAo;

const spaceCruisePane = pane.addFolder({
  title: "Space Cruise Material",
  expanded: true,
});

spaceCruisePane.addInput(spaceCruiseMaterial, "metalness", {
  min: 0,
  max: 1,
  step: 0.01,
});
spaceCruisePane.addInput(spaceCruiseMaterial, "roughness", {
  min: 0,
  max: 1,
  step: 0.01,
});
spaceCruisePane.addInput(spaceCruiseMaterial, "displacementScale", {
  min: 0,
  max: 1,
  step: 0.01,
});
spaceCruisePane.addInput(spaceCruiseMaterial, "aoMapIntensity", {
  min: 0,
  max: 1,
  step: 0.01,
});

// boulder map
const bouldersMaterial = new THREE.MeshStandardMaterial();
bouldersMaterial.map = bouldersAlbedo;
bouldersMaterial.metalnessMap = bouldersMetallic;
bouldersMaterial.roughnessMap = bouldersRoughness;
bouldersMaterial.normalMap = bouldersNormal;
bouldersMaterial.displacementMap = bouldersHeight;
bouldersMaterial.displacementScale = 0.1;
bouldersMaterial.aoMap = bouldersAo;

// boulders pane
const bouldersPane = pane.addFolder({
  title: "Boulder Material",
  expanded: true,
});

bouldersPane.addInput(bouldersMaterial, "metalness", {
  min: 0,
  max: 1,
  step: 0.01,
});
bouldersPane.addInput(bouldersMaterial, "roughness", {
  min: 0,
  max: 1,
  step: 0.01,
});
bouldersPane.addInput(bouldersMaterial, "displacementScale", {
  min: 0,
  max: 1,
  step: 0.01,
});
bouldersPane.addInput(bouldersMaterial, "aoMapIntensity", {
  min: 0,
  max: 1,
  step: 0.01,
});

// initialize mesh
const grassSphere = new THREE.Mesh(sphereGeometry, grassMaterial);
grassSphere.position.set(-1.9, 0.7, 0);

const spaceCruiseSphere = new THREE.Mesh(sphereGeometry, spaceCruiseMaterial);
spaceCruiseSphere.position.set(0, 0.7, 0);

const bouldersSphere = new THREE.Mesh(sphereGeometry, bouldersMaterial);
bouldersSphere.position.set(-1, -0.7, 0);

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

  group.children.forEach((child) => {
    child.rotation.y += 0.01;
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
