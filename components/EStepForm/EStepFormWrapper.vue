<template>
  <!-- <component
    :is="$attrs.viewMode ? JModalInfo : JModalDialog"
    v-bind="modalProps"
    v-if="modalMode"
    @cancel="$emit('cancel', false)"
  >
    <StepForm v-bind="$attrs" :attachTo="footerRef">
      <slot></slot>
      <template #extraButton>
        <slot name="extraButton"></slot>
      </template>
    </StepForm>
    <template #footer v-if="!$attrs.viewMode">
      <div ref="footerRef"></div>
    </template>
  </component> -->
  <StepForm v-bind="$attrs" v-if="!modalMode">
    <slot></slot>
    <template #extraButton>
      <slot name="extraButton"></slot>
    </template>
  </StepForm>
</template>

<script>
export default {
  name: "EStepForm",
};
</script>

<script setup>
import StepForm from "./EStepForm.vue";
import { ref } from "vue";
// import JModalDialog from "../ModalExtend/ModalDialog.js";
// import JModalInfo from "../ModalExtend/ModalInfo.js";

defineProps({
  modalProps: {
    type: Object,
    default: () => ({}),
  },
  modalMode: {
    type: Boolean,
    default: false,
  },
});

const footerRef = ref(null);
</script>
