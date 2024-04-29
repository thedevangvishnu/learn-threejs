let canvas = null;

export default class Canvas {
  constructor() {
    if (canvas) return canvas;

    canvas = this;
    this.instance = document.querySelector(".threejs");
  }
}
