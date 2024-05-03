import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { assetsStore } from "../Stores/assetsStore";

export default class AssetLoader {
  constructor() {
    this.assetsStore = assetsStore.getState();
    this.instantiateLoaders();
    this.loadAssets();
  }

  instantiateLoaders() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(dracoLoader);

    this.textureLoader = new THREE.TextureLoader();
  }

  loadAssets() {
    this.assetsStore.assetsToLoad.forEach((asset) => {
      if (asset.type === "texture") {
        this.textureLoader.load(asset.path, (loadedAsset) => {
          this.assetsStore.addAsset(loadedAsset, asset.id);
        });
      }

      if (asset.type === "model") {
        this.gltfLoader.load(asset.path, (loadedAsset) => {
          this.assetsStore.addAsset(loadedAsset, asset.id);
        });
      }
    });
  }
}
