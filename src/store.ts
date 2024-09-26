import { ref } from "vue";

export const state = ref({ enabled: true });

export function enable() {
  state.value.enabled = true;
}

export function disable() {
  state.value.enabled = false;
}

export function setState(newState: typeof state.value) {
  state.value = newState;
}
