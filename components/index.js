import { EButton } from "./EButton";
export * from "./EButton";
import { ESwitchButton } from "./ESwitchButton";
export * from "./ESwitchButton";
import { ESelect } from "./ESelect";
export * from "./ESelect";
import { ESection } from "./ESection";
export * from "./ESection";

const cmpts = [EButton, ESwitchButton, ESelect, ESection];

const EricUI = {
  install(Vue) {
    cmpts.forEach(cmpt => {
      Vue.component(cmpt.name, cmpt);
    });
  },
};

export default EricUI;
