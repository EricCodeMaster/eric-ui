<template>
  <div :title="selectTitle">
    <a-select
      v-model:value="selectValue"
      :style="{ pointerEvents: readonly ? 'none' : '' }"
      v-bind="{ ...defaultAttrs, ...$attrs }"
      :options="options ? selectOptions : null"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </a-select>
  </div>
</template>
<script setup>
import { computed, useAttrs, useSlots } from "vue";
import { get } from "lodash";

const props = defineProps({
  value: {
    type: [Array, String, Number],
  },
  options: {
    type: Array,
  },
  preLabel: {
    // 前置标签
    type: String,
    default: "",
  },
  defaultTitle: {
    type: String,
    default: "全部",
  },
  defaultValue: {
    type: [String, Number],
    default: "",
  },
  filterOption: {
    type: Function,
  },
  readonly: {
    // 是否只读
    type: Boolean,
    default: false,
  },
  colon: {
    // 是否显示冒号
    type: Boolean,
    default: true,
  },
  pinyin: {
    type: Boolean,
    default: false,
  },
  showAll: {
    type: Boolean,
    default: false,
  },
});

const SHOW_SEARCH_LENGTH = 20;

const emit = defineEmits(["update:value"]);

const attrs = useAttrs();
const slots = useSlots();

const showSearch = computed(() => {
  if (props.options) {
    return props.options?.length > SHOW_SEARCH_LENGTH;
  }

  const slot = slots.default;
  const defaultSlotData = slot ? slot() : [];
  return defaultSlotData[0]?.children?.length > SHOW_SEARCH_LENGTH;
});

// eslint-disable-next-line
let pinyin;
const initPinyin = () => {
  try {
    if (props.pinyin) {
      // eslint-disable-next-line
      pinyin = require("js-pinyin");
    }
  } catch (error) {
    console.warn("js-pinyin模块未安装, 请安装后使用(npm i js-pinyin)");
  }
};
initPinyin();

const selectValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("update:value", value);
  },
});

const labelField = get(attrs, ["field-names", "label"], "label");
const valueField = get(attrs, ["field-names", "value"], "value");

const selectTitle = computed(() => {
  const target =
    selectOptions.value.find(item => item.value === selectValue.value) || {};
  const targetTitle =
    target.title || target[labelField] || get(target, "value", "");
  return targetTitle;
});

const defaultAttrs = computed(() => {
  return {
    style: "width: 200px",
    allowClear: true,
    optionLabelProp: "title",
    placeholder: `请选择${props.preLabel}`,
    showSearch: showSearch.value,
    filterOption: (input, option) => {
      if (props.filterOption) {
        return props.filterOption(input, option);
      }

      if (props.options) {
        const selectLabel = get(option, [labelField], "");
        return handleFilterOptions(input, selectLabel);
      } else {
        const selectLabel = get(option, "label", "");
        return handleFilterOptions(input, selectLabel);
      }
    },
  };
});

function handleFilterOptions(input, label) {
  const strLabel = String(label).toLowerCase();
  const formatInput = input.toLowerCase().trim();

  const searchOfPinyin = pinyin
    ? pinyin?.getFullChars(strLabel).includes(formatInput)
    : false;
  const searchOfLabel = strLabel.includes(formatInput);

  return searchOfPinyin || searchOfLabel;
}

const formatPreLabel = computed(() => {
  return `${props.preLabel}${props.colon && props.preLabel ? "：" : ""}`;
});

const defaultOption = {
  [labelField]: props.defaultTitle,
  [valueField]: props.defaultValue,
  title: `${formatPreLabel.value}${props.defaultTitle}`,
};

const selectOptions = computed(() => {
  const options = get(props, "options", []).map(itm => {
    const selectTitle = itm.title || itm[labelField] || itm.value;
    return {
      ...itm,
      title: `${formatPreLabel.value}${selectTitle}`,
    };
  });

  if (props.showAll) {
    options.unshift(defaultOption);
  }

  return options;
});
</script>

<script>
export default {
  name: "ESelect",
};
</script>
