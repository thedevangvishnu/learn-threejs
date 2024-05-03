import { createStore } from "zustand/vanilla";

export const appStateStore = createStore(() => ({
  isRapierLoaded: false,
}));
