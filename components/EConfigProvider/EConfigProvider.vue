<script setup>
import { provide } from "vue";

const props = defineProps({
  modal: {
    type: Object,
    default: () => ({}),
  },
  helper: {
    type: Object,
    default: () => ({}),
  },
  actionButton: {
    type: Object,
    default: () => ({}),
  },
  image: {
    type: Object,
    default: () => ({}),
  },
  formList: {
    type: Object,
    default: () => ({}),
  },
  grid: {
    type: Object,
    default: () => ({}),
  },
  form: {
    type: Object,
    default: () => ({}),
  },
});

provide("opConfigProvider", props);
</script>

<template>
  <slot />
</template>

<script>
export default {
  name: "EConfigProvider",
  inheritAttrs: false,
};
</script>
