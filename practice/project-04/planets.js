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
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
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
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Jupiter",
    radius: 1.5,
    distance: 32,
    speed: 0.002,
    material: jupiterMaterial,
    moons: [
      {
        name: "Io",
        radius: 0.1,
        distance: 3,
        speed: 0.012,
      },
      {
        name: "Europa",
        radius: 0.3,
        distance: 2.2,
        speed: 0.014,
      },
      {
        name: "Ganymede",
        radius: 0.2,
        distance: 1.4,
        speed: 0.01,
      },
    ],
  },
  {
    name: "Saturn",
    radius: 1,
    distance: 40,
    speed: 0.001,
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
    speed: 0.0009,
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
    speed: 0.0008,
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
