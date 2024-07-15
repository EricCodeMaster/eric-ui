# Status Tag

:::preview StatusTag || 适用于表格、列表中标记数据进展及状态，优先使用预置标签，统一风格，如不满足可自定义标签。


demo-preview=../components/EStatusTag/Demo.vue

:::

## API

#### StatusTag 属性

| 属性名 | 说明                                                                                                                                                                     | 类型      | 默认值 | 版本  |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------ | ----- |
| type   | 标签类型（可使用预置状态，不添加则需要自定义）                                                                                                                           | string    | -      | 0.0.4 |
| name   | 标签状态                                                                                                                                                                 | string    | -      | 0.0.4 |
| icon   | 标签图标                                                                                                                                                                 | component | -      | 0.0.4 |
| color  | 标签颜色，状态标签没有边框、背景色，不支持自定义颜色，只支持 tag 的预置色 （pink、red、orange、green、cyan、blue、purple、success、processing、error、warning、default） | string    | -      | 0.0.4 |
| style  | 标签样式                                                                                                                                                                 | object    | -      | 0.0.4 |
