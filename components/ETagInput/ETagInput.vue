<template>
  <span>
    <template v-for="tag in tags" :key="tag">
      <a-tag
        class="j-custom-tag"
        :closable="!readonly"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </a-tag>
    </template>
    <a-input
      v-if="inputVisible"
      ref="inputRef"
      v-model:value="inputValue"
      :maxlength="inputMaxlength"
      type="text"
      size="small"
      :style="{ width: '120px' }"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag
      v-else-if="max > 0 && tags.length < max && !readonly"
      style="background: #fff; border-style: dashed"
      @click="showInput"
    >
      <plus-outlined />
      {{ text }}
    </a-tag>
  </span>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, nextTick, watch } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import _ from "lodash";
import { Form } from "ant-design-vue";

export default defineComponent({
  name: "ETagInput",
  components: {
    PlusOutlined,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    max: {
      type: Number,
      default: 0,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    inputMaxlength: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: "增加新项",
    },
  },
  setup(props, { emit }) {
    const inputRef = ref();
    const formItemContext = Form.useInjectFormItemContext();

    const state = reactive({
      tags: _.cloneDeep(props.value),
      inputVisible: false,
      inputValue: "",
    });

    watch(
      () => props.value,
      newVal => {
        state.tags = newVal;
      },
      { deep: true }
    );

    const handleClose = removedTag => {
      const tags = state.tags.filter(tag => tag !== removedTag);
      state.tags = tags;
      emit("change", _.cloneDeep(state.tags));
      emit("update:value", _.cloneDeep(state.tags));
      formItemContext.onFieldChange();
    };
    const showInput = () => {
      state.inputVisible = true;
      nextTick(() => {
        inputRef.value.focus();
      });
    };
    const handleInputConfirm = () => {
      const inputValue = state.inputValue;
      let tags = state.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      Object.assign(state, {
        tags,
        inputVisible: false,
        inputValue: "",
      });
      emit("change", _.cloneDeep(state.tags));
      emit("update:value", _.cloneDeep(state.tags));
      formItemContext.onFieldChange();
    };

    return {
      ...toRefs(state),
      handleClose,
      showInput,
      handleInputConfirm,
      inputRef,
    };
  },
});
</script>
