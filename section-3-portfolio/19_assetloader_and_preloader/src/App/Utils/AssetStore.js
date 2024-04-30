import { createStore } from "zustand/vanilla";

export const assetsToLoad = [
  {
    id: "earth",
    type: "texture",
    path: "/textures/2k_earth_daymap.jpg",
  },
  {
    id: "mars",
    type: "texture",
    path: "/textures/2k_mars.jpg",
  },
  {
    id: "mercury",
    type: "texture",
    path: "/textures/2k_mercury.jpg",
  },
  {
    id: "sun",
    type: "texture",
    path: "/textures/2k_sun.jpg",
  },
];

export const assetsStore = createStore((set) => ({
  assetsToLoad,
  loadedAssets: {},
  addAsset: (asset, id) =>
    set((state) => ({
      ...state,
      loadedAssets: {
        ...state.loadedAssets,
        [id]: asset,
      },
    })),
}));
