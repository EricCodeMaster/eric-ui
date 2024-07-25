<template>
  <ul
    :class="{
      'e-cc__group': true,
      'e-cc__group-multiple': multiple,
      'e-cc__group-option-readonly': readonly,
    }"
    v-bind="$attrs"
  >
    <li
      v-for="item in options"
      :key="item.value"
      :class="{
        'e-cc__group-option': true,
        'e-cc__group-option-active': values.includes(item.value),
        'e-cc__group-option-disabled': item.disabled,
      }"
      @click="handleClick(item)"
    >
      <a-tooltip v-bind="item.tooltipConfig || {}">
        <template #title v-if="item.tooltip">
          <span>{{ item.tooltip }}</span>
        </template>
        <div>
          <div
            v-if="item.icon || item.slot"
            :class="{
              'e-cc__group-cover': true,
              'e-cc__is-large-cover': !!item.label && !!item.description,
            }"
          >
            <component v-if="item.icon" :is="item.icon" />
            <slot v-else-if="item.slot" :name="item.slot"></slot>
          </div>
          <div class="e-cc__group-info">
            <div
              v-if="item.label"
              class="e-cc__group-title"
              :style="{ marginLeft: item.icon || item.slot ? '8px' : '0' }"
            >
              <slot name="title" v-bind="item">{{ item.label }}</slot>
            </div>
            <div
              v-if="item.description"
              class="e-cc__group-desc"
              :style="{ marginLeft: item.icon || item.slot ? '8px' : '0' }"
            >
              <slot name="description">{{ item.description }}</slot>
            </div>
          </div>
        </div>
      </a-tooltip>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";

export default {
  name: "ECheckCard",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: "default",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Array],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const values = computed(() => {
      if (Array.isArray(props.value)) {
        return props.value;
      }
      return [props.value];
    });

    const handleClick = item => {
      if (item.disabled) {
        return;
      }
      if (props.multiple) {
        if (props.value?.find(data => data === item.value)) {
          emit(
            "change",
            props.value.filter(data => data !== item.value)
          );
          emit(
            "update:value",
            props.value.filter(data => data !== item.value)
          );
        } else {
          emit("change", [...props.value, item.value]);
          emit("update:value", [...props.value, item.value]);
        }
      } else {
        emit("change", item.value);
        emit("update:value", item.value);
      }
    };

    return { values, handleClick };
  },
};
</script>
