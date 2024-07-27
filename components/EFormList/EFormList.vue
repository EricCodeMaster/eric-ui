<script lang="jsx">
import { reactive, watch, ref, nextTick, inject } from "vue";
import { Form } from "ant-design-vue";
import { assign, cloneDeep, omit, range, isEmpty, isEqual } from "lodash-es";
import { nanoid } from "nanoid";
import {
  CopyOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons-vue";

export default {
  name: "EFormList",
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    buttonInNewLine: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    afterAdd: {
      type: Function,
      default: () => true,
    },
    afterRemove: {
      type: Function,
      default: () => true,
    },
    beforeAdd: {
      type: Function,
      default: () => true,
    },
    beforeRemove: {
      type: Function,
      default: () => true,
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    name: {
      type: [String, Array],
      default: "",
    },
    direction: {
      type: String,
      default: "horizontal",
    },
  },
  setup(props, { slots, emit, expose }) {
    const formItemContext = Form.useInjectFormItemContext();

    const getInitialState = (value = props.value) => {
      if (!isEmpty(value)) {
        return cloneDeep(value).map(item => {
          item.key = nanoid();
          return item;
        });
      }

      if (props.min) {
        const data = range(props.min).map(() => {
          const item = {};
          item.key = nanoid();
          return item;
        });
        return data;
      }
      return [];
    };
    // 回填预置值
    const formState = reactive(getInitialState());

    // 值更新时同步到父组件
    watch(
      formState,
      () => {
        const newValue = isEmpty(props.value) ? [] : props.value;

        if (
          !isEqual(
            cloneDeep(formState).map(item => omit(item, "key")),
            newValue
          )
        ) {
          emit(
            "update:value",
            formState.map(item => omit(item, "key"))
          );
          formItemContext.onFieldChange();
        }
      },
      {
        deep: true,
        flush: "sync",
      }
    );

    const handleChange = (row, newValue) => {
      assign(row, newValue);
    };

    const handleAdd = async (initialData = {}) => {
      if (await props.beforeAdd({})) {
        formState.push({
          ...initialData,
          key: nanoid(),
        });
        nextTick(() =>
          props.afterAdd({
            defaultValue: initialData,
            insertIndex: formState.length - 1,
            count: formState.length - 1,
          })
        );
      }
    };

    const handleRemove = async index => {
      if (!formState[index]) {
        return;
      }
      const row = omit(cloneDeep(formState[index]), "key");
      if (await props.beforeRemove({ index, row })) {
        formState.splice(index, 1);
        nextTick(() =>
          props.afterRemove({
            index,
            count: formState.length > 0 ? formState.length - 1 : 0,
          })
        );
      }
    };

    const handleCopy = index => {
      if (!formState[index]) {
        return;
      }
      const row = formState[index];
      formState.push(cloneDeep(row));
    };

    const handleMove = (index, newIndex) => {
      if (formState[index] && newIndex >= 0 && formState.length > newIndex) {
        // 数组元素位置交换
        formState.splice(
          newIndex,
          1,
          ...formState.splice(index, 1, formState[newIndex])
        );
      }
    };

    // 暴露组件方法
    expose({
      add: handleAdd,
      remove: handleRemove,
      copy: handleCopy,
      move: handleMove,
      getData: () => formState.map(item => omit(item, "key")),
      setData: value => {
        formState.splice(0, formState.length, ...getInitialState(value));
      },
    });

    // 渲染默认行，并获取label用于渲染列标题
    const colTitle = ref([]);
    const renderSlots = (row, index) => {
      const vNode = slots.default({
        row,
        rowIndex: index,
        triggerChange: value => handleChange(row, value),
      });
      if (!colTitle.value.length) {
        setTimeout(() => {
          colTitle.value = vNode.map(item => {
            const width = getComputedStyle(item.el).width;
            return { label: item.props?.label || "", width };
          });
        });
      }
      return vNode;
    };
    // 渲染列标题插槽
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      const showTitle =
        colTitle.value && colTitle.value.some(item => item.label);
      return showTitle ? (
        <a-space class="e-form-list__title">
          {colTitle.value.map(item => (
            <span
              style={{
                width: item.width,
                display: "inline-block",
                paddingLeft: "10px",
              }}
            >
              {item.label}
            </span>
          ))}
        </a-space>
      ) : null;
    };
    // 渲染“新增按钮”插槽
    const renderNewButton = () => {
      const disabled = props.max ? formState.length >= props.max : false;
      if (slots.creatorButton) {
        return (
          <span onClick={() => handleAdd()}>
            {slots.creatorButton({ disabled })}
          </span>
        );
      }
      return (
        <a-button disabled={disabled} onClick={() => handleAdd()}>
          增加
        </a-button>
      );
    };
    // 渲染“复制按钮”插槽
    const renderCopyButton = index => {
      if (slots.copyIcon) {
        return slots.copyIcon({ rowIndex: index });
      }
      return (
        <a onClick={() => handleCopy(index)}>
          <CopyOutlined />
        </a>
      );
    };
    // 渲染“新增一行”图标按钮插槽
    const renderAddButton = () => {
      if (slots.addIcon) {
        return slots.addIcon();
      }
      return (
        <a onClick={handleAdd}>
          <PlusSquareOutlined />
        </a>
      );
    };
    // 渲染“移除一行”图标按钮插槽
    const renderRemoveButton = index => {
      if (slots.deleteIcon) {
        return slots.deleteIcon({ rowIndex: index });
      }
      return (
        <a onClick={() => handleRemove(index)}>
          <DeleteOutlined />
        </a>
      );
    };
    // formlist 右侧插槽
    const renderItemRightRegion = (row, index) => {
      if (slots.itemRightRegion) {
        return slots.itemRightRegion({
          row,
          rowIndex: index,
          triggerChange: value => handleChange(row, value),
        });
      }
      return null;
    };
    // formlist 更多动作按钮
    const renderItemMoreActionBtn = (row, index) => {
      if (slots.moreItemActionBtn) {
        return slots.moreItemActionBtn({
          row,
          rowIndex: index,
          triggerChange: value => handleChange(row, value),
        });
      }
      return null;
    };

    const opConfig = inject("opConfigProvider", {
      formList: { wrapClassName: "" },
    });

    return () => {
      if (formState.length) {
        return (
          <div class={opConfig.formList.wrapClassName}>
            {props.direction === "horizontal" && renderTitle()}
            {formState.map((item, index) => {
              let isShowNewButton =
                formState.length === index + 1 && !props.buttonInNewLine;
              let isShowCopyButton = props.max
                ? formState.length < props.max
                : true;
              if (props.max) {
                isShowNewButton = isShowNewButton && index < props.max - 1;
              }
              let isShowRemoveButton = true;
              if (props.min) {
                isShowRemoveButton = formState.length > props.min;
              }
              return (
                item && (
                  <a-form-item
                    name={
                      props.name
                        ? [
                            ...(Array.isArray(props.name)
                              ? props.name
                              : [props.name]),
                            index,
                          ]
                        : ""
                    }
                    rules={props.rules}
                    class="e-form-list__item"
                  >
                    <a-space
                      class="e-form-list__row"
                      direction={props.direction}
                    >
                      {renderSlots(item, index)}
                      <a-space class="e-form-list__action">
                        {renderItemMoreActionBtn(item, index)}
                        {isShowCopyButton && renderCopyButton(index)}
                        {isShowRemoveButton && renderRemoveButton(index)}
                        {isShowNewButton && renderAddButton()}
                      </a-space>
                      {renderItemRightRegion(item, index)}
                    </a-space>
                  </a-form-item>
                )
              );
            })}
            {props.buttonInNewLine && renderNewButton()}
          </div>
        );
      }
      return renderNewButton();
    };
  },
};
</script>
