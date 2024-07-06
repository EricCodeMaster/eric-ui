<template>
  <div><a-button @click="handleClick">点击测试</a-button></div>
</template>

<script setup>
const handleClick = () => {
  alert("测试");
};
</script>
