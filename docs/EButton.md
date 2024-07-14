# Button

:::preview Button || 继承 ant design button 能力

demo-preview=../components/EButton/Demo.vue

:::

## API

#### EButton 属性

兼容 AButton 的属性与方法 参考 [Ant design vue Form](https://3x.antdv.com/components/form-cn)

| 属性名    | 说明                                                                        | 类型             | 默认值  | 版本  |
| --------- | --------------------------------------------------------------------------- | ---------------- | ------- | ----- |
| config    | 弹窗配置，存在此属性，则 click 事件不生效                                   | Object           | -       | 0.0.4 |
| modalType | 弹窗类型                                                                    | String           | confirm | 0.0.4 |
| tooltip   | tooltip 的配置项，参考 ant design 的 tooltip 配置, 如果是字符串，则直接展示 | Object \| String | -       | 0.0.4 |

#### EButtonItem 插槽

| 属性名  | 说明           | 类型 | 默认值 | 版本  |
| ------- | -------------- | ---- | ------ | ----- |
| tooltip | tooltip 自定义 | Slot | -      | 0.0.4 |
