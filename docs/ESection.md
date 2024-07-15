# Section-分段布局

:::preview Section || 用在详情页或表单页，对多个内容进行分群展示时，提供分隔样式

demo-preview=../components/ESection/Demo.vue

:::

## API

#### ESection 属性

| 属性名       | 说明                | 类型            | 默认值 | 版本  |
| ------------ | ------------------- | --------------- | ------ | ----- |
| title        | 标题名称            | String          | ''     | 2.5.8 |
| contentStyle | 内容区域自定义样式  | Object          | {}     | 2.5.8 |
| titleStyle   | 标题区域自定义样式  | Object          | {}     | 2.5.8 |
| bottom       | 新增 tab 的数据结构 | String \|Number | 0      | 2.5.8 |

#### ESection 插槽

| 属性名     | 说明                                                | 类型 | 默认值 | 版本  |
| ---------- | --------------------------------------------------- | ---- | ------ | ----- |
| default    | 默认内容区域                                        | Slot | -      | 2.5.8 |
| head_title | 左侧标题可以自定义                                  | Slot | -      | 2.5.8 |
| head_tool  | 右侧工具按钮区域，推荐使用 button，尺寸设置为 small | Slot | -      | 2.5.8 |
