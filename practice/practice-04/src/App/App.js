import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Loop from "./Utils/Loop";
import World from "./World/World";
import Resize from "./Utils/Resize";
import AssetLoader from "./Utils/AssetLoader";
import InputController from "./UI/InputController";

let app = null;

export default class App {
  constructor() {
    if (app) return app;
    app = this;

    this.canvas = document.getElementById("threejs");
    this.scene = new THREE.Scene();

    // asset loading and pre-loader
    this.assetLoader = new AssetLoader();

    this.inputController = new InputController();

    this.world = new World();

    // camera and renderer
    this.camera = new Camera();
    this.renderer = new Renderer();

    this.resize = new Resize();
    this.loop = new Loop();
  }
}
