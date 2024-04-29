import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Canvas from "./Canvas";
import Loop from "./Utils/Loop";
import World from "./World/World";
import Scene from "./Scene";

let instance = null;

export default class App {
  constructor() {
    if (instance) return instance;

    instance = this;

    this.canvas = new Canvas();
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.loop = new Loop();
    this.world = new World();

    // console.log(this.canvas.instance);
    // console.log(this.camera);
    // console.log(this.renderer);
    // console.log(this.world);
    // console.log("app constructor", this);
    console.log(this.scene.instance.children);
  }
}
