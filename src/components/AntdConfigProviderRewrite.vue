<template>
  <a-config-provider :locale="locale">
    <slot />
  </a-config-provider>
</template>

<script setup>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const locale = zhCN;
</script>
