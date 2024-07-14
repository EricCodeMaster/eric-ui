<template>
  <section>
    <a-space>
      <a-button @click="handleAdd">新增选项</a-button>
      <a-button @click="handleRemove">删除最后一项</a-button>
      只读
      <a-switch v-model:checked="readonly"></a-switch>
    </a-space>

    <a-row style="margin: 40px 0 12px 0">
      <a-space>
        <ESelect
          preLabel="当前"
          :readonly="readonly"
          :options="options1"
          v-model:value="value1"
        ></ESelect>
        <div>选择器1：{{ value1 }}</div>
      </a-space>
    </a-row>
    <a-row style="margin-bottom: 12px">
      <a-space>
        <ESelect
          preLabel="当前"
          :readonly="readonly"
          :options="options2"
          v-model:value="value2"
          showAll
          :colon="false"
          defaultTitle="不选择"
        ></ESelect>
        <div>选择器2：{{ value2 }}</div>
      </a-space>
    </a-row>
    <a-row style="margin-bottom: 12px">
      <a-space>
        <ESelect
          preLabel="当前"
          :readonly="readonly"
          :options="options3"
          v-model:value="value3"
          showAll
          :field-names="{ label: 'dictName', value: 'dictValue' }"
        ></ESelect>
        <div>选择器3：{{ value3 }}</div>
      </a-space>
    </a-row>
    <a-row style="margin-bottom: 12px">
      <a-space>
        <ESelect
          preLabel="当前"
          :readonly="readonly"
          v-model:value="value4"
          showAll
          @change="handleChange"
        >
          <a-select-option
            v-for="item in 30"
            :value="item"
            :label="item"
            :key="item"
            >{{ item }}</a-select-option
          >
        </ESelect>
        <div>select-option写法: {{ value4 }}</div>
      </a-space>
    </a-row>
  </section>
</template>

<script setup>
import { ref } from "vue";

const readonly = ref(false);
const value1 = ref(null);
const value2 = ref(null);
const value3 = ref(null);
const value4 = ref(null);

const options1 = ref([]);
const options2 = Array.from({ length: 20 }).map((_, index) => ({
  label: `年龄${index}`,
  value: index,
}));
const options3 = Array.from({ length: 20 }).map((_, index) => ({
  dictName: `姓名${index}`,
  dictValue: index,
}));

const handleAdd = () => {
  options1.value.push({
    label: `选项 ${options1.value.length + 1}`,
    value: String(options1.value.length + 1),
  });
};

const handleRemove = () => {
  options1.value.splice(options1.value.length - 1, 1);
};

const handleChange = (value, option) => {
  console.log("value, option: ", value, option);
};
</script>
