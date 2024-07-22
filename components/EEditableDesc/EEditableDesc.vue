<template>
  <div class="j-edit-desc-descWrapper">
    <a-row :gutter="[48, 16]">
      <a-col
        v-for="(item, index) in descData"
        :key="index.toString()"
        :span="24 / col"
      >
        <div style="display: flex; width: 100%">
          <a-tooltip>
            <template #title>{{ item.label }}</template>
            <span class="j-edit-desc-label" :title="item.label">
              {{ item.label }}
            </span>
          </a-tooltip>
          <span style="margin-right: 16px">：</span>
          <a-typography-paragraph
            v-model:content="item.value"
            :editable="item.editable ? editableOptions : false"
            class="j-edit-desc-paragraph"
            :ellipsis="getEllipsisOptions(item)"
          />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "EEditableDesc",
};
</script>
<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  col: {
    type: Number,
    default: 3,
  },
  editable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:value"]);

const descData = ref(props.value);

const editableOptions = computed(() => {
  if(!props.editable) {
    return false;
  }
  return {
    autoSize: { maxRows: 1 },
    onChange: () => {
      emit("update:value", descData.value);
    },
  };
});

const getEllipsisOptions = row => {
  return {
    rows: 1,
    expandable: true,
    tooltip: row.value,
  };
};
</script>
