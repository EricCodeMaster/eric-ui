<template>
  <section>
    <div>
      只读
      <a-switch v-model:checked="readonly"></a-switch>
    </div>
    <div>最大值：3，单标签限制20字</div>
    <div style="margin-top: 40px">
      <ETagInput
        v-model:value="value"
        :input-maxlength="20"
        :max="3"
        :readonly="readonly"
        text="增加新项（20字以内）"
      ></ETagInput>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const value = ref([]);
const readonly = ref(false);
</script>
