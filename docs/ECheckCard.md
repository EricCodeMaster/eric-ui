# Check Card-多选卡片

:::preview 基础使用

demo-preview=../components/ECheckCard/demo/Demo1.vue

:::
:::preview 多选

demo-preview=../components/ECheckCard/demo/Demo2.vue

:::
:::preview 禁用选项

demo-preview=../components/ECheckCard/demo/Demo3.vue

:::
:::preview 卡片各种形式

demo-preview=../components/ECheckCard/demo/Demo4.vue

:::
:::preview 表单中使用

demo-preview=../components/ECheckCard/demo/Demo5.vue

:::

## API

#### ECheckCard 属性

| 属性名   | 说明         | 类型                                                                                                      | 默认值 | 版本           |
| -------- | ------------ | --------------------------------------------------------------------------------------------------------- | ------ | -------------- |
| options  | 选项配置：   | 'object[] {label: String, icon: vNode\|Slot, description: String， tooltip: String, tooltipConfig: Object}' | []     | 0.0.4 |
| multiple | 是否支持多选 | Boolean                                                                                                   | false  | 0.0.4          |
| value    | 当前值       | String, Number, Array                                                                                     | null   | 0.0.4          |

#### ECheckCard 事件

| 属性名 | 说明             | 签名            | 版本  |
| ------ | ---------------- | --------------- | ----- |
| change | 值发生改变时调用 | '(value) => void' | 0.0.4 |
| update | 值发生改变时调用 | '(value) => void' | 0.0.4 |
