<script setup lang="ts">
import { ref } from "vue";
import { apiCall } from "./api";
import { state } from "./store";

const isPending = ref(false);

async function fireCall() {
  try {
    isPending.value = true;
    await apiCall();
  } finally {
    isPending.value = false;
  }
}
</script>

<template>
  <button @click="fireCall" :disabled="!state.enabled" />
  {{ isPending }}
  <div v-if="isPending" class="loading-spinner" />
</template>
