<template>
  <EForm :model="formState">
    基础使用：
    <EFormItem name="name" label="姓名" required tip="这是label提示">
      <a-input v-model:value="formState.name"></a-input>
    </EFormItem>

    插槽式写法：
    <EFormItem name="sex" label="性别" required :tip="{ tipType: 'tooltip' }">
      <a-select v-model:value="formState.sex" :options="sexOptions" />
      <template #tipTitle>
        <a-image
          :width="200"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </template>
    </EFormItem>
    <EFormItem name="hobby" label="爱好" required :tip="hobbyTip">
      <a-input v-model:value="formState.hobby" />
      <template #tipContent>
        <a-image
          :width="200"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </template>
    </EFormItem>

    自定义：
    <EFormItem name="job" label="职业" required :tip="jobTip">
      <a-input v-model:value="formState.job" />
    </EFormItem>
  </EForm>
</template>

<script setup>
import { reactive } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";

const formState = reactive({
  name: undefined,
  sex: undefined,
  hobby: undefined,
  job: undefined,
});

const sexOptions = [
  { value: 0, label: "女" },
  { value: 1, label: "男" },
];

const hobbyTip = {
  tipType: "popover",
  tipTitle: "hobby提示",
};

const jobTip = {
  tipIcon: InfoCircleFilled,
  tipTitle: "这是提示1111",
  location: "suffix",
  tipPlacement: "topRight",
  iconStyle: {
    color: "green",
    fontSize: "14px",
    margin: "8px",
  },
};
</script>
