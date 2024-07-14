<template>
  <a-space>
    <ESwitchButton v-model:value="isCheck" />
    <ESwitchButton
      v-model:value="isCheck"
      checkedChildren="开"
      unCheckedChildren="关"
    />
    <ESwitchButton v-model:value="isCheck" readonly />
    <ESwitchButton v-model:value="isCheck" disabled />
  </a-space>
  <br />
  <br />
  <a-input-group compact>
    <ESwitchButton v-model:value="isCheck" />
    <a-select style="width: 200px" placeholder="请选择条件" allowClear />
  </a-input-group>
</template>

<script setup>
import { ref } from "vue";
const isCheck = ref(1);
</script>
