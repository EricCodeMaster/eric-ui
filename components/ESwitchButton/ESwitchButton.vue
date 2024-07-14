<template>
  <!-- 是非操作符，二元互斥组件，switch -->
  <a-button
    :disabled="disabled"
    @click="handleSwitch"
    v-bind="$attrs"
    :class="{ 'e-btn__switch--readonly': readonly }"
  >
    <a-space :size="0">
      <span
        :class="[isCheck ? 'e-btn__switch--active' : 'e-btn__switch--default']"
        >{{ checkedChildren }}</span
      >
      <span class="e-btn__switch--default">/</span>
      <span
        :class="[isCheck ? 'e-btn__switch--default' : 'e-btn__switch--active']"
        >{{ unCheckedChildren }}</span
      >
    </a-space>
  </a-button>
</template>

<script>
export default {
  name: "ESwitchButton",
};
</script>

<script setup>
import { computed } from "vue";
// 支持v-model
const emit = defineEmits(["change", "update:value"]);
const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  checkedChildren: {
    type: String,
    default: "是",
  },
  checkedValue: {
    type: [String, Number, Boolean],
    default: 1,
  },
  unCheckedChildren: {
    type: String,
    default: "非",
  },
  unCheckedValue: {
    type: [String, Number, Boolean],
    default: 0,
  },
  value: {
    type: [String, Number, Boolean],
    default: "1",
  },
});
const isCheck = computed(() => props.value === props.checkedValue);
function handleSwitch(e) {
  if (!props.readonly && !props.disabled) {
    const switchValue = isCheck.value
      ? props.unCheckedValue
      : props.checkedValue;
    emit("change", switchValue, e);
    emit("update:value", switchValue);
  }
}
</script>
