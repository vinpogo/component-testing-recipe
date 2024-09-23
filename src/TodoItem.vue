<script setup lang="ts">
export type Props = { text: string; isDone: boolean };
export type Emit = { check: [void]; uncheck: [void] };

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

function toggle() {
  if (props.isDone) emit("uncheck");
  else emit("check");
}
</script>

<template>
  <div>
    <label>{{ text }}</label>
    <input type="checkbox" :checked="props.isDone" @click="toggle" />
  </div>
</template>
