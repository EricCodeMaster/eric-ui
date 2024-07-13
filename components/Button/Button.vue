<template>
  <a-tooltip v-bind="isPrimitive ? {} : tooltip">
    <template #title v-if="isTooltipBtn">
      <template v-if="isPrimitive">{{ tooltip }}</template>
      <slot v-else name="tooltip" />
    </template>
    <a-button v-bind="{ ...$attrs, onClick: handleClick }" data-testid="buttonTestId">
      <template v-for="(slotRender, slotName) in $slots" :key="slotName" #[slotName]="scoped">
        <slot :name="slotName" v-bind="scoped || {}"></slot>
      </template>
    </a-button>
  </a-tooltip>
</template>

<script>
export default {
  name: 'EButton',
  inheritAttrs: false,
};
</script>

<script setup>
import { useAttrs, useSlots, computed } from 'vue';
import { Modal } from 'ant-design-vue';
import { isNil, isNumber, isString } from 'lodash';

const props = defineProps({
  config: {
    type: Object,
    default: () => null,
  },
  modalType: {
    type: String,
    default: 'confirm',
  },
  tooltip: {
    type: [Object, String, Number],
    default: () => null,
  },
});

const attrs = useAttrs();

const handleClick = (e) => {
  if (!props.config) {
    attrs.onClick && attrs.onClick(e);
  } else {
    Modal[props.modalType || 'confirm'](props.config || {});
  }
};
// tooltip 为简单数据类型时，直接显示
const isPrimitive = computed(() => {
  return isString(props.tooltip) || isNumber(props.tooltip);
});

const slots = useSlots();

const isTooltipBtn = computed(() => {
  return slots.tooltip || !isNil(props.tooltip);
});
</script>
