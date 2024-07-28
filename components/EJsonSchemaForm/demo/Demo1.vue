<template>
  <div>
    <div style="width: 100%">
      <a-space style="display: flex; flex-wrap: wrap">
        <a-button @click="handleChangeSchema('object')">对象示例</a-button>
        <a-button @click="handleChangeSchema('array')">数组示例</a-button>
        <a-button @click="handleChangeSchema('complex')">
          复杂嵌套及属性验证综合示例
        </a-button>
        <a-button @click="handleChangeSchema('string')">文本示例</a-button>
        <a-button @click="handleChangeSchema('number')">数值示例</a-button>
        <a-button @click="handleChangeSchema('enum')">枚举示例</a-button>
        <a-button @click="handleChangeSchema('boolean')">布尔示例</a-button>
        <a-button @click="handleClear">清空示例</a-button>
      </a-space>
    </div>
    <a-divider />
    <div>
      <EJsonSchemaForm
        v-if="schemaStatus"
        :value="formState.value"
        :schema="jsonSchema"
        :error-messages="errorMessages"
        :get-ui-schema="getUiSchema"
        @update:value="value => handleUpdate(value)"
      />
      <a-button @click="handleValidate">验证</a-button>
    </div>
    <a-divider />
    <a-textarea v-model:value="jsonString" style="height: 200px"></a-textarea>
    <section>当前表单值</section>
    <pre style="border: 1px solid">
      {{ formState.value }}
    </pre>
  </div>
</template>

<script>
import { ref, reactive, nextTick } from "vue";
import Ajv from "ajv";
import { getSchemaMap } from "./uiSchema.js";
import zh from "ajv-i18n/localize/zh";

// ajv使用说明
// https://xie.infoq.cn/article/bbb1b8b4a2ca521a74b552ced
const ajv = new Ajv({ allErrors: true });

const localize = {
  zh,
};

const schema = {
  object: {
    type: "object",
    title: "root",
    properties: {
      sliding_window: {
        title: "滑动窗口均衡",
        type: "object",
        required: ["winlen"],
        properties: {
          k: { title: "最大同类数", type: "integer", minimum: 0 },
          winlen: { title: "窗口长度", type: "integer", minimum: 0 },
          winlen2: { title: "窗口长度2", type: "string" },
        },
      },
    },
  },
  array: {
    title: "页面布局",
    type: "array",
    items: { type: "string" },
    maxItems: 6,
    minItems: 1,
  },
  string: { title: "栏目ID", type: "string" },
  number: { title: "金额", type: "number" },
  enum: {
    title: "用户一级分类兴趣特征",
    enum: ["big_type_pref_norm_${period}", "big_type_pref_norm"],
    type: "string",
    description: "存在${period}后缀，代表使用分手特征",
  },
  boolean: { title: "是否排序", enum: [true, false], type: "boolean" },
  complex: {
    type: "object",
    title: "default",
    required: ["fields"],
    properties: {
      size: { title: "召回数量", type: "integer", default: 40, minimum: 0 },
      index: { title: "召回索引", type: "string" },
      layer: {
        title: "层",
        type: "number",
        minimum: 0,
        description: "filter_layer最大值",
      },
      fields: {
        title: "rank_feature字段组合",
        type: "array",
        items: {
          type: "object",
          required: ["item_feature_field", "user_feature_field"],
          properties: {
            item_feature_field: {
              enum: ["category", "rs_tags", "rs_country"],
              type: "string",
            },
            user_feature_field: {
              enum: [
                "middle_type_pref_${typeid}_norm",
                "small_type_pref_${typeid}_norm",
                "country_pref_${typeid}_norm",
              ],
              type: "string",
            },
          },
        },
      },
      rs_boost: {
        title: "提权rank_feature",
        type: "array",
        items: {
          type: "object",
          required: ["field", "boost"],
          properties: {
            boost: { title: "提权权重", type: "number", minimum: 0 },
            field: { title: "提权字段", type: "string" },
          },
        },
      },
      big_feature: {
        title: "用户一级分类兴趣特征",
        enum: ["big_type_pref_norm_${period}", "big_type_pref_norm"],
        type: "string",
        description: "存在${period}后缀，代表使用分手特征",
      },
      compare_rank: {
        title: "综合排序",
        type: "number",
        minimum: 0,
        description: "compare_rank <= column当前的index * CompareRank",
      },
      query_string: { title: "召回查询条件", type: "string" },
      explore_epslion: {
        title: "随机特征因子",
        type: "number",
        default: 0,
        minimum: 0,
      },
    },
  },
};

export default {
  name: "IndexPage",
  setup() {
    const jsonString = ref(JSON.stringify(schema.object, null, "  "));
    const jsonSchema = ref(schema.object);
    const restoreValue = ref("");
    const schemaStatus = ref(true);
    const formState = reactive({
      value: { sliding_window: { k: 22, winlen: 111222 } },
    });

    const errorMessages = ref([]);

    const handleChangeSchema = type => {
      schemaStatus.value = false;
      formState.value = undefined;
      jsonSchema.value = schema[type];
      jsonString.value = JSON.stringify(schema[type], null, "  ");
      nextTick(() => {
        schemaStatus.value = true;
      });
    };

    const handleGen = () => {
      formState.value = undefined;
      jsonSchema.value = jsonString.value;
    };

    const handleClear = () => {
      jsonString.value = "";
      formState.value = undefined;
    };

    const handleRestore = () => {
      formState.value = JSON.parse(restoreValue.value);
    };

    const handleUpdate = value => {
      console.log(value);
      formState.value = value;
    };

    const handleValidate = () => {
      const validate = ajv.compile(jsonSchema.value);
      const valid = validate(formState.value);
      if (!valid) {
        localize.zh(validate.errors);
        errorMessages.value = validate.errors;
      } else {
        errorMessages.value = [];
      }
    };

    return {
      getUiSchema: getSchemaMap,
      errorMessages,
      schemaStatus,
      formState,
      restoreValue,
      jsonString,
      jsonSchema,
      handleChangeSchema,
      handleGen,
      handleClear,
      handleRestore,
      handleUpdate,
      handleValidate,
    };
  },
};
</script>

