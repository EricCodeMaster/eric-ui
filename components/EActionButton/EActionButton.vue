<template>
  <a-space size="small" class="e-action-button__container">
    <a-button v-if="!headNodes.length" type="link" disabled>
      {{ noneBtnTextFinal }}
    </a-button>
    <template v-for="(nodeData, index) in headNodes" :key="index">
      <VNode :vnode="nodeData" />
      <a-divider v-if="index < headNodes.length - 1" type="vertical" />
    </template>
    <a-divider v-if="!!lastNodes.length" type="vertical" />
    <a-dropdown v-if="lastNodes.length > 1" placement="bottomRight">
      <a @click.stop.prevent>
        {{ moreBtnText }}
        <CaretDownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="(nodeData, index) in lastNodes" :key="index">
            <VNode :vnode="nodeData" />
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <template v-else-if="lastNodes.length === 1">
      <VNode :vnode="lastNodes[0]" />
    </template>
  </a-space>
</template>
<script>
import { defineComponent, computed, inject, Fragment } from "vue";
import VNode from "../VNode.vue";
import _ from "lodash";
import { CaretDownOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "JActionButton",
  components: {
    VNode,
    CaretDownOutlined,
  },
  props: {
    splitNumber: {
      type: Number,
      default: 0,
    },
    moreText: {
      type: String,
      default: "",
    },
    noneBtnText: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const $xetable = inject("$xetable");

    const opConfig = inject("opConfigProvider", {
      actionButton: { moreText: "", noneBtnText: "" },
    });

    const moreBtnText = computed(
      () => props.moreText || opConfig.actionButton?.moreText || "更多操作"
    );

    const noneBtnTextFinal = computed(
      () => props.noneBtnText || opConfig.actionButton?.noneBtnText || "无权限"
    );

    const splitNumber = computed(
      () => props.splitNumber || opConfig.actionButton?.splitNumber || 2
    );

    const nodeInstance = computed(() => {
      // 该工具只限定在vxe-table中使用，其他场景再进行扩充，增加监测值
      if (_.get($xetable, "props.data")) {
        const slots = context.slots?.default().map(com => {
          if (com.type === Fragment && Array.isArray(com.children)) {
            return com.children;
          }
          if (typeof com.type === "symbol") {
            return [];
          }
          return com;
        });
        return _.flatten(slots);
      }
      return [];
    });
    const headNodes = computed(() =>
      _.take(nodeInstance.value, splitNumber.value)
    );
    const lastNodes = computed(() =>
      _.drop(nodeInstance.value, splitNumber.value)
    );

    return {
      moreBtnText,
      headNodes,
      lastNodes,
      noneBtnTextFinal,
    };
  },
});
</script>
