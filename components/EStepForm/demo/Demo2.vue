<template>
  <div style="width: 100%">
    <a-space style="margin-bottom: 32px">
      <span>
        展示模式
        <a-switch v-model:checked="viewMode"></a-switch>
      </span>
    </a-space>
    <EStepForm
      ref="formRef"
      :model="formState"
      @finish="handleSubmit"
      @cancel="handleCancel"
      :viewMode="viewMode"
      :modalMode="modalMode"
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
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<script setup>
import { reactive, ref } from "vue";

const viewMode = ref(false);
const modalMode = ref(false);
const customDivider = ref(false);

const formState = reactive({
  userName1: "Eric ui1",
  userName2: "Eric ui2",
  userName3: "Eric ui3",
  userName4: "Eric ui4",
  userName5: "Eric ui5",
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
    }, 3000)
  );
};
</script>
