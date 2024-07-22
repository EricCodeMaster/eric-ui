<template>
  <div>
    <a-space>
      <a-switch
        v-model:checked="checked"
        checked-children="编辑"
        un-checked-children="详情"
      />
      <a-radio-group
        v-model:value="col"
        size="small"
        option-type="button"
        :options="options"
      />
    </a-space>
    <a-divider />
    <EEditableDesc v-model:value="value" :col="col" :editable="checked" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const checked = ref(true);
const col = ref(2);

const value = [
  { label: "中文名", value: "Eric ui", editable: true },
  { label: "英文名", value: "Eric ui", editable: true },
  { label: "职业", value: "前端开发", editable: true },
  { label: "年龄", value: "18" },
  {
    label: "描述",
    value:
      "这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长描述",
  },
];

const options = [
  {
    label: "1列",
    value: 1,
  },
  {
    label: "2列",
    value: 2,
  },
  {
    label: "3列",
    value: 3,
  },
];
</script>
