# Form 表单增强

| 开发痛点                                    | 对应能力                                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 需要表单缓存，编辑时如外力导致辛苦编辑的数据丢失 | 因外力导致页面关闭，在打开页面时，可以提示使用缓存，确定后使用缓存数据 |
| placeholder 内容容易漏写                    | 对于有 label 的组件，默认的 placeholder 为“请输入”或“请选择”+ ${label}，支持自定义                            |
| 校验时的 message 容易漏写                   | required 增强， 如果表单项仅是必填，那么默认的 message 就是 `${lable}是必填项`, 不必再传入 rule，避免重复代码 |
| labelCol,wrapperCol 不统一，每次都额外定义  | 默认支持 label-col:4, wrapper-col: 16, 与场景规则统一                                                         |
| label 上经常需要写 tooltip 并且要加图标插槽 | 可配置 tooltip-icon, 支持图标类型、图标自定义、颜色、文本，位置（label 内还是表单项后面，默认前者）           |
| 只读模式、禁用模式                          | 支持 readonly、disabled ，不需要对每个 formItem 逐个定义，可以统一管理                                        |
| 扩展配置                                    | 支持 tooltip-icon、extra 额外信息                                                                             |
| extra 信息上的颜色需要自定义                | 可配置 extra 文本颜色类型不需要额外插槽                                                                       |
| 扩展方法                                    | 支持敏感词检查    

## Demo
:::preview 内置默认提示文案 || 默认placeholder：请输入/选择xxx； 传入required为true时，默认校验提示：${label}是必填项（支持自定义覆盖）

demo-preview=../components/EForm/demo/Demo1.vue

:::
:::preview readonly/disabled模式 || 一键只读，一键禁用，无需重复编码

demo-preview=../components/EForm/demo/Demo2.vue

:::
:::preview 表单缓存能力 || 编辑时因外力导致页面关闭，再打开时可提示使用缓存数据。确定使用缓存数据以及表单提交之后会清除缓存

demo-preview=../components/EForm/demo/Demo3.vue

:::
:::preview 内置icon提示 || 支持tooltip/popover两种提示类型，支持tip属性传入字符串、对象、插槽定制提示自定义提示内容，内置图片组件

demo-preview=../components/EForm/demo/Demo4.vue

:::
:::preview 内置敏感词校验提示、help提示、以及extra额外提示能力 || help提示优先级：敏感词提示 > 校验提示 > 默认提示。help和extra同时支持字符串、插槽、对象写法

demo-preview=../components/EForm/demo/Demo5.vue

:::
:::preview 编辑详情模式切换 || 针对编辑和详情的时候每次都需要做处理，故开发此功能，还在优化中...

demo-preview=../components/EForm/demo/Demo6.vue

:::

## API

#### EForm 属性

兼容所有 form 的属性与方法 参考 [Ant design vue Form](https://3x.antdv.com/components/form-cn)

| 属性名              | 说明                                                                                                                                                                                                       | 类型     | 默认值 | 版本  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ | ----- |
| disabled            | 禁用模式(如果组件本身有 disabled 则使全局 disabled 失效)                                                                                                                                                   | Boolean  | false  | 0.0.4 |
| readonly            | 只读模式                                                                                                                                                                                                   | Boolean  | false  | 0.0.4 |
| checkSensitiveWords | 将检查敏感词方法提供给 form，form 在校验的时候会调用此方法, 此方法接收两个参数(value、name), value: 获取到的数据， name：表单 label, 对 value 进行自定义校验，如果匹配到敏感词则需要返回一个字符串用于提示 | function | -      | 0.0.4 |
| modalProps          | 弹窗配置                                                                                                                                                                                                   | function | -      | 0.0.4 |

#### EFormItem 属性

| 属性名    | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 类型               | 默认值  | 版本  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- | ----- |
| label     | label 标签的文本                                                                                                                                                                                                                                                                                                                                                                                                                                                                | String             | -       | 0.0.4 |
| required  | true 时，默认提示 ${props.label}是必填项                                                                                                                                                                                                                                                                                                                                                                                                                                        | Boolean            | false   | 0.0.4 |
| rules     | 表单验证规则,优先使用 formItem 上的规则，没有则使用 Form 上                                                                                                                                                                                                                                                                                                                                                                                                                     | object/array       | -       | 0.0.4 |
| extra     | 额外的提示信息,支持插槽、props 传入                                                                                                                                                                                                                                                                                                                                                                                                                                             | String             | -       | 0.0.4 |
| extraType | 提示信息的类型，支持 secondary/success/warning/danger                                                                                                                                                                                                                                                                                                                                                                                                                           | String             | warning | 0.0.4 |
| tip       | 1、tip 如果只传入字符串会作为 tipTitle 提示信息, 可传入 object 进行配置（提示图标配置：tipTitle：提示信息、tipType：提示类型（tooltip/popover），tipIcon: icon 组件、 tipPlacement: 提示框方向(同 tooltip)、location: 图标位置（'prefix'/ 'suffix'）、iconStyle：图标样式）2、tip 支持两种组件：tooltip/popover, 支持插槽 tipTitle/tipContent， 仅使用 popover 时支持 tipContent 插槽(tipContent 为配置项时支持：imgSrc: '图片路径',imgStyle： '图片样式',content：'文本内容'') | Object/String      | -       | 0.0.4 |
| attrName  | 自定义 formItem 的 name attribute 属性，默认取 name 值                                                                                                                                                                                                                                                                                                                                                                                                                          | String             | ''      | 0.0.4 |
| help      | 1、支持字符串、插槽、对象（{ message: '信息！', type: '同 extraType' }） 2、显示优先级：校验信息>敏感词>帮助提示                                                                                                                                                                                                                                                                                                                                                                | String/Object/slot | ''      | 0.0.4 |


#### 使用表单缓存
配置：
| 参数            | 说明            |
| ------------- | ---------------- | 
| enableCache       | 是否开启缓存    | 
| userName       | 当前用户（必传，防止数据污染）    | 
| id             | 表单id （必传，防止数据污染）     |
| isCustomTip        | 是否使用自定义缓存提示      |
| isEdit        | 是否是编辑状态（编辑时可调用表单数据请求）      |
| formRequest        | 表单数据请求      |
| submitRequest        | 提交请求, 返回 Boolean值     |
| modalTitle        | 内置缓存提示      |

使用form引用调用如下api：
| 参数            | 说明            |
| ------------- | ---------------- | 
| initLocalData | 最初的表单缓存的数据    | 
| onOk          | 确认使用缓存（自定义时调用回填）      |
| submit        | 提交时调用（请求成功清除当前缓存数据）      |
| get        | 获取本地缓存      |
| set        | 设置本地缓存      |
| clear        | 清除本地缓存      |

#### 事件

| 参数   | 说明     | 类型     | 版本  |
| ------ | -------- | -------- | ----- |
| finish | 确认弹窗 | function | 0.0.4 |
| cancel | 取消弹窗 | function | 0.0.4 |

#### 插槽

| 参数       | 说明     | 类型        | 默认值 | 版本 |
| ---------- | -------- | ----------- | ------ | ---- |
| tipTitle   | 提示文本 | slot/string |
| tipContent | 提示文本 | slot/string |
| extra      | 额外提示 | slot/string |

#### EModalForm 插槽

| 参数    | 说明     | 类型         | 默认值 | 版本  |
| ------- | -------- | ------------ | ------ | ----- |
| message | 提示文本 | slot/message | -      | 2.5.7 |

#### 开发要点

1. 使用 vNode 渲染插槽对象，拦截插槽进行改写属性
2. provide/inject 提供属性、方法，实现只读、禁用、敏感词校验
