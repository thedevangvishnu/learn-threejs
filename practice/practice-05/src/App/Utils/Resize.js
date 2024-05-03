import { sizesStore } from "../Stores/sizesStore";

export default class Resize {
  constructor() {
    this.setResize();
  }

  setResize() {
    window.addEventListener("resize", () => {
      sizesStore.setState({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      });
    });
  }
}
