import { EButton } from "./EButton";
export * from "./EButton";
import { ESwitchButton } from "./ESwitchButton";
export * from "./ESwitchButton";
import { ESelect } from "./ESelect";
export * from "./ESelect";

const cmpts = [EButton, ESwitchButton, ESelect];

const EricUI = {
  install(Vue) {
    cmpts.forEach(cmpt => {
      Vue.component(cmpt.name, cmpt);
    });
  },
};

export default EricUI;
