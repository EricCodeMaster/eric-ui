# Form List-不定项表单

:::preview 新建按钮在行内

demo-preview=../components/EFormList/demo/Demo1.vue

:::
:::preview 新建按钮独占一行

demo-preview=../components/EFormList/demo/Demo2.vue

:::
:::preview 自定义新建按钮

demo-preview=../components/EFormList/demo/Demo3.vue

:::
:::preview 最大行数、最小行数

demo-preview=../components/EFormList/demo/Demo4.vue

:::
:::preview 自定义列标题

demo-preview=../components/EFormList/demo/Demo5.vue

:::
:::preview 操作组件实例 add/remove/move/getData

demo-preview=../components/EFormList/demo/Demo6.vue

:::
:::preview hooks（afterAdd，afterRemove, beforeAddRow, beforeRemoveRow）

demo-preview=../components/EFormList/demo/Demo7.vue

:::
:::preview 表单验证

demo-preview=../components/EFormList/demo/Demo8.vue

:::
:::preview 右侧 inline 区域/ #itemRightRegion #moreItemActionBtn

demo-preview=../components/EFormList/demo/Demo9.vue

:::
:::preview 带操作符/条件选择互斥的 formList

demo-preview=../components/EFormList/demo/Demo10.vue

:::

## API

#### EFormList 属性

**注意** 通过 opConfigProvider 配置最外层样式后，可以在脚手架内重写 `e-form-list__title`、`e-form-list__row`、`e-form-list__action`, `e-form-list__item` 四个 class 来定制外观。

| 参数            | 说明                                                           | 类型    | 默认值     | 版本  |
| --------------- | -------------------------------------------------------------- | ------- | ---------- | ----- |
| buttonInNewLine | 新建按钮是否独占一行                                           | boolean | false      | 0.0.4 |
| min             | 最少条目，删除时如果当前数据条目少于该数则无法删除             | number  | -          | 0.0.4 |
| max             | 最多条目，新增或复制时如果当前数据条目多于该数则无法新增或复制 | number  | -          | 0.0.4 |
| direction       | 排列方向                                                       | string  | horizontal | 2.6.9 |

#### EFormList Slots

| 参数              | 说明                                                  | 默认值                                    | slotScope                      | 版本  |
| ----------------- | ----------------------------------------------------- | ----------------------------------------- | ------------------------------ | ----- |
| default           | 行元素配置                                            |                                           | '{row, rowIndex, triggerChange}' | 0.0.4 |
| creatorButton     | 新建一行按钮的配置                                    |                                           |                                | 0.0.4 |
| title             | 自定义列标题                                          | 获取默认插槽中的各元素上的 label 做为标题 |                                | 0.0.4 |
| copyIcon          | 自定义复制按钮，需要利用组件方法，自行实现功能        |                                           | ｛rowIndex}                    | 0.0.4 |
| addIcon           | 自定义复制按钮，需要利用组件方法，自行实现功能        |                                           |                                | 0.0.4 |
| deleteIcon        | 自定义复制按钮，需要利用组件方法，自行实现功能        |                                           | ｛rowIndex}                    | 0.0.4 |
| itemRightRegion   | 元素右侧区域 slot，保持一行，进行更多操作或文案展示等 |                                           | '{row, rowIndex, triggerChange}' | 2.5.5 |
| moreItemActionBtn | 元素更多操作按钮 slot，保持一行                       |                                           | '{row, rowIndex, triggerChange}' | 2.5.5 |

#### EFormList 方法

| 参数    | 说明                                                                   | 参数                      | 版本  |
| ------- | ---------------------------------------------------------------------- | ------------------------- | ----- |
| add     | 添加一行新数据                                                         | (initialData) => void     | 0.0.4 |
| remove  | 删除指定数据                                                           | (index) => void           | 0.0.4 |
| copy    | 复制一行数据到末尾                                                     | (index) => void           | 0.0.4 |
| move    | 移动指定行数据到提定位置                                               | (index, newIndex) => void | 0.0.4 |
| getData | 获取组件全部数据                                                       | ()=> void                 | 0.0.4 |
| setData | 手动初始化全部数据（只能手动触发，否则会产生循环依赖，目前无解决方案） | ()=> void                 | 0.0.4 |

### EFormList 事件

| 事件名称          | 说明                                            | 参数                                                               | 版本  |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------ | ----- |
| onAfterAdd        | 新增数据后的钩子                                | (defaultValue: Object, insertIndex: number, count: number) => void | 0.0.4 |
| onAfterRemove     | 删除数据后的钩子                                | (index: number, count: number) => void                             | 0.0.4 |
| onBeforeAddRow    | 新增数据前的钩子，返回 false 时，不执行后续操作 | () =>Promise                                                       | 0.0.4 |
| onBeforeRemoveRow | 删除数据前的钩子，返回 false 时，不执行后续操作 | ({index, row}) =>Promise                                           | 0.0.4 |
