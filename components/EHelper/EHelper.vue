<template>
  <div
    :class="{
      ['e-helper']: true,
      [colorAndIcon.cls || '']: true,
      ['e-helper__no-line']: !!opConfig.helper?.noUnderLine,
    }"
  >
    <a-tooltip v-bind="toolTipConfig">
      <template #title v-if="tip">
        <span style="white-space: pre-line">{{ tip }}</span>
      </template>
      <span
        @click.prevent="onClick"
        :style="{ cursor: link ? 'pointer' : null }"
      >
        <slot name="icon" v-if="!noIcon">
          <component :is="colorAndIcon.icon" />
        </slot>
        <slot name="text">
          <span class="e-helper__txt" v-if="text">{{ text }}</span>
        </slot>
      </span>
    </a-tooltip>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import {
  InfoCircleOutlined,
  WarningOutlined,
  StopOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";

const props = defineProps({
  /**
   * 词条文案
   */
  text: {
    type: String,
  },
  /**
   * 词条主题，可选值为[info, warn, danger]，默认为info
   */
  theme: {
    validator(value) {
      return ["info", "warn", "danger"].includes(value);
    },
  },
  /**
   * 词条tip文案
   */
  tip: String,
  /**
   * 词条跳转链接
   */
  link: String,
  /**
   * 隐藏词条左侧ICON
   */
  noIcon: Boolean,
  /**
   * tooltip原生API
   */
  toolTipConfig: Object,
});

const opConfig = inject("opConfigProvider", {
  helper: { noUnderLine: false, theme: "info" },
});

const onClick = () => {
  if (!props.link) {
    return;
  }
  window.open(props.link);
};

const themeConfig = {
  warn: {
    icon: WarningOutlined,
    cls: "e-helper__warn",
  },
  danger: {
    icon: StopOutlined,
    cls: "e-helper__danger",
  },
  help: {
    icon: QuestionCircleOutlined,
    cls: "e-helper__warn",
  },
  info: {
    icon: InfoCircleOutlined,
    cls: undefined,
  },
};

const colorAndIcon = computed(() => {
  return themeConfig[props.theme || opConfig.helper?.theme || "info"];
});
</script>

<script>
export default {
  name: "EHelper",
};
</script>
