import { createStore } from "zustand/vanilla";

const assetsToLoad = [
  {
    id: "sun",
    type: "texture",
    path: "/textures/2k_sun.jpg",
  },
  {
    id: "sun",
    type: "texture",
    path: "/textures/2k_sun.jpg",
  },
  {
    id: "sun",
    type: "texture",
    path: "/textures/2k_sun.jpg",
  },
  {
    id: "sun",
    type: "texture",
    path: "/textures/2k_sun.jpg",
  },
];

export const assetsStore = createStore((set) => ({
  assetsToLoad,
  loadedAssets: [],
  addAsset: (asset, id) =>
    set((state) => ({
      ...state,
      loadedAssets: {
        ...state.loadedAssets,
        [id]: asset,
      },
    })),
}));
