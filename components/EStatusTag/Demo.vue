<template>
  <div style="width: 80%">
    <a-row>
      <a-col :span="3">预置：</a-col>
      <a-col :span="16" style="display: flex; flex-wrap: wrap">
        <EStatusTag type="pending_approved" name="编辑待审核++" />
        <EStatusTag type="approving" />
        <EStatusTag type="approved" />
        <EStatusTag type="approved_reject" />
        <EStatusTag type="deleted" />
        <EStatusTag type="finished" />
        <EStatusTag type="cancel" />
        <EStatusTag type="stopped" />
        <EStatusTag type="revocation" />
        <EStatusTag type="paused" />
        <EStatusTag type="noStart" />
        <EStatusTag type="run_success" />
        <EStatusTag type="start_success" />
        <EStatusTag type="in_preparation" />
        <EStatusTag type="processing" />
        <EStatusTag type="in_starting" />
        <EStatusTag type="in_running" />
        <EStatusTag type="run_cancel" />
        <EStatusTag type="start_cancel" />
        <EStatusTag type="online" />
        <EStatusTag type="offline" />
        <EStatusTag type="draft" />
        <EStatusTag type="invalid" />
        <EStatusTag type="valid" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="3">自定义：</a-col>
      <a-col :span="16" style="display: flex">
        <EStatusTag
          color="orange"
          name="自定义"
          :icon="PlayCircleOutlined"
        ></EStatusTag>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { PlayCircleOutlined } from "@ant-design/icons-vue";
</script>
