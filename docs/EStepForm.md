# Step Form-分布表单

:::preview 按钮吸底

demo-preview=../components/EStepForm/demo/Demo1.vue

:::

:::preview 详情模式

demo-preview=../components/EStepForm/demo/Demo2.vue

:::

## API

#### EStepForm 属性

兼容所有 form 的属性与方法 参考 [Ant design vue Form](https://3x.antdv.com/components/form-cn)
吸底模式的配置参考 affix 的属性 [ant design vue affix](https://3x.antdv.com/components/affix-cn#API)

| 属性名      | 说明             | 类型                                    | 默认值 | 版本  |
| ----------- | ---------------- | --------------------------------------- | ------ | ----- |
| stepStyle   | 步骤条容器的样式 | Object                                  | -      | 2.4.0 |
| attachTo    | teleport 出口    | String \| HTMLDivElement                | -      | 2.4.2 |
| affixConfig | 配置吸底模式     | '{target: Function, offsetBottom:Number}' | -      | 2.5.2 |

#### EStepForm 插槽

| 属性名      | 说明               | 版本  |
| ----------- | ------------------ | ----- |
| title       | 每一步骤的标题     | 0.0.4 |
| footer      | 定制底部按钮       | 0.0.4 |
| extraButton | 底部按钮额外内容   | 0.0.4 |

#### EStepForm 方法

| 属性名       | 说明       | 默认值 | 版本  |
| ------------ | ---------- | ------ | ----- |
| handleCancel | 取消       | -      | 0.0.4 |
| handlePrev   | 回到上一步 | -      | 0.0.4 |
| handleNext   | 跳到下一步 | -      | 0.0.4 |
| handleSubmit | 提交       | -      | 0.0.4 |

#### EStepFormItem 属性

兼容所有 form 的属性与方法 参考 [Ant design vue Form](https://3x.antdv.com/components/form-cn)

| 属性名     | 说明                           | 类型     | 默认值 | 版本  |
| ---------- | ------------------------------ | -------- | ------ | ----- |
| beforeNext | 进入下一步的钩子，支持 promise | Function | -      | 0.0.4 |
