<template>
  <div style="width: 100%">
    <a-space style="margin-bottom: 32px">
      <span>
        吸底
        <a-switch v-model:checked="attachToBody"></a-switch>
      </span>
      <span>
        吸底配置
        <a-switch v-model:checked="isAffix"></a-switch>
      </span>
    </a-space>
    <EStepForm
      ref="formRef"
      :model="formState"
      :attachTo="attachToBody ? out : null"
      @finish="handleSubmit"
      @cancel="handleCancel"
      :viewMode="viewMode"
      :modalMode="modalMode"
      :affixConfig="isAffix ? { offsetBottom: 100 } : null"
    >
      <EStepFormItem title="步骤1" :beforeNext="handleNext">
        <EFormItem label="User name1" name="userName1" required>
          <a-input v-model:value="formState.userName1" />
        </EFormItem>
      </EStepFormItem>
      <EStepFormItem title="步骤2">
        <EFormItem label="User name2" name="userName2" required>
          <a-input v-model:value="formState.userName2" />
        </EFormItem>
        <EFormItem label="User name3" name="userName3" required>
          <a-input v-model:value="formState.userName3" />
        </EFormItem>
      </EStepFormItem>
      <EStepFormItem title="步骤3">
        <EFormItem label="User name4" name="userName4" required>
          <a-input v-model:value="formState.userName4" />
        </EFormItem>
      </EStepFormItem>
      <EStepFormItem title="步骤4">
        <EFormItem label="User name5" name="userName5" required>
          <a-input v-model:value="formState.userName5" />
        </EFormItem>
      </EStepFormItem>
    </EStepForm>
    <div
      style="
        position: fixed;
        bottom: 0;
        width: 50%;
        text-align: center;
        z-index: 999;
      "
      ref="out"
    ></div>
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
const isAffix = ref(false);

const out = ref(null);

const formState = reactive({
  userName1: "",
  userName2: "",
  userName3: "",
  userName4: "",
  userName5: "",
});

const formRef = ref(null);

const handleSubmit = () => {
  console.log(formState);
  alert(`提交数据：${JSON.stringify(formState, null, 2)}`);
};

const handleCancel = () => {
  alert("已取消");
};

const handleNext = async () => {
  return await new Promise(resolve =>
    setTimeout(() => {
      resolve(true);
    }, 2000)
  );
};
</script>
