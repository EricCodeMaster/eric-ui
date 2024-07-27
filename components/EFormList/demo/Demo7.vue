<template>
  <a-form :model="formState" @finish="handleOnFinish">
    <a-form-item label="用户信息">
      <EFormList
        v-model:value="formState.userInfo"
        :after-add="handleOnAfterAdd"
        :after-remove="handleOnAfterRemove"
        :before-add="handleOnBeforeAddRow"
        :before-remove="handleOnBeforeRemoveRow"
      >
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

const handleOnAfterAdd = () => {
  window.alert("after add");
};

const handleOnAfterRemove = () => {
  window.alert("after remove");
};

const handleOnBeforeAddRow = () => {
  window.alert("before add");
};

const handleOnBeforeRemoveRow = () => {
  window.alert("before remove");
};

const handleOnFinish = () => {
  alert(JSON.stringify(formState.userInfo));
};
</script>
