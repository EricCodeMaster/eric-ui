<template>
  <div>敏感词：{{ sensitiveWords }}</div>
  <EForm :model="formState" :checkSensitiveWords="checkSensitiveWords">
    <EFormItem
      name="name"
      label="姓名"
      required
      help="默认提示：名称不能包含敏感词"
    >
      <a-input v-model:value="formState.name"></a-input>
    </EFormItem>
    <EFormItem name="sex" label="性别" required>
      <a-select v-model:value="formState.sex" :options="sexOptions" />
      <template #help>
        <span>默认提示：xxxx</span>
      </template>
    </EFormItem>
    <EFormItem name="hobby" label="爱好" required>
      <a-input v-model:value="formState.hobby" />
      <template #extra>
        <span>额外提示</span>
      </template>
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

const sensitiveWords = "超级";

const checkSensitiveWords = itemData => {
  if (String(itemData).includes(sensitiveWords)) {
    return `包含敏感词--${sensitiveWords}`;
  }
  return "";
};
</script>
