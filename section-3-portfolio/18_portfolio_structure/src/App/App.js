import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Loop from "./Utils/Loop";
import Resize from "./Utils/Resize";

let app = null;

export default class App {
  constructor() {
    if (app) return app;
    app = this;

    this.canvas = document.querySelector(".threejs");
    this.scene = new THREE.Scene();
    this.world = new World();

    this.camera = new Camera();
    this.renderer = new Renderer();

    this.loop = new Loop();
    this.resize = new Resize();
  }
}
