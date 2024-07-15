# Select-下拉框增强

:::preview Select || Antd Select 二次封装，支持自动添加 title，当大于 20 条候选列表时自动支持搜索，支持将 label 内置到 select 内部的显示中，支持 readOnly 属性，默认宽度 200px,默认支持 allowClear.

demo-preview=../components/ESelect/Demo.vue

:::

## API

#### ESelect 属性

兼容所有 select 的方法 参考 [Ant design vue Select](https://www.antdv.com/components/select-cn), 仅展示额外新增属性


| 属性名   | 说明         | 类型             | 默认值 | 版本  |
| -------- | ------------ | ---------------- | ------ | ----- |
| value    | 当前值       | String \| Number | null   | 0.0.4 |
| readonly | 是否只读     | Boolean          | false  | 0.0.4 |
| pinyin    | 是否启用拼音搜索（需要npm i js-pinyin） | Boolean          | false   | 0.0.4 |
|以下仅支持option写法：|
| colon    | 是否显示冒号 | Boolean          | true   | 0.0.4 |
| preLabel | 前置标签(仅支持options写法)     | String           | -      | 0.0.4 |
| showAll    | 为true时，增加选项-全部（默认） | Boolean          | true   | 0.0.4 |
| defaultTitle    | showAll为true时，增加选项title（例如不选择） | String    | ''   | 0.0.4 |
| defaultValue    | showAll为true时，增加选项value | String, Number    | ''   | 0.0.4 |


#### 开发要点

1. 基于 antd 开发, 兼容 antd 的使用方式
2. 通过对 select 的定制回填内容实现前置的 label
3. 默认的配置,将常用且固定的配置内置, 且支持自定义
4. 功能扩展, 比如只读模式,自动开启模糊搜索
