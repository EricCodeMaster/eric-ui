<template>
  <div>
    <section>
      <div>button confirm，同步onOk, 不响应click 事件</div>
      <div>
        <a-space>
          <EButton
            type="primary"
            modal-type="confirm"
            :config="syncBtnConfig"
            @click="handleClick"
          >
            btn confirm
          </EButton>
        </a-space>
      </div>
    </section>
    <section>
      <div>button confirm，异步onOk, 不响应click 事件</div>
      <div>
        <EButton type="primary" modal-type="confirm" :config="asyncBtnConfig"
          >btn confirm</EButton
        >
      </div>
    </section>
    <section>
      <div>button tooltip</div>
      <div>
        <a-space>
          <EButton
            type="primary"
            tooltip="tooltip为简单数据类型"
            @click="handleOk"
            >btn tooltip</EButton
          >
          <EButton type="primary" @click="handleOk">
            btn tooltip
            <template #tooltip>
              <span>tooltip为slot插槽</span>
            </template>
          </EButton>
        </a-space>
      </div>
    </section>
    <section>
      <div>button disabled tooltip</div>
      <div>
        <EButton
          type="primary"
          disabled
          :tooltip="{ title: '提示标题title', placement: 'right' }"
          @click="handleOk"
        >
          btn tooltip
        </EButton>
      </div>
    </section>
    <section>
      <div>button tooltip</div>
      <div>
        <EButton
          type="primary"
          :tooltip="{
            title: '提示标题title',
            placement: 'right',
            trigger: 'click',
            color: 'blue',
          }"
          @click="handleOk"
        >
          btn tooltip trigger
        </EButton>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { Modal } from "ant-design-vue";

export default defineComponent({
  name: "EButtonDocs",
  props: {},
  setup() {
    const formState = reactive({
      name: "",
    });
    const formRef = ref();
    const handleOnFinish = () => {
      formRef.value.validate();
    };

    const asyncBtnConfig = reactive({
      title: "标题",
      content: "内容-异步onOk",
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.5) {
              window.alert("resolve 异步onOk");
              return resolve();
            }
            window.alert("异步onOk, reject后不会关闭弹窗");
            return reject();
          }, 2000);
        });
      },
    });
    const syncBtnConfig = reactive({
      title: "标题",
      content: "内容-同步onOk",
      onOk: () => {
        // window.alert("resolve 同步onOk");
        console.log("111-----------------------");
      },
      onCancel: () => {
        console.log("-----------------------");
      },
    });
    const handleOk = () => {
      console.log("handleOk");
    };
    const handleCancel = () => {
      console.log("handleCancel");
    };

    const handleClick = () => {
      alert("clicked");
    };

    return {
      formRef,
      formState,
      handleOnFinish,
      handleClick,
      asyncBtnConfig,
      syncBtnConfig,
      handleOk,
      handleCancel,
    };
  },
});
</script>
