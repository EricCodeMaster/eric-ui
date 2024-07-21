<template>
  <div>
    <a-row style="margin-bottom: 16px">
      缓存提示方式：
      <a-switch v-model:checked="checked" checked-children="自定义" un-checked-children="内置" @change="handleChangeChecked" />
    </a-row>
    <a-alert v-if="showAlert" type="info" show-icon style="margin: 10px">
      <template #message>
        <a-space>
          <span>检测到有未完成的内容，是否继续编辑？</span>
          <a-button type="link" size="small" @click="handleUseFormCache">填充表单</a-button>
          <a-button type="link" size="small" @click="handleDeleteLocal">取消</a-button>
        </a-space>
      </template>
    </a-alert>
    <EForm v-model:model="formState" ref="formRef" :cacheOptions="cacheOptions">
      <EFormItem name="name" label="姓名" required>
        <a-input v-model:value="formState.name"></a-input>
      </EFormItem>
      <EFormItem name="sex" label="性别" required>
        <a-select v-model:value="formState.sex" :options="sexOptions" />
      </EFormItem>
      <EFormItem>
        <a-button type="primary" @click="handleSubmit">Submit</a-button>
      </EFormItem>
    </EForm>
    <div style="display: flex">
      初始化数据：
      <pre style="border: 1px solid #eee; margin-right: 10px">
        {{ formState }}
      </pre>
      缓存数据：
      <pre style="border: 1px solid #eee">
        {{ formCacheData }}
      </pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import _ from "lodash";

const formRef = ref(null);

const formState = ref({
  name: "eric ui",
  sex: 1,
});

const sexOptions = [
  { value: 0, label: "女" },
  { value: 1, label: "男" },
];

const cacheType =
  JSON.parse(localStorage.getItem("form-cache-tip-type")) || false;
const checked = ref(cacheType);

const handleChangeChecked = value => {
  localStorage.setItem("form-cache-tip-type", value);
};

// 模拟异步请求的函数
function formRequest() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          name: "详情数据",
          sex: 0,
        },
      });
    }, 2000);
  });
}
function submitRequest() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, data: "请求返回的数据" });
    }, 2000);
  });
}

const cacheOptions = {
  enableCache: true,
  userName: "eric",
  id: "formId",
  isCustomTip: checked.value,
  isEdit: true,
  formRequest: async () => {
    const res = await formRequest();
    formState.value = res.data;
    return res.success;
  },
  submitRequest: submitRequest,
};

const localState = ref({});
const formCacheData = computed(() => {
  return formRef.value?.formCache?.initLocalData?.value;
});

const showAlert = computed(
  () => checked.value && !_.isNil(formCacheData.value)
);

const handleSubmit = () => {
  formRef.value?.formCache?.submit();
};

const handleUseFormCache = () => {
  formRef.value?.formCache?.onOk();
};
const handleDeleteLocal = () => {
  formRef.value?.formCache?.clear();
};
</script>
