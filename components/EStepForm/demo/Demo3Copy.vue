<template>
  <div style="width: 700px">
    <a-space>
      <span>
        吸底
        <a-switch v-model:checked="attachToBody"></a-switch>
      </span>
      <span>
        展示模式
        <a-switch v-model:checked="viewMode"></a-switch>
      </span>
      <span>
        展示模式时使用自定义分隔条
        <a-switch v-model:checked="customDivider"></a-switch>
      </span>
      <span>
        弹窗模式
        <a-switch v-model:checked="modalMode"></a-switch>
      </span>
      <span>
        吸底模式
        <a-switch v-model:checked="isAffix"></a-switch>
      </span>
    </a-space>
    <p></p>
    <a-button v-if="modalMode" @click="visible = true">打开</a-button>
    <EStepForm
      v-if="!modalMode || visible"
      :modalProps="{ title: '测试弹窗', visible: visible }"
      ref="formRef"
      :model="formState"
      :attachTo="attachToBody ? out : null"
      @finish="handleSubmit"
      @cancel="handleCancel"
      :viewMode="viewMode"
      :modalMode="modalMode"
      :affixConfig="isAffix ? { offsetBottom: 100 } : null"
    >
      <EStepFormItem title="第0步" :beforeNext="handleNext"
        >123123123</EStepFormItem
      >
      <EStepFormItem title="第一步">
        <EFormItem
          label="User name1"
          name="userName1"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.userName1" />
        </EFormItem>
        <EFormItem
          label="User name4"
          name="userName4"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.userName4" />
        </EFormItem>
      </EStepFormItem>
      <EStepFormItem title="第二步">
        <EFormItem
          label="User name2"
          name="userName2"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.userName2" />
        </EFormItem>
      </EStepFormItem>
      <EStepFormItem title="第3步">
        <EFormItem
          label="User name3"
          name="userName3"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.userName3" />
        </EFormItem>
      </EStepFormItem>
      <template #extraButton>
        <a-button>额外按钮</a-button>
      </template>
      <template #divider="{ title }" v-if="customDivider">
        <span style="border: 1px solid red">分隔条 - {{ title }}</span>
      </template>
    </EStepForm>
    <div
      style="position: fixed; bottom: 0; width: 100%; text-align: center"
      ref="out"
    ></div>
    <div style="margin-top: 200px">{{ JSON.stringify(formState) }}</div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<script setup>
import { reactive, ref } from "vue";
const attachToBody = ref(false);

const viewMode = ref(false);
const modalMode = ref(false);
const customDivider = ref(false);
const visible = ref(false);
const isAffix = ref(false);

const out = ref(null);

const formState = reactive({
  userName1: "",
  userName2: "",
  userName3: "",
  userName4: "",
});

const formRef = ref(null);

const handleSubmit = () => {
  console.log(formState);
  visible.value = false;
};

const handleCancel = () => {
  alert("已取消");
  visible.value = false;
};

const handleNext = async () => {
  return await new Promise(resolve =>
    setTimeout(() => {
      resolve(true);
    }, 3000)
  );
};
</script>
