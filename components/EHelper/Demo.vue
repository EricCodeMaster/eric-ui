<template>
  <div>
    <a-space :size="32">
      <EHelper text="有链接无Tip" link="https://www.baidu.com" theme="warn" />
      <EHelper
        text="有链接有Tip"
        tip="我是tooltip内容"
        link="https://www.baidu.com"
      />
      <EHelper text="无链接有Tip" tip="我是tooltip内容" theme="info" />
      <EHelper text="无链接无Tip" theme="danger" />
    </a-space>
  </div>
  <div style="margin-top: 16px">
    <a-space :size="32">
      <EHelper text="自定义Icon">
        <template #icon>
          <SmileOutlined />
        </template>
      </EHelper>
      <EHelper text="无Icon" noIcon tip="我没有ICON" />
    </a-space>
  </div>
</template>

<script setup>
import { SmileOutlined } from "@ant-design/icons-vue";
</script>
