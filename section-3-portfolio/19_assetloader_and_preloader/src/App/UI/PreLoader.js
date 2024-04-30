import { assetsStore } from "../Utils/AssetStore";

export default class PreLoader {
  constructor() {
    this.assetsStore = assetsStore;

    this.overlay = document.querySelector(".overlay");
    this.loading = document.querySelector(".loading");
    this.progressPercentage = document.getElementById("progressPercentage");
    this.startButton = document.querySelector(".start");

    this.assetsStore.subscribe((state) => {
      this.numberOfLoadedAssets = Object.keys(state.loadedAssets).length;
      this.numberOfAssetsToLoad = state.assetsToLoad.length;

      this.progress = this.numberOfLoadedAssets / this.numberOfAssetsToLoad;
      this.progress = Math.trunc(this.progress * 100);

      this.progressPercentage.textContent = this.progress;

      if (this.progress === 100) {
        this.loading.classList.add("fade");

        window.setTimeout(() => {
          this.ready();
        }, 1000);
      }
    });
  }

  ready() {
    this.loading.remove();
    this.startButton.classList.add("fadeIn");

    this.startButton.addEventListener(
      "click",
      () => {
        this.startButton.classList.add("fadeOut");
        this.overlay.classList.add("fade");

        window.setTimeout(() => {
          this.overlay.remove();
          this.startButton.remove();
        }, 1000);
      },
      { once: true }
    );
  }
}
