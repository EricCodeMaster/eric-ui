<template>
  <ECheckCard
    :options="optionsDisable"
    :value="value1"
    @change="handleOnValue1Change"
  />
</template>

<script lang="jsx">
import { ref } from "vue";
import image1 from "./img1.png";

export default {
  setup() {
    const value1 = ref([]);

    const imageUrl = () => <img alt src={image1} draggable="false" />;

    const optionsDisable = [
      {
        value: 1,
        label: "唱歌",
        icon: imageUrl,
      },
      {
        value: 2,
        label: "跳舞",
        icon: imageUrl,
      },
      {
        value: 3,
        label: "打篮球",
        icon: imageUrl,
        disabled: true,
      },
    ];

    const handleOnValue1Change = value => {
      value1.value = value;
    };

    return {
      optionsDisable,
      value1,
      handleOnValue1Change,
    };
  },
};
</script>
