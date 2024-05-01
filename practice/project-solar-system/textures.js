import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("/textures/cube_map/");

// add textures
export const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
export const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
export const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
export const venusTexture = textureLoader.load(
  "/textures/2k_venus_surface.jpg"
);
export const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
export const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
export const jupiterTexture = textureLoader.load("/textures/2k_jupiter.jpg");
export const saturnTexture = textureLoader.load("/textures/2k_saturn.jpg");
export const saturnRingTexture = textureLoader.load(
  "/textures/2k_saturn_ring_alpha.png"
);
export const uranusTexture = textureLoader.load("/textures/2k_uranus.jpg");
export const neptuneTexture = textureLoader.load("/textures/2k_neptune.jpg");
export const backGroundTextureMap = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);
