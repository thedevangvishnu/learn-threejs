import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

// grass
const grassAlbedo = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png"
);
const grassRoughness = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png"
);
const grassMetalness = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metalness.png"
);
const grassHeight = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png"
);
const grassAo = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png"
);
const grassNormal = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png"
);

// wall
const wallAlbedo = textureLoader.load(
  "/textures/beaten-down-brick-bl/beaten-down-brick_albedo.png"
);
const wallRoughness = textureLoader.load(
  "/textures/beaten-down-brick-bl/beaten-down-brick_roughness.png"
);
const wallMetalness = textureLoader.load(
  "/textures/beaten-down-brick-bl/beaten-down-brick_metalness.png"
);
const wallHeight = textureLoader.load(
  "/textures/beaten-down-brick-bl/beaten-down-brick_height.png"
);
const wallAo = textureLoader.load(
  "/textures/beaten-down-brick-bl/beaten-down-brick_ao.png"
);
const wallNormal = textureLoader.load(
  "/textures/beaten-down-brick-bl/beaten-down-brick_normal-ogl.png"
);

grassAlbedo.repeat.set(2, 2);
grassAlbedo.wrapS = THREE.RepeatWrapping;
grassAlbedo.wrapT = THREE.RepeatWrapping;

export const grassMaterial = new THREE.MeshStandardMaterial({
  map: grassAlbedo,
  roughnessMap: grassRoughness,
  metalnessMap: grassMetalness,
  displacementMap: grassHeight,
  displacementScale: 0.05,
  aoMap: grassAo,
  normalMap: grassNormal,
  side: THREE.DoubleSide,
});

wallAlbedo.repeat.set(2, 2);
wallAlbedo.wrapS = THREE.RepeatWrapping;
wallAlbedo.wrapT = THREE.RepeatWrapping;

export const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallAlbedo,
  roughnessMap: wallRoughness,
  metalnessMap: wallMetalness,
  displacementMap: wallHeight,
  displacementScale: 0.05,
  aoMap: wallAo,
  normalMap: wallNormal,
  side: THREE.DoubleSide,
});

export const material = new THREE.MeshBasicMaterial({ color: "green" });
