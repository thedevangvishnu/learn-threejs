import * as THREE from "three";
import * as textures from "./textures";

const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: textures.mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: textures.venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: textures.earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: textures.marsTexture,
});
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: textures.jupiterTexture,
});
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: textures.saturnTexture,
});
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: textures.uranusTexture,
});
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: textures.neptuneTexture,
});

export const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    position: { x: 10, z: 0 },
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    position: { x: 15, z: -15 },
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    position: { x: -20, z: 20 },
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    position: { x: 25, z: -25 },
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Jupiter",
    radius: 1.5,
    distance: 32,
    position: { x: 32, z: 0 },
    speed: 0.002,
    material: jupiterMaterial,
    moons: [
      {
        name: "Io",
        radius: 0.1,
        distance: 3,
        speed: 0.0042,
      },
      {
        name: "Europa",
        radius: 0.3,
        distance: 2.2,
        speed: 0.0043,
      },
      {
        name: "Ganymede",
        radius: 0.2,
        distance: 1.8,
        speed: 0.0024,
      },
    ],
  },
  {
    name: "Saturn",
    radius: 1,
    distance: 40,
    position: { x: -40, z: -40 },
    speed: 0.0018,
    material: saturnMaterial,
    moons: [
      {
        name: "Titan",
        radius: 0.5,
        distance: 3,
        speed: 0.008,
      },
      {
        name: "Enceladus",
        radius: 0.2,
        distance: 2,
        speed: 0.011,
      },
    ],
  },
  {
    name: "Uranus",
    radius: 1.1,
    distance: 47,
    position: { x: 47, z: 40 },
    speed: 0.0015,
    material: uranusMaterial,
    moons: [
      {
        name: "Miranda",
        radius: 0.2,
        distance: 2,
        speed: 0.013,
      },
    ],
  },
  {
    name: "Neptune",
    radius: 1.0,
    distance: 53,
    position: { x: -53, z: -4 },

    speed: 0.0012,
    material: neptuneMaterial,
    moons: [
      {
        name: "Triton",
        radius: 0.4,
        distance: 3,
        speed: 0.009,
      },
      {
        name: "Proteus",
        radius: 0.2,
        distance: 2,
        speed: 0.012,
      },
    ],
  },
];
