<template>
  <div>
    <a-form :model="formState" @finish="handleOnFinish">
      <a-form-item>
        <EFormList
          v-model:value="formState.filterInfo"
          :isShowCopyButton="false"
        >
          <template #copyIcon></template>
          <template #itemRightRegion="{ triggerChange }">
            <a-button
              type="primary"
              @click.stop="triggerChange({ name: '名字叫itemRightRegion' })"
            >
              添加名字
            </a-button>
            <a-button
              type="primary"
              @click.stop="triggerChange({ dress: '青岛' })"
              >添加地址</a-button
            >
          </template>
          <template #moreItemActionBtn="{ triggerChange }">
            <a @click.stop="triggerChange({ subValue: '点击了设置' })"
              ><SettingOutlined
            /></a>
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
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";

const formState = reactive({
  filterInfo: [{ subKey: "1", subValue: "2" }],
});

function handleOnFinish() {
  console.log(formState.filterInfo);
}
</script>
