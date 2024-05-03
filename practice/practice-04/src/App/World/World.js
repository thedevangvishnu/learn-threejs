import * as THREE from "three";
import App from "../App";
import Environment from "./Environment";
import Physics from "./Physics";
import { appStateStore } from "../Stores/appStateStore";
import Character from "./Character";

export default class World {
  constructor() {
    this.app = new App();
    this.physics = new Physics();

    appStateStore.subscribe((state) => {
      if (state.isRapierLoaded) {
        this.environment = new Environment();
        this.character = new Character();
      }
    });

    this.loop();
  }

  loop() {
    this.physics.loop();
    if (this.character) this.character.loop();
  }
}
