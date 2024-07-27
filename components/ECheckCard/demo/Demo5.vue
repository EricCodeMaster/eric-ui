<template>
  <a-form :model="formState" name="basic" @finish="handleOnFinish">
    <a-form-item
      label="checkbox"
      name="checkbox"
      :rules="[{ required: true, message: 'Please select a value!' }]"
    >
      <ECheckCard v-model:value="formState.checkbox" :options="options1" style="margin: 0">
        <template #icon2><img alt :src="image3" draggable="false" /></template>
      </ECheckCard>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="jsx">
import { reactive } from "vue";
import image1 from "./img1.png";
import image2 from "./img2.png";
import image3 from "./img3.png";

export default {
  name: "ListPage1",
  setup() {
    const formState = reactive({
      checkbox: null,
    });

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

    const handleOnFinish = () => {
      console.log(formState.checkbox);
    };

    return {
      image1,
      image2,
      image3,
      formState,
      options1,
      handleOnFinish,
    };
  },
};
</script>
