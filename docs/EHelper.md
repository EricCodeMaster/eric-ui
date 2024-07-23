# Helper-帮助词条

:::preview 帮助词条 || 统一成配置方式填写, 统一风格

demo-preview=../components/EHelper/Demo.vue

:::

## API

#### EHelper 属性

| 属性名        | 说明                                                      | 类型    | 默认值 | 版本  |
| ------------- | --------------------------------------------------------- | ------- | ------ | ----- |
| text          | 词条文案                                                  | String  | -      | 0.0.4 |
| theme         | 词条主题，可选值为[info, warn, danger, help]，默认为 info | String  | info   | 0.0.4 |
| tip           | 词条 tip 文案                                             | String  | -      | 0.0.4 |
| link          | 词条跳转链接                                              | String  | -      | 0.0.4 |
| noIcon        | 隐藏词条左侧 ICON                                         | Boolean | false  | 0.0.4 |
| toolTipConfig | 支持 a-tooltip API                                        | Object  | {}     | 0.0.4 |

#### EHelper Slots

| 插槽名 | 说明       | 版本  |
| ------ | ---------- | ----- |
| icon   | 自定义图标 | 0.0.4 |
| text   | 自定义文本 | 0.0.4 |
