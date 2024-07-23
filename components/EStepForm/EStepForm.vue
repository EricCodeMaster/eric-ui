<template>
  <div class="e-step-form__container">
    <div :style="{ marginBottom: '40px', ...stepStyle }" v-if="!viewMode">
      <a-steps :current="current">
        <a-step
          v-for="item in steps"
          :key="item.title"
          :title="item.title"
          disabled
        />
      </a-steps>
    </div>
    <EForm ref="formRef" v-bind="$attrs" :readonly="viewMode">
      <slot name="divider" />
      <template v-if="viewMode">
        <div v-for="(slot, index) in childrenSlot" :key="slot.title || index">
          <slot name="divider" v-bind="{ title: slot.props?.title || index }">
            <div class="e-step-form__head">
              {{ slot.props?.title || index }}
            </div>
          </slot>
          <VNode :vnode="slot" />
        </div>
      </template>
      <VNode
        v-else-if="nodeData && !viewMode && reloadFlag"
        :vnode="nodeData"
      />
    </EForm>
    <a-row justify="center" :gutter="[24]" v-if="!viewMode">
      <Teleport :to="attachTo" :disabled="!attachTo">
        <slot name="footer">
          <component
            :is="affixConfig ? 'a-affix' : 'div'"
            :target="affixConfig?.target"
            :offset-bottom="affixConfig?.offsetBottom || 8"
            @change="
              fixed => {
                isFixed = fixed;
              }
            "
          >
            <a-space :class="footerWrapperClass" :style="footerWrapperStyle">
              <a-button @click="handleCancel">取消</a-button>
              <a-button v-if="current" @click="handlePrev">上一步</a-button>
              <a-button
                v-if="current < steps.length - 1"
                type="primary"
                @click="handleNext"
                :loading="isLoading"
              >
                下一步
              </a-button>
              <a-button
                v-if="current === steps.length - 1"
                type="primary"
                @click="handleSubmit"
              >
                {{ saveText }}
              </a-button>
              <slot name="extraButton" v-if="current === steps.length - 1" />
            </a-space>
          </component>
        </slot>
      </Teleport>
    </a-row>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from "vue";
import VNode from "../VNode.vue";
import _ from "lodash";

export default {
  name: "EStepForm",
  components: { VNode },
  inheritAttrs: false,
  props: {
    stepStyle: {
      type: Object,
      default: () => ({}),
    },
    attachTo: {
      type: [String, HTMLDivElement],
    },
    viewMode: {
      type: Boolean,
      default: false,
    },
    saveText: {
      type: String,
      default: "保存",
    },
    affixConfig: {
      type: Object,
    },
  },
  setup(props, { expose, slots, emit }) {
    const formRef = ref(null);
    const steps = ref([]);
    const current = ref(0);
    const reloadFlag = ref(true);
    const isFixed = ref(false);

    const nodeData = computed(() => {
      return _.get(slots?.default(), `0.children[${current.value}]`);
    });

    const childrenSlot = computed(() =>
      _.get(slots.default(), `[0].children`, [])
    );

    onMounted(() => {
      if (slots.default) {
        _.get(slots.default(), "0.children", []).forEach(vnode => {
          steps.value.push({ title: vnode.props?.title });
        });
      }
    });

    const handleChange = async currentIndex => {
      const valid = await formRef.value?.validate().catch(error => {
        console.log(error);
      });
      if (!valid) {
        return;
      }
      current.value = currentIndex;
      reloadFlag.value = false;
      nextTick(() => {
        reloadFlag.value = true;
      });
      return true;
    };

    const handleCancel = () => {
      emit("cancel");
    };

    const handlePrev = () => {
      const currentIndex = current.value ? current.value - 1 : 0;
      current.value = currentIndex;
      reloadFlag.value = false;
      nextTick(() => {
        reloadFlag.value = true;
      });
    };

    const isLoading = ref(false);

    const handleNext = async () => {
      isLoading.value = true;
      // props自动转化camelCase为kebab-case仅适用于template模板，setup中需要手动转化
      const nextFunc = _.get(
        nodeData,
        "value.props.beforeNext",
        _.get(nodeData, "value.props.before-next", () => true)
      );
      if (await nextFunc()) {
        isLoading.value = false;
        return handleChange(
          current.value < steps.value.length
            ? current.value + 1
            : steps.value.length
        );
      }
      isLoading.value = false;
    };

    const handleSubmit = async () => {
      const valid = await formRef.value.validate().catch(err => {
        console.log(err);
      });
      if (valid) {
        emit("finish");
        return true;
      }
    };

    expose({
      handleCancel,
      handlePrev,
      handleNext,
      handleSubmit,
      clearValidate: computed(() => formRef.value?.clearValidate),
      resetFields: computed(() => formRef.value?.resetFields),
      scrollToField: computed(() => formRef.value?.scrollToField),
      validate: computed(() => formRef.value?.validate),
      validateFields: computed(() => formRef.value?.validateFields),
    });

    const footerWrapperClass = computed(() => {
      if (isFixed.value) {
        return (
          props.affixConfig?.class ||
          "e-step-form__footer-wrapper e-step-form__footer-border"
        );
      }
      return "e-step-form__footer-wrapper";
    });

    const footerWrapperStyle = computed(() => {
      if (isFixed.value) {
        return props.affixConfig?.style || {};
      }
      return {};
    });

    return {
      footerWrapperClass,
      footerWrapperStyle,
      isFixed,
      isLoading,
      childrenSlot,
      formRef,
      steps,
      nodeData,
      current,
      reloadFlag,
      handleChange,
      handleCancel,
      handlePrev,
      handleNext,
      handleSubmit,
    };
  },
};
</script>
