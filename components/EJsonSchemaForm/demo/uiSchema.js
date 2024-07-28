import { set, cloneDeep, forOwn, get } from "lodash-es";

export const getSchemaMap = (config = {}) => {
  const schema = {
    integer: {
      component: "a-input-number",
      props: {
        precision: 0,
        placeholder: "请输入",
      },
    },
    number: {
      component: "a-input-number",
      props: {
        placeholder: "请输入",
        step: 0.1,
      },
    },
    array: {
      component: "a-select",
      props: {
        mode: "multiple",
      },
    },
    boolean: {
      component: "a-radio-group",
      props: {
        optionType: "button",
        options: [
          { title: "是", label: "是", value: true },
          { title: "否", label: "否", value: false },
        ],
      },
    },
  };

  const defaultSchema = {
    component: "a-input",
    props: {
      placeholder: "请输入",
    },
  };

  const propsMap = {
    minimum: "min",
    maximum: "max",
    maxLength: "maxlength",
  };

  const result = cloneDeep(schema[config?.type || "default"] || defaultSchema);
  forOwn(config, (value, key) => {
    const propsKey = propsMap[key];
    if (propsKey) {
      set(result, `props.${propsKey}`, value);
    }
    if (key === "enum" && config.type !== "boolean") {
      result.component = "a-select";
      result.props.placeholder = "请选择";
      const labelArray = config.enumLabel || [];
      const titleArray = config.enumTitle || [];
      set(
        result,
        `props.options`,
        value.map((item, index) => ({
          title: titleArray[index] || item.toString(),
          value: item,
          label: labelArray[index] || item.toString(),
        }))
      );
    }
  });

  if (
    config.type === "array" &&
    !["array", "object"].includes(config.items.type)
  ) {
    const options = get(config, "items.enum");
    if (options) {
      set(
        result,
        "props.options",
        options.map(item => ({
          title: item,
          value: item,
          label: item,
        }))
      );
    } else {
      set(result, "props.mode", "tags");
      set(result, "props.placeholder", "请输入值按回车键保存");
    }
  }

  return result;
};
