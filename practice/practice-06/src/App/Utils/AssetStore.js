import { createStore } from "zustand/vanilla";

const assetsToLoad = [
  {
    id: "avatar",
    type: "model",
    path: "/models/avatar.glb",
  },
];

const assetStore = createStore((set) => ({
  assetsToLoad,
  loadedAssets: {},
  addLoadedAsset: (asset, id) =>
    set((state) => ({
      loadedAssets: {
        ...state.loadedAssets,
        [id]: asset,
      },
    })),
}));

export default assetStore;
