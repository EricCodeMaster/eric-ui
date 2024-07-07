<template>
  <img src="/homeLogo.png" alt="" :class="$style.image" />
</template>
<style lang="less" module>
.image {
  max-width: 200px;
  max-height: 200px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
