import App from "../App";
import { inputsStore } from "../Stores/inputsStore";

export default class InputController {
  constructor() {
    this.app = new App();

    this.keysPressed = {};

    window.addEventListener("keydown", (event) => this.onKeyDown(event));
    window.addEventListener("keyup", (event) => this.onKeyUp(event));
  }

  onKeyDown(event) {
    if (this.keysPressed[event.code]) return;

    switch (event.code) {
      case "KeyW":
      case "ArrowUp":
        inputsStore.setState({ forward: true });
        break;
      case "KeyA":
      case "ArrowLeft":
        inputsStore.setState({ left: true });
        break;
      case "KeyS":
      case "ArrowDown":
        inputsStore.setState({ backward: true });
        break;
      case "KeyD":
      case "ArrowRight":
        inputsStore.setState({ right: true });
        break;
    }

    this.keysPressed[event.code] = true;
  }

  onKeyUp(event) {
    switch (event.code) {
      case "KeyW":
      case "ArrowUp":
        inputsStore.setState({ forward: false });
        break;
      case "KeyA":
      case "ArrowLeft":
        inputsStore.setState({ left: false });
        break;
      case "KeyS":
      case "ArrowDown":
        inputsStore.setState({ backward: false });
        break;
      case "KeyD":
      case "ArrowRight":
        inputsStore.setState({ right: false });
        break;
    }

    this.keysPressed[event.code] = false;
  }
}
