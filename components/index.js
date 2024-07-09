import { EButton } from "./Button";
export * from "./Button";
import { ECard } from "./Card";
export * from "./Card";

const cmpts = [EButton, ECard];

const EricUI = {
  install(Vue) {
    cmpts.forEach(cmpt => {
      Vue.component(cmpt.name, cmpt);
    });
  },
};

export default EricUI;
