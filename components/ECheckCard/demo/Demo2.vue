<template>
  <ECheckCard
    :options="options1"
    :value="value1"
    multiple
    @change="handleOnValue1Change"
  >
    <template #icon2><img alt :src="image3" draggable="false" /></template>
  </ECheckCard>
</template>

<script lang="jsx">
import { ref } from "vue";
import image1 from "./img1.png";
import image2 from "./img2.png";
import image3 from "./img3.png";

export default {
  setup() {
    const value1 = ref([]);

    const imageUrl = () => <img alt src={image1} draggable="false" />;

    const imageUrl2 = () => <img alt src={image2} draggable="false" />;

    const options1 = [
      {
        value: 1,
        label: "唱歌",
        icon: imageUrl,
        tooltip: "这是一段提示~",
      },
      {
        value: 2,
        label: "跳舞",
        slot: "icon2",
        tooltip: "这是一段提示~",
        tooltipConfig: {
          placement: "right",
        },
      },
      {
        value: 3,
        label: "打篮球",
        icon: imageUrl2,
      },
    ];

    const handleOnValue1Change = value => {
      value1.value = value;
    };

    return {
      image1,
      image2,
      image3,
      options1,
      handleOnValue1Change,
      value1,
    };
  },
};
</script>
