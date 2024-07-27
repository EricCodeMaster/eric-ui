<template>
  <a-form :model="formState" @finish="handleOnFinish">
    <a-form-item label="用户信息" name="userInfo">
      <EFormList
        v-model:value="formState.userInfo"
        :min="3"
        :max="5"
        buttonInNewLine
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
import { reactive } from "vue";

const formState = reactive({
  userInfo: [],
});

const handleOnFinish = () => {
  alert(JSON.stringify(formState.userInfo));
};
</script>
