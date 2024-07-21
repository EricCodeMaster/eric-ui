<script lang="jsx">
import { defineComponent, ref, onMounted, computed, inject } from "vue";
import _ from "lodash";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { useFormatElement } from "./useFormatElement";
import VNode from "../VNode.vue";
import { Popover, Tooltip } from "ant-design-vue";

const COMP_TYPE = {
  INPUT: "AInput",
  INPUT_NUMBER: "AInputNumber",
  TEXTAREA: "ATextarea",
  SELECT: "ASelect",
  DATE_PICKER: "ADatePicker",
  RANGE_PICKER: "ARangePicker",
  TIME_PICKER: "ATimePicker",
  TIME_RANGE_PICKER: "ATimeRangePicker",
  TRANSFER: "ATransfer",
  IMAGE: "JImage",
  TREE_SELECT: "ATreeSelect",
  // todo： 二次封装的组件？插槽方式解决 #readonly
};

const NO_DATA = "--";

export default defineComponent({
  name: "EFormItem",
  component: {
    Popover,
    Tooltip,
  },
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
    extra: {
      type: String,
      default: "",
    },
    help: {
      type: [String, Object],
      default: "",
    },
    extraType: {
      type: String,
      default: "warning",
    },
    tip: {
      type: [String, Object],
      default: "",
    },
    attrName: {
      type: String,
      default: "",
    },
  },
  setup(props, { attrs, slots }) {
    const defaultTipConfig = {
      tipIcon: QuestionCircleOutlined,
      tipPlacement: "topRight",
      // tipTitle: "", // 必须传入字符串或插槽
      tipContent: "",
      tipType: "tooltip",
      location: "prefix",
      iconStyle: {
        fontSize: "14px",
        margin: "4px",
        color: "rgb(248, 156, 36)",
      },
    };

    const tip = computed(() => {
      if (typeof props.tip === "string") {
        return _.merge(_.cloneDeep(defaultTipConfig), { tipTitle: props.tip });
      } else {
        return _.merge(_.cloneDeep(defaultTipConfig), props.tip);
      }
    });

    const isHasTip = computed(() => props.tip || !_.isEmpty(slots.tipTitle));

    const showPreTip = computed(() => {
      return isHasTip.value && tip.value.location === "prefix";
    });
    const showSufTip = computed(() => {
      return isHasTip.value && tip.value.location === "suffix";
    });

    const defaultTipComp = {
      ["tooltip"]: Tooltip,
      ["popover"]: Popover,
    };
    const tipComponent = defaultTipComp[tip.value.tipType]
      ? defaultTipComp[tip.value.tipType]
      : defaultTipComp["tooltip"];

    const formRules = computed(() => {
      // 如果formItem上没有任何校验规则，则返回null,防止form上的rules失效
      if (_.isEmpty(props.rules) && !props.required) {
        return null;
      }

      const selfRequire = props.rules.find(item => item.required) || {};

      const requiredMsg = {
        required: true,
        message: `${props.label}是必填项`,
      };

      if (props.required && !selfRequire?.required) {
        return [requiredMsg, ...props.rules];
      }

      return [...props.rules];
    });

    const getPlaceholder = (type, label) => {
      const placeholder = {
        [COMP_TYPE.INPUT]: `请输入${label}`,
        [COMP_TYPE.INPUT_NUMBER]: `请输入${label}`,
        [COMP_TYPE.TEXTAREA]: `请输入${label}`,
        [COMP_TYPE.SELECT]: `请选择${label}`,
        [COMP_TYPE.DATE_PICKER]: `请选择${label}`,
        [COMP_TYPE.RANGE_PICKER]: ["开始日期", "结束日期"],
        [COMP_TYPE.TIME_PICKER]: `请选择${label}`,
        [COMP_TYPE.TIME_RANGE_PICKER]: ["开始时间", "结束时间"],
        [COMP_TYPE.TREE_SELECT]: `请选择${label}`,
      };
      return placeholder[type] || null;
    };

    const formatNode = item => {
      if (!_.isNil(item.props)) {
        item.props["placeholder"] =
          _.get(item, "props.placeholder", "") ||
          getPlaceholder(item.type.name, props.label);

        const hasSelfDisabled = _.has(item.props, "disabled");
        // 如果组件没有自己的disabled或者全局的disabled为true时，才使用全局disabled，否则使用自己的disabled。
        const isUseGlobalDisabled = !hasSelfDisabled || isDisabled.value;
        if (isUseGlobalDisabled) {
          item.props["disabled"] = isDisabled.value;
        }
      }
      const { formatValue, formatDate, formatSelect, formatTreeSelect } =
        useFormatElement();

      if (!isReadOnly.value) return item;

      // 详情场景
      if (canToggle.value) {
        const value = item.props?.value ?? NO_DATA;
        const type = item.type?.name;

        const element = {
          [COMP_TYPE.INPUT]: (v, i) => {
            return formatValue(v, i);
          },
          [COMP_TYPE.INPUT_NUMBER]: (v, i) => {
            return formatValue(v, i);
          },
          [COMP_TYPE.TEXTAREA]: (v, i) => {
            return formatValue(v, i);
          },
          [COMP_TYPE.SELECT]: (v, i) => {
            return formatSelect(v, i);
          },
          [COMP_TYPE.TREE_SELECT]: (v, i) => {
            return formatTreeSelect(v, i);
          },
          [COMP_TYPE.DATE_PICKER]: (v, i) => {
            return formatDate(v, i);
          },
          [COMP_TYPE.RANGE_PICKER]: (v, i) => {
            return formatDate(v, i);
          },
          [COMP_TYPE.TIME_PICKER]: (v, i) => {
            return formatDate(v, i);
          },
          [COMP_TYPE.TIME_RANGE_PICKER]: (v, i) => {
            return formatDate(v, i);
          },
        };

        if (element[type]) {
          return element[type] && element[type](value, item);
        }
      }
      return item;
    };

    const getSensitiveWords = name => {
      const value = _.get(formState.value, name, "") || "";
      const helpMsg = checkSensitiveWords(value);

      return helpMsg || "";
    };

    const isDisabled = inject("disabledKey");
    const isReadOnly = inject("readOnlyKey");
    // 切换编辑和只读开关， false以readonly渲染，true为组件渲染
    const canToggle = inject("canToggleKey");
    const checkSensitiveWords = inject("checkSensitiveWords");
    const validateMsgList = inject("validateMsgList");
    const formState = inject("formStateKey");

    const opConfig = inject("opConfigProvider", {
      form: { helpType: "danger" },
    });

    const isHasExtra = props.extra || slots.extra?.().length > 0;
    const formItemRef = ref(null);

    const getHelpMsg = computed(() => {
      const itemName = _.isString(attrs.name)
        ? attrs.name
        : attrs.name?.join(".");
      return _.get(validateMsgList.value, `${itemName}`, "");
    });

    onMounted(() => {
      if (props.attrName || attrs?.name) {
        formItemRef.value?.$el?.setAttribute(
          "name",
          props.attrName || attrs?.name
        );
      }
    });

    return () => (
      <>
        {slots.default().map((item, index) => {
          const isReadOnlyClass =
            isReadOnly.value && item.type?.name !== COMP_TYPE.IMAGE
              ? { pointerEvents: "none" }
              : "";
          const createTipSlot = (slotName, field) => {
            const slotData = _.get(tip.value, `${slotName}`, "");
            return (
              <>
                {slotData ? (
                  <>
                    <div>{slotData[field] || slotData}</div>
                    <span>
                      {slotData?.imgSrc && (
                        <a-image
                          width={200}
                          src={slotData?.imgSrc}
                          style={slotData?.imgStyle}
                        />
                      )}
                    </span>
                  </>
                ) : (
                  <span>{slots[slotName]?.()}</span>
                )}
              </>
            );
          };
          const tooltipContent = ({ classlist = [] } = {}) => (
            <>
              <tipComponent
                placement={tip.value.tipPlacement}
                class={classlist}
                v-slots={{
                  title: () => createTipSlot("tipTitle", "tipTitle"),
                  content: () => createTipSlot("tipContent", "content"),
                }}
              >
                {showPreTip.value ? <span>{props.label}</span> : ""}
                {tip.value.tipIcon && (
                  <tip.value.tipIcon style={tip.value.iconStyle} />
                )}
              </tipComponent>
            </>
          );

          const getHelpSlotContent = itemName => {
            const sensitiveWords = getSensitiveWords(itemName);
            const propsHelpMsg =
              props.help?.message || props.help || slots.help?.();

            const helpMsg = getHelpMsg.value || sensitiveWords || propsHelpMsg;

            const defaultHelpType = props.help?.type || opConfig.form?.helpType;
            const helpType =
              getHelpMsg.value || sensitiveWords ? "danger" : defaultHelpType;

            return helpMsg ? (
              <a-typography-text type={helpType} style={{ display: "block" }}>
                {helpMsg}
              </a-typography-text>
            ) : null;
          };

          const formItemSlots = {
            label: () =>
              showPreTip.value ? tooltipContent() : <span>{props.label}</span>,
          };

          const helpSlotContent = getHelpSlotContent(attrs.name);
          if (helpSlotContent) {
            formItemSlots.help = () => helpSlotContent;
          }

          return (
            <a-form-item
              colon={!!props.label}
              ref={formItemRef}
              {...attrs}
              rules={formRules.value}
              v-slots={formItemSlots}
            >
              <>
                <VNode
                  key={index}
                  vnode={formatNode(item)}
                  style={isReadOnlyClass}
                />
                {showSufTip.value &&
                  tooltipContent({ classlist: ["e-form-item-icon"] })}
              </>
              {isHasExtra && (
                <a-typography-text
                  type={props.extraType}
                  style={{ display: "block" }}
                >
                  {props.extra ? (
                    <span>{props.extra}</span>
                  ) : (
                    <span>{slots.extra?.()}</span>
                  )}
                </a-typography-text>
              )}
            </a-form-item>
          );
        })}
      </>
    );
  },
});
</script>
