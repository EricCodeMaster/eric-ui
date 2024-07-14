<template>
  <div>
    <div :style="headStyle" class="e-section_head">
      <a-row justify="space-between">
        <span>
          <slot name="head_title">{{ title }}</slot>
        </span>
        <a-space>
          <slot name="head_tool" />
        </a-space>
      </a-row>
    </div>
    <div :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<script>
// 暴露组件名
export default {
  name: "ESection",
};
</script>

<script setup>
import { computed } from "vue";
import _ from "lodash";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  contentStyle: {
    type: Object,
    default: () => ({}),
  },
  titleStyle: {
    type: Object,
    default: () => ({}),
  },
  bottom: {
    type: [String, Number],
    default: 0,
  },
});

const headStyle = computed(() => {
  const style = {
    marginBottom: _.isString(props.bottom) ? props.bottom : `${props.bottom}px`,
    ...props.titleStyle,
  };
  return style;
});
</script>
