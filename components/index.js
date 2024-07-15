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

const cmpts = [EButton, ESwitchButton, ESelect, ESection, EStatusTag];

const EricUI = {
  install(Vue) {
    cmpts.forEach(cmpt => {
      Vue.component(cmpt.name, cmpt);
    });
  },
};

export default EricUI;
