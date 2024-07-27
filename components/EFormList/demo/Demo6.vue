<template>
  <a-form :model="formState" @finish="handleOnFinish">
    <a-form-item label="用户信息" name="userInfo">
      <EFormList ref="formListRef" v-model:value="formState.userInfo">
        <template #addIcon></template>
        <template #deleteIcon></template>
        <template #copyIcon></template>
        <template #default="{ row, triggerChange }">
          <a-input
            :value="row.subKey"
            label="键"
            placeholder="请输入key"
            @change="e => triggerChange({ subKey: e.target.value })"
          />
          <a-input
            v-model:value="row.subValue"
            label="值"
            placeholder="请输入value"
            @change="e => triggerChange({ subValue: e.target.value })"
          />
        </template>
      </EFormList>
    </a-form-item>
    <div style="margin-bottom: 12px">
      操作行号：
      <a-input-number
        v-model:value="formItemNewIndex"
        placeholder="请输入数据新行号"
        style="width: 150px"
        :min="0"
      ></a-input-number>
    </div>
    <a-space style="margin-bottom: 12px">
      <a-button @click="handleAdd">增加</a-button>
      <a-button @click="handleCopy">复制</a-button>
      <a-button @click="handleRemove">删除</a-button>
    </a-space>
    <div style="margin-bottom: 12px">
      <a-space>
        <a-input-number
          v-model:value="formItemIndex"
          placeholder="请输入数据行号"
          style="width: 150px"
          :min="0"
        ></a-input-number>
        <a-button @click="handleMove">交换位置</a-button>
      </a-space>
    </div>
    <div style="margin-bottom: 12px">
      <a-button @click="handleShowData">显示当前表格数据</a-button>
    </div>
    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { isNil } from "lodash-es";

const formState = reactive({
  userInfo: [
    {
      subKey: "subKey1",
      subValue: "subValue1",
    },
    {
      subKey: "subKey2",
      subValue: "subValue3",
    },
  ],
});

const formItemIndex = ref();
const formItemNewIndex = ref();
const formData = ref("");
const formListRef = ref(null);

const handleAdd = () => {
  formListRef.value.add({ subKey: "key demo", subValue: "subValue demo" });
};

const handleCopy = () => {
  if (!isNil(formItemNewIndex.value)) {
    formListRef.value.copy(formItemNewIndex.value);
  }
};

const handleRemove = () => {
  if (!isNil(formItemNewIndex.value)) {
    formListRef.value.remove(formItemNewIndex.value);
  }
};

const handleMove = () => {
  if (!isNil(formItemIndex.value) && !isNil(formItemNewIndex.value)) {
    formListRef.value.move(formItemIndex.value, formItemNewIndex.value);
  }
};

const handleShowData = () => {
  formData.value = JSON.stringify(formListRef.value.getData());
  alert(JSON.stringify(formData.value));
};

const handleOnFinish = () => {
  alert(JSON.stringify(formState.userInfo));
};
</script>
