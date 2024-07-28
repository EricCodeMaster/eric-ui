<template>
  <div
    style="margin-bottom: 12px"
    :class="{ [prefixCls + '-form-item-has-error']: !!errors }"
  >
    <a-space
      :class="{ [prefixCls + '-form-item-has-error']: !!errors }"
      style="display: flex; margin: 12px"
    >
      <div :style="{ marginLeft: `${20 * deep}px` }">
        <div
          v-if="isItem && !['object', 'array'].includes(pickSchema.type)"
          :style="{ marginLeft: `${20 * deep}px`, fontWeight: 600 }"
        >
          {{ parent.itemIndex }}.
        </div>
        <a-tooltip v-else-if="!isItem">
          <template v-if="get(pickSchema, 'description')" #title>
            {{ pickSchema.description }}
          </template>
          <span>
            <a-select
              :options="keyOptions"
              :disabled="disabled"
              :value="pickKey"
              style="width: 200px"
              @change="changeKey"
            ></a-select>
            <info-circle-outlined
              v-if="get(pickSchema, 'description')"
              style="margin-left: 4px"
            />
          </span>
        </a-tooltip>
      </div>
      <a-space>
        <component
          :is="uiSchema.component"
          v-if="!isObject && !isArray"
          v-model:value="pickRawValue"
          v-bind="uiSchema.props"
          style="width: 200px"
        />
        <a-tooltip v-if="!root && !disabled && !isItem" placement="right">
          <template #title>移除此参数</template>
          <a-button type="link" @click="removeNode">
            <DeleteOutlined />
          </a-button>
        </a-tooltip>
        <a-tooltip
          v-if="
            isItem &&
            isShowRemoveItems &&
            !disabled &&
            !['object', 'array'].includes(pickSchema.type)
          "
          placement="right"
        >
          <template #title>移除此项</template>
          <a-button type="link" @click="removeItem">
            <DeleteOutlined />
          </a-button>
        </a-tooltip>
      </a-space>
      <span
        v-if="errors"
        :style="{ display: 'inline-block' }"
        class="e-jsf__error-color"
        >{{ errors }}</span
      >
    </a-space>
    <div
      :style="{ position: 'relative' }"
      :class="{ 'e-jsf__array-before-line': isItem }"
    >
      <div
        v-if="
          isItem &&
          isShowRemoveItems &&
          ['object', 'array'].includes(get(pickSchema, 'type'))
        "
        class="e-jsf__array-button"
        :style="{ left: `${20 * deep - 24}px` }"
      >
        <a-tooltip placement="left">
          <template #title>移除本组参数</template>
          <a-button type="link" @click="removeItem">
            <DeleteOutlined />
          </a-button>
        </a-tooltip>
      </div>
      <template v-if="isObject && pickRawValue && pickSchema.properties">
        <EJsonSchemaForm
          v-for="(item, key, index) in pickRawValue"
          :key="index"
          :value="rawValue"
          :path="getObjectPath(key)"
          :schema="{ [key]: pickSchema.properties[key] }"
          :is-read-only="isReadOnly"
          :parent="{ ...pickSchema, isItem }"
          :deep="deep + 1"
          :root="false"
          :get-ui-schema="getUiSchema"
          :error-messages="errorMessages"
          @update:value="newValue => $emit('update:value', newValue)"
        ></EJsonSchemaForm>
      </template>
      <template
        v-if="
          isArray && pickRawValue && pickRawValue.length && pickSchema.items
        "
      >
        <EJsonSchemaForm
          v-for="(item, index) in pickRawValue"
          :key="index"
          :value="rawValue"
          :path="path ? [path, index].join('.') : index.toString()"
          :schema="{ items: pickSchema.items }"
          :is-read-only="isReadOnly"
          :get-ui-schema="getUiSchema"
          :parent="{
            ...pickSchema,
            isItem,
            parentRequired: get(parent, 'required', []).includes(pickKey),
            itemLength: (pickRawValue || []).length,
            itemIndex: index + 1,
          }"
          :deep="deep"
          is-item
          :root="false"
          :error-messages="errorMessages"
          @update:value="newValue => $emit('update:value', newValue)"
        />
      </template>
      <a-tooltip v-if="isObject && isShowAddBtn" placement="right">
        <template #title>添加参数项</template>
        <a-button
          type="dashed"
          :style="{ marginLeft: `${20 * deep + 32}px` }"
          size="small"
          @click="addChild"
        >
          <template #icon><plus-outlined /></template>
          添加参数项
        </a-button>
      </a-tooltip>
      <a-tooltip v-if="isArray && isShowAddItemBtn" placement="right">
        <template #title>添加参数组</template>
        <a-button
          type="dashed"
          :style="{ margin: '12px 0', marginLeft: `${20 * deep + 32}px` }"
          size="small"
          @click="addArrayChild"
        >
          <template #icon><plus-outlined /></template>
          添加参数组
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>
<script>
import {
  CaretDownOutlined,
  DeleteOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons-vue";
import {
  get,
  set,
  keys,
  unset,
  last,
  initial,
  difference,
  times,
  cloneDeep,
  trimStart,
  isEmpty,
} from "lodash-es";

export default {
  name: "EJsonSchemaForm",
  components: {
    CaretDownOutlined,
    PlusOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
  },
  props: {
    value: {}, // eslint-disable-line
    path: {
      type: String,
      default: "",
    },
    schema: {
      // 当前表单schema节点
      type: Object,
      default: () => ({}),
    },
    getUiSchema: {
      type: Function,
      default: () => ({}),
    },
    isItem: {
      //是否数组元素
      type: Boolean,
      default: false,
    },
    deep: {
      // 节点深度，根节点deep=0
      type: Number,
      default: 0,
    },
    root: {
      //是否root节点
      type: Boolean,
      default: true,
    },
    parent: {
      //父节点
      type: Object,
    },
    isReadOnly: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
  },
  inject: ["configProvider"],
  computed: {
    prefixCls() {
      return this.configProvider.prefixCls;
    },
    rawValue() {
      return this.value;
    },
    errors() {
      if (!isEmpty(this.errorMessages)) {
        const error = this.errorMessages.find(item => {
          return (
            trimStart(item.instancePath, "/").replaceAll("/", ".") === this.path
          );
        })?.message;
        return error || "";
      }
      return "";
    },
    uiSchema() {
      return this.getUiSchema(this.pickSchema);
    },
    parentPath() {
      return initial(this.path.split(".")).join(".");
    },
    requiredOptions() {
      // required只存在于对象类型
      if (this.parent?.required) {
        return (
          this.parent?.required.map(item => {
            const title = get(this, `parent.properties.${item}.title`, "");
            return {
              title,
              label: title,
              value: item,
            };
          }) || []
        );
      }
      return [];
    },
    disabled() {
      // 对象类型key不能重复，不允许用户选择已存在的
      return !!this.requiredOptions.find(item => item.value === this.pickKey);
    },
    keyOptions() {
      if (this.root) {
        return [
          {
            title: this.pickSchema.title || this.pickKey,
            label: this.pickSchema.title || this.pickKey,
            value: this.pickKey,
          },
        ];
      }
      // required只存在于对象类型
      // 非必须key，只能存在一个，关联添加按钮 TODO key个数与schema个数相等时，不能再添加
      return (
        keys(this.parent?.properties || {})
          .filter(item => {
            // 必选key，返回全部数据，以便回显
            if (this.disabled) {
              return true;
            }
            return !(this.parent?.required || []).includes(item);
          })
          .map(item => {
            const title = get(this, `parent.properties.${item}.title`, item);
            const existedKeys = keys(get(this.rawValue, this.parentPath, {}));
            return {
              title,
              label: title,
              value: item,
              disabled: existedKeys.includes(item),
            };
          }) || []
      );
    },
    isShowAddBtn() {
      // 对象类型的key已全部在value中时，则不显示添加按钮
      if (this.isObject) {
        return difference(
          keys(this.pickSchema.properties),
          keys(this.pickRawValue)
        ).length;
      }
      return true;
    },
    isShowAddItemBtn() {
      const maxItems = get(this, "pickSchema.maxItems", 0);
      if (this.isArray && maxItems && this.pickRawValue) {
        return this.pickRawValue.length < maxItems;
      }
      return true;
    },
    isShowRemoveItems() {
      const minItems = get(this, "parent.minItems", 0);
      if (this.isItem && minItems) {
        return get(this, `parent.itemLength`, 0) > minItems;
      }
      return true;
    },
    pickRawValue: {
      get() {
        // 回填默认值，如果存在的话
        return get(this.rawValue, this.path || this.pickKey, this.rawValue);
      },
      set(value) {
        if (this.root) {
          this.$emit("update:value", value);
        } else {
          set(this.rawValue, this.path, value);
        }
      },
    },
    pickSchema() {
      let schema = this.schema;
      if (this.root) {
        return schema;
      }
      return Object.values(this.schema)[0];
    },
    pickKey() {
      let schema = this.schema;
      return Object.keys(schema || {})[0] || "";
    },
    isObject() {
      return this.pickSchema?.type === "object";
    },
    isArray() {
      return this.pickSchema?.type === "array";
    },
  },
  mounted() {
    if (!this.isReadOnly && this.root) {
      this.setRequiredValue2Object();
    }
  },
  methods: {
    get,
    getObjectPath(key) {
      if (this.root) {
        return `${key}`;
      }
      return [this.path, key].join(".");
    },
    setRequiredValue2Object() {
      // 对象类型，默认添加required字段
      if (this.isObject) {
        let defaultValue =
          cloneDeep(get(this.rawValue || {}, this.path, {})) || {};
        // 对象根节点默认填充必填值，与系统端schema实现对齐
        let keysArray = this.pickSchema.required || [];
        if (keysArray.length) {
          keysArray.forEach(item => {
            // 增加默认值
            const value = this.getDefaultValue(
              this.pickSchema.properties,
              item
            );
            defaultValue[item] = value;
          });
          if (this.root) {
            let newValue = this.rawValue ? cloneDeep(this.rawValue) : {};
            this.$emit("update:value", { ...defaultValue, ...newValue });
          } else {
            let newValue = this.rawValue ? cloneDeep(this.rawValue) : {};
            set(newValue, `${this.path || this.pickKey}`, defaultValue);
            this.$emit("update:value", newValue);
          }
        }
      }
    },
    setDefaultValue2Array() {
      // 数组默认根据MinxItems添加N组数据
      if (this.isArray) {
        times(get(this.pickSchema, "minItems", 1), this.addArrayChild);
      }
    },
    getDefaultValue(properties, path) {
      const defaultValue = cloneDeep(get(properties, `${path}.default`, null));
      const enumDefaultValue = cloneDeep(
        get(properties, `${path}.enum.0`, null)
      );
      const arrayDefaultValue = cloneDeep(
        get(properties, `${path}.type`) === "array" ? [] : null
      );
      const objectDefaultValue = cloneDeep(
        get(properties, `${path}.type`) === "object" ? {} : null
      );
      return (
        objectDefaultValue ||
        arrayDefaultValue ||
        enumDefaultValue ||
        defaultValue
      );
    },
    addChild() {
      const defaultKey = difference(
        keys(this.pickSchema.properties),
        keys(this.pickRawValue)
      );
      if (defaultKey.length) {
        const newValue = this.rawValue ? cloneDeep(this.rawValue) : {};
        const objectPath = this.path
          ? `${this.path}.${defaultKey[0]}`
          : defaultKey[0];
        set(
          newValue,
          objectPath,
          this.getDefaultValue(this.pickSchema.properties, defaultKey[0])
        );
        this.$emit("update:value", newValue);
        this.$nextTick(() => {
          this.setDefaultValue2Array();
          this.setRequiredValue2Object();
        });
      }
    },
    changeKey(value) {
      const targetObj = this.parentPath
        ? get(this.rawValue, `${this.parentPath}`, {})
        : this.rawValue;
      // 通过reduce解决对象key无序问题
      const newObj = keys(targetObj).reduce((total, cur) => {
        if (cur === this.pickKey) {
          total[value] = this.getDefaultValue(this.parent.properties, value);
        } else {
          total[cur] = targetObj[cur];
        }
        return total;
      }, {});
      if (this.parentPath) {
        set(this.rawValue, this.parentPath, newObj);
      } else {
        this.$emit("update:value", newObj);
      }
      this.$nextTick(() => {
        this.setDefaultValue2Array();
        this.setRequiredValue2Object();
      });
    },
    addArrayChild() {
      // 数组及对象默认值及初始结构待加强
      const uiSchema = get(this.pickSchema, "items", {});
      let defaultValue = uiSchema.default || null;
      if (uiSchema.type === "object") {
        defaultValue = {};
        if (uiSchema.required) {
          uiSchema.required.forEach(item => {
            // 增加默认值
            defaultValue[item] = this.getDefaultValue(
              uiSchema.properties,
              item
            );
          });
        }
      } else if (uiSchema.type === "array") {
        defaultValue = [];
      }
      if (this.root) {
        let newValue = this.rawValue || [];
        newValue.push(defaultValue);
        this.$emit("update:value", newValue);
      } else {
        const newValue = cloneDeep(get(this.rawValue, this.path, []));
        newValue.push(defaultValue);
        const rootValue = cloneDeep(this.rawValue);
        set(rootValue, this.path, newValue);
        this.$emit("update:value", rootValue);
      }
    },
    removeNode() {
      unset(this.rawValue, this.path);
    },
    removeItem() {
      const index = last(this.path.split("."));
      if (this.root) {
        const newValue = get(
          this.rawValue,
          this.parentPath,
          this.rawValue || []
        );
        newValue.splice(index, 1);
        this.$emit("update:value", newValue);
      } else {
        const newValue = cloneDeep(get(this.rawValue, this.parentPath));
        newValue.splice(index, 1);
        const rootValue = cloneDeep(this.rawValue);
        set(rootValue, this.parentPath, newValue);
        this.$emit("update:value", rootValue);
      }
    },
  },
};
</script>
