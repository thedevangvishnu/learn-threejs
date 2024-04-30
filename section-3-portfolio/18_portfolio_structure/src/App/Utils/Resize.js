import { sizesStore } from "./Store";

export default class Resize {
  constructor() {
    window.addEventListener("resize", () => {
      sizesStore.setState({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      });
    });
  }
}
