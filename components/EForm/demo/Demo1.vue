<template>
  <EForm :model="formState">
    <EFormItem name="name" label="姓名" required>
      <a-input v-model:value="formState.name"></a-input>
    </EFormItem>
    <EFormItem name="sex" label="性别" required>
      <a-select v-model:value="formState.sex" :options="sexOptions" />
    </EFormItem>
    <EFormItem>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </EFormItem>
  </EForm>
</template>

<script setup>
import { reactive } from "vue";

const formState = reactive({
  name: undefined,
  sex: undefined,
});

const sexOptions = [
  { value: 0, label: "女" },
  { value: 1, label: "男" },
];
</script>
