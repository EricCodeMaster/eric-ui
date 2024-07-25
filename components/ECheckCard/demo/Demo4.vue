<template>
  <section>
    <div>只有标题</div>
    <ECheckCard
      :options="groupOption.onlyTitle"
      :value="value1"
      @change="handleOnValue1Change"
    />
    <div>只有描述</div>
    <ECheckCard
      :options="groupOption.onlyDesc"
      :value="value1"
      @change="handleOnValue1Change"
    />
    <div>只有图片</div>
    <ECheckCard
      :options="groupOption.onlyIcon"
      :value="value1"
      @change="handleOnValue1Change"
    />
    <div>标题与描述</div>
    <ECheckCard
      :options="groupOption.noIcon"
      :value="value1"
      @change="handleOnValue1Change"
    />
    <div>完整</div>
    <ECheckCard
      :options="groupOption.full"
      :value="value1"
      @change="handleOnValue1Change"
    />
  </section>
</template>

<script lang="jsx">
import { ref } from "vue";
import image1 from "./img1.png";

export default {
  setup() {
    const value1 = ref([]);

    const imageUrl = () => <img alt src={image1} draggable="false" />;

    const groupOption = {
      onlyTitle: [
        { value: 1, label: "标题1" },
        { value: 2, label: "一段简单的文本描述" },
        { value: 3, label: "一段简单的文本描述2" },
      ],
      onlyDesc: [
        { value: 1, description: "一段简单的文本描述" },
        { value: 2, description: "一段简单的文本描述" },
        { value: 3, description: "一段简单的文本描述" },
      ],
      onlyIcon: [
        { value: 1, icon: imageUrl },
        { value: 2, icon: imageUrl },
        { value: 3, icon: imageUrl },
      ],
      noIcon: [
        {
          value: 1,
          label: "唱歌",
          description: "一段简单的文本描述",
        },
        {
          value: 2,
          label: "跳舞",
          description: "一段简单的文本描述",
        },
        {
          value: 3,
          label: "打篮球",
          description: "一段简单的文本描述",
        },
      ],
      noDesc: [
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
        },
      ],
      full: [
        {
          value: 1,
          label: "唱歌",
          icon: imageUrl,
          description: "文本描述",
        },
        {
          value: 2,
          label: "跳舞",
          icon: imageUrl,
          description: "文本描述",
        },
        {
          value: 3,
          label: "打篮球",
          icon: imageUrl,
          description:
            "一段简单的文本描述一段简单的文本描述一段简单的文本描述一段简单的文本描述一段简单的文本描述一段简单的文本描述一段简单的文本描述",
        },
      ],
    };
    const handleOnValue1Change = value => {
      value1.value = value;
    };

    return {
      value1,
      handleOnValue1Change,
      groupOption,
    };
  },
};
</script>
