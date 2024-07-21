<template>
  <a-row align="middle" style="margin-bottom: 16px">
    缓存提示方式：
    <a-switch
      v-model:checked="checked"
      checked-children="详情"
      un-checked-children="编辑"
    />
  </a-row>
  <EForm :model="formState" :readonly="checked" :toggle="true">
    <EFormItem name="name" label="姓名" required>
      <a-input v-model:value="formState.name"></a-input>
    </EFormItem>
    <EFormItem name="sex" label="性别" required>
      <a-select v-model:value="formState.sex" :options="sexOptions" />
    </EFormItem>
    <EFormItem name="desc" label="描述">
      <a-textarea v-model:value="formState.desc" />
    </EFormItem>
    <EFormItem label="创建时间" name="rangePicker">
      <a-range-picker
        v-model:value="formState.rangePicker"
        :placeholder="['开始', '结束']"
        :value-format="dateFormat"
        :format="dateFormat"
      />
    </EFormItem>
    <EFormItem label="爱好" name="hobby">
      <a-select
        v-model:value="formState.hobby"
        mode="multiple"
        :options="hobbyOptions"
      />
    </EFormItem>
    <EFormItem label="专业" name="specialty">
      <a-transfer
        v-model:target-keys="formState.specialty"
        :data-source="mockData"
        :titles="['Source', 'Target']"
        :render="item => item.title"
      />
    </EFormItem>
  </EForm>
</template>

<script setup>
import { reactive, ref } from "vue";
import dayjs from "dayjs";

const checked = ref(false);

const dateFormat = "YYYY/MM/DD";
const formState = reactive({
  name: "eric ui",
  sex: 1,
  desc: "一段描述",
  rangePicker: [
    dayjs("2015/01/01", dateFormat),
    dayjs("2015/01/25", dateFormat),
  ],
  hobby: [0, 1, 2, 3],
  specialty: [1, 2, 3],
});

const sexOptions = [
  { value: 0, label: "女" },
  { value: 1, label: "男" },
];

const hobbyOptions = [
  { value: 0, label: "唱" },
  { value: 1, label: "跳" },
  { value: 2, label: "rap" },
  { value: 3, label: "篮球" },
];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i,
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}
</script>
