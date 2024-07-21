<template>
  <a-form
    ref="formRef"
    :model="model"
    v-bind="{ labelCol: { span: 4 }, wrapperCol: { span: 16 }, ...$attrs }"
    @validate="handleValidate"
  >
    <VNode
      v-for="(item, index) in $slots.default()"
      :key="index"
      :vnode="item"
    />
  </a-form>
</template>

<script>
export default {
  name: "EForm",
};
</script>
<script setup>
import { computed, provide, ref } from "vue";
import VNode from "../VNode.vue";
import _ from "lodash";
import useFormCache from "./useFormCache";

const props = defineProps({
  toggle: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  checkSensitiveWords: {
    type: Function,
    default: () => {},
  },
  onValidate: {
    type: Function,
    default: () => {},
  },
  model: {
    type: Object,
    default: () => ({}),
  },
  cacheOptions: {
    type: Object,
    default: () => ({}),
  },
});

const formRef = ref(null);

const validateData = ref({});

function clearValidate() {
  formRef.value?.clearValidate();
  validateData.value = {};
}

const handleValidate = (name, status, errorMsgs) => {
  const filed = _.isArray(name) ? name.join(".") : name;
  if (!status) {
    validateData.value[filed] = errorMsgs;
  } else {
    validateData.value = _.omit(validateData.value, [filed]);
  }
  props?.onValidate && props?.onValidate(name, status, errorMsgs);
};

const emit = defineEmits(["update:model"]);

const readOnly = computed(() => props.readonly);
const disabled = computed(() => props.disabled);
const canToggle = computed(() => props.toggle);
const formState = computed({
  get() {
    return props.model;
  },
  set(val) {
    console.log(val, 'val-------------------')
    emit("update:model", val);
  },
});

provide("disabledKey", disabled);
provide("readOnlyKey", readOnly);
provide("canToggleKey", canToggle);
provide("checkSensitiveWords", props.checkSensitiveWords);
provide("validateMsgList", validateData);
provide("formStateKey", formState);

const formCache = useFormCache(formState, props.cacheOptions);

defineExpose({
  clearValidate: clearValidate,
  resetFields: computed(() => formRef.value?.resetFields),
  scrollToField: computed(() => formRef.value?.scrollToField),
  validate: computed(() => formRef.value?.validate),
  validateFields: computed(() => formRef.value?.validateFields),
  formCache,
});
</script>
