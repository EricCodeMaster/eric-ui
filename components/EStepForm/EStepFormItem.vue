<template>
  <div class="e-step-form__item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "EStepFormItem",
  props: {
    title: {
      type: String,
      default: "",
    },
    beforeNext: {
      type: Function,
      default: () => true,
    },
  },
};
</script>
