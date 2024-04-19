import * as THREE from "three";

const scene = new THREE.Scene();

const cubeMeshGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMeshMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(cubeMeshGeometry, cubeMeshMaterial);

scene.add(cubeMesh);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);

camera.position.z = 5;

scene.add(camera);

const canvas = document.getElementById("threejs");

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
