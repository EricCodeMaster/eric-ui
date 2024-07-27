<template>
  <a-space style="margin-bottom: 16px">
    <a-button @click="visible = !visible">切换显示与隐藏</a-button>
    <a-button @click="handleSetValueToForm">赋值</a-button>
  </a-space>

  <a-form :model="formState" @finish="handleOnFinish">
    <a-form-item label="用户信息" name="userInfo">
      <EFormList
        ref="formListRef"
        v-model:value="formState.userInfo"
        button-in-new-line
        v-if="visible"
      >
        <template #creatorButton>
          <a-button type="primary">新增一行</a-button>
        </template>
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
import { cloneDeep } from "lodash-es";

const formState = reactive({
  userInfo: [],
});

const formListRef = ref(null);

const visible = ref(true);

const handleOnFinish = () => {
  alert(JSON.stringify(formState.userInfo));
};

const originValue = [
  {
    subKey: "11",
    subValue: "22",
  },
  {
    subKey: "11",
    subValue: "22",
  },
  {
    subKey: "22",
    subValue: "33",
  },
];

const handleSetValueToForm = () => {
  const fullData = cloneDeep(originValue).map(itm => {
    const randomInt = Math.floor(Math.random() * 100);

    itm.subKey = `${randomInt}`;
    itm.subValue = `${randomInt}`;

    return itm;
  });

  fullData.splice(0, Math.floor(Math.random() * 3));

  formListRef.value.setData(fullData);
};
</script>
