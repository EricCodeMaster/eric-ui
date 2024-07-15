<template>
  <div class="e-tag-customTag">
    <a-tag :color="tagData.color" v-bind="$attrs" :style="{ ...tagStyle }">
      <template #icon>
        <component :is="tagData.icon"></component>
      </template>
      {{ name || tagData.name || tagData }}
    </a-tag>
  </div>
</template>
<script setup>
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  PauseCircleFilled,
  MinusCircleOutlined,
  DeleteFilled,
  SyncOutlined,
  HourglassOutlined,
  RollbackOutlined,
  SnippetsOutlined,
} from "@ant-design/icons-vue";
import { computed } from "vue";

const STATUS = [
  {
    type: "pending_approved",
    name: "待审批",
    color: "warning",
    icon: ClockCircleFilled,
  },
  { type: "approving", name: "审批中", color: "cyan", icon: PauseCircleFilled },
  {
    type: "approved",
    name: "已审批",
    color: "success",
    icon: CheckCircleFilled,
  },
  {
    type: "approved_reject",
    name: "已驳回",
    color: "error",
    icon: CloseCircleFilled,
  },
  { type: "deleted", name: "已删除", color: "default", icon: DeleteFilled },
  {
    type: "finished",
    name: "已结束",
    color: "default",
    icon: MinusCircleOutlined,
  },
  { type: "cancel", name: "已取消", color: "error", icon: CloseCircleFilled },
  {
    type: "stopped",
    name: "已停止",
    color: "default",
    icon: MinusCircleOutlined,
  },
  {
    type: "revocation",
    name: "已撤回",
    color: "default",
    icon: RollbackOutlined,
  },
  { type: "paused", name: "已暂停", color: "cyan", icon: PauseCircleFilled },
  {
    type: "noStart",
    name: "未开始",
    color: "default",
    icon: MinusCircleOutlined,
  },
  {
    type: "run_success",
    name: "运行成功",
    color: "success",
    icon: CheckCircleFilled,
  },
  {
    type: "start_success",
    name: "启动成功",
    color: "success",
    icon: CheckCircleFilled,
  },
  {
    type: "in_preparation",
    name: "准备中",
    color: "warning",
    icon: HourglassOutlined,
  },
  {
    type: "processing",
    name: "进行中",
    color: "processing",
    icon: SyncOutlined,
  },
  {
    type: "in_starting",
    name: "启动中",
    color: "processing",
    icon: SyncOutlined,
  },
  {
    type: "in_running",
    name: "运行中",
    color: "processing",
    icon: SyncOutlined,
  },
  {
    type: "run_cancel",
    name: "运行失败",
    color: "error",
    icon: CloseCircleFilled,
  },
  {
    type: "start_cancel",
    name: "启动失败",
    color: "error",
    icon: CloseCircleFilled,
  },
  { type: "online", name: "已上线", color: "success", icon: CheckCircleFilled },
  {
    type: "offline",
    name: "已下线",
    color: "default",
    icon: CloseCircleFilled,
  },
  { type: "draft", name: "草稿", color: "default", icon: SnippetsOutlined },
  { type: "invalid", name: "未生效", color: "default", icon: SnippetsOutlined },
  { type: "valid", name: "生效中", color: "success", icon: CheckCircleFilled },
];

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  color: {
    // 状态标签没有边框、背景色，不支持自定义颜色，只支持tag的预置色
    type: String,
    default: "rgba(0, 0, 0, 0.88)",
  },
  icon: {
    type: Function,
    default: () => {},
  },
  tagStyle: {
    type: Object,
    default() {
      return {
        backgroundColor: "transparent",
        border: "transparent",
      };
    },
  },
});

const tagData = computed(() => {
  if (props.type === "") {
    return { name: props.name, color: props.color, icon: props.icon };
  }
  return STATUS.find(item => props.type === item.type) || props.type;
});
</script>

<script>
export default {
  name: "EStatusTag",
};
</script>
