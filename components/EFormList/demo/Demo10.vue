<template>
  <div>
    <a-form :model="formState" @finish="handleOnFinish">
      <a-form-item>
        <EFormList
          v-model="formState.filterInfo"
          :isShowCopyButton="false"
          :beforeRemove="beforeRemove"
        >
          <template #copyIcon></template>
          <template #default="{ row, triggerChange }">
            <a-input-group compact :class="$style.customerInputGroup">
              <a-button
                @click="
                  triggerChange({
                    operator:
                      row.operator === 1 || row.operator === undefined ? 0 : 1,
                  })
                "
              >
                <a-space :size="0">
                  <span
                    :class="[
                      row.operator !== 0
                        ? $style.flagActive
                        : $style.flagDefault,
                    ]"
                    >是</span
                  >
                  <span :class="$style.flagDefault">/</span>
                  <span
                    :class="[
                      row.operator !== 0
                        ? $style.flagDefault
                        : $style.flagActive,
                    ]"
                    >非</span
                  >
                </a-space>
              </a-button>
              <a-select
                style="width: 200px"
                :value="row.fitlerKey"
                placeholder="请选择条件"
                :options="filterOptions"
                allowClear
                @change="
                  newValue => {
                    handleOptionChange(newValue, row.fitlerKey);
                    triggerChange({ fitlerKey: newValue, conditionKeys: [] });
                  }
                "
              />
            </a-input-group>
            <a-select
              style="width: 100px"
              :value="row.logicOperator"
              placeholder="请选择标签"
              :options="logicOptions"
              allowClear
              @change="e => triggerChange({ logicOperator: e })"
            />
            <a-select
              style="width: 200px"
              :value="row.conditionKeys"
              placeholder="请选择标签"
              :options="getConditionKeyOptions(row.fitlerKey)"
              allowClear
              mode="multiple"
              @change="e => triggerChange({ conditionKeys: e })"
            />
          </template>
        </EFormList>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { reactive } from "vue";

const formState = reactive({
  filterInfo: [],
});

const filterOptions = ref([
  { value: 1, label: "选项1" },
  { value: 2, label: "选项2" },
  { value: 3, label: "选项3" },
  { value: 4, label: "选项4" },
]);
const logicOptions = ref([
  { value: "in", label: "in" },
  { value: "notin", label: "notin" },
  { value: "=", label: "=" },
  { value: "!=", label: "!=" },
]);

function getConditionKeyOptions(len) {
  return Array.from({ length: len }).map((item, index) => ({
    value: index,
    label: "label" + index,
  }));
}

function beforeRemove({ row }) {
  handleOptionChange(null, row?.fitlerKey);
  return true;
}

function handleOptionChange(newValue, oldValue) {
  if (newValue) {
    const terget = filterOptions.value.find(item => item.value === newValue);
    terget && (terget.disabled = true);
  }
  if (oldValue) {
    const terget = filterOptions.value.find(item => item.value === oldValue);
    terget && (terget.disabled = false);
  }
  return true;
}
function handleOnFinish() {
  console.log(formState.filterInfo);
}
</script>
<style lang="less" module>
.flagDefault {
  font-size: 10px;
  color: var(--e-disabled-color);
}
.flagActive {
  color: var(--e-primary-color);
}
.customerInputGroup:global(.ant-input-group-compact)::before {
  display: none;
}
</style>
