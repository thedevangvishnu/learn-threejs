import { createStore } from "zustand/vanilla";

export const inputsStore = createStore(() => ({
  forward: false,
  backward: false,
  left: false,
  right: false,
}));
