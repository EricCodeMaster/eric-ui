# Switch Button

:::preview Switch Button || 继承ant design switch 能力
 
demo-preview=../components/ESwitchButton/Demo.vue
 
:::

## API

### ESwitchButton 属性

兼容大部分 Switch 的属性与方法 参考 [Ant design vue switch](https://next.antdv.com/components/switch-cn)

| 属性名            | 说明             | 类型                           | 默认值 | 版本  |
| ----------------- | ---------------- | ------------------------------ | ------ | ----- |
| value(v-model)    | 指定当前选中的值 | checkedValue \| unCheckedValue | -      | 0.0.4 |
| checkedChildren   | 选中时的内容     | String                         | 是     | 0.0.4 |
| checkedValue      | 选中时的值       | boolean \| string \| number    | 1      | 0.0.4 |
| disabled          | 是否禁用         | boolean                        | false  | 0.0.4 |
| readonly          | 是否只读         | boolean                        | false  | 0.0.4 |
| unCheckedChildren | 非选中时的内容   | String                         | 非     | 0.0.4 |
| unCheckedValue    | 非选中时的值     | boolean \| string \| number    | 0      | 0.0.4 |

### ESwitchButton 事件

| 事件名称 | 说明           | 回调参数                                                       | 版本  |
| -------- | -------------- | -------------------------------------------------------------- | ----- |
| change   | 变化时回调函数 | `Function(checked: boolean \| string \| number, event: Event)` | 0.0.4 |
