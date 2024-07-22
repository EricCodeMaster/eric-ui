import { EButton } from "./EButton";
export * from "./EButton";
import { ESwitchButton } from "./ESwitchButton";
export * from "./ESwitchButton";
import { ESelect } from "./ESelect";
export * from "./ESelect";
import { ESection } from "./ESection";
export * from "./ESection";
import { EStatusTag } from "./EStatusTag";
export * from "./EStatusTag";
import { EActionButton } from "./EActionButton";
export * from "./EActionButton";
import { EForm, EFormItem } from "./EForm";
export * from "./EForm";
import { EEditableDesc } from "./EEditableDesc";
export * from "./EEditableDesc";
import { EConfigProvider } from "./EConfigProvider";
export * from "./EConfigProvider";

const cmpts = [
  EButton,
  ESwitchButton,
  ESelect,
  ESection,
  EStatusTag,
  EActionButton,
  EForm,
  EFormItem,
  EEditableDesc,
  EConfigProvider,
];

const EricUI = {
  install(Vue) {
    cmpts.forEach(cmpt => {
      Vue.component(cmpt.name, cmpt);
    });
  },
};

export default EricUI;
