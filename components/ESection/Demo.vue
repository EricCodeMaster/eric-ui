<template>
  <section>
    <ESection title="标题1" bottom="16px">
      <template #head_tool>
        <a-button type="primary" size="small">操作按钮</a-button>
      </template>
      <a-card size="small">内容区域</a-card>
    </ESection>
    <ESection title="标题2" :titleStyle="{ marginTop: '12px' }" bottom="16px">
      <template #head_tool>
        <a-button type="primary" size="small">操作按钮</a-button>
      </template>
      <a-card size="small">内容区域</a-card>
    </ESection>
  </section>
</template>
