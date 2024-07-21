/**
 * @param refModel 表示缓存记录的数据模型，是一个ref对象
 * @param options 表示缓存记录的配置
 * @returns initLocalData 历史缓存，用于自定义时机回填表单
 * @returns onOk 自定义时机回填表单调用此方法
 * @returns submit 提交表单调用此方法，用于提交成功清楚历史缓存
 */

/*
    const formState = ref({
      username: '',
      password: '',
    });

    const {
      initLocalData,
      onOk,
      submit: submitMethod,
    } = useFormCache(formState, {
      userName: xxx,
      id: xxx,
      formRequest: async () => {
        const res = await metaTagStore.getList();
        formState.value.username = 'xxx';
        return res;
      },
      submitRequest: metaTagStore.getList,
    });
*/
import { isRef, ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import _ from "lodash";
import { Modal } from "ant-design-vue";

const DEFAULT_OPTIONS = {
  enableCache: false,
  userName: null, // 用户id
  id: null, // form id
  isEdit: false,
  isCustomTip: false, // 为true时使用自定义组件提示表单缓存
  formRequest: () => {}, // 返回值应为true/false
  submitRequest: () => {}, // 返回值应为true/false
  modalTitle: "是否使用缓存数据?",
};
export default (refModel = ref({}), options = DEFAULT_OPTIONS) => {
  const assignedOptions = _.assign({}, DEFAULT_OPTIONS, options);

  if (!assignedOptions.enableCache) {
    return;
  }

  const LocalStorage = Object.getOwnPropertyDescriptor(window, "localStorage")
    ? window.localStorage
    : null;

  const uniqKey = `${assignedOptions.userName}_${assignedOptions.id}`;
  const model = refModel;
  const cache = ref(false);

  // 初始本地缓存数据
  let initLocalData = ref(null);

  const isEqualState = computed(() => {
    return _.isEqual(model.value, initLocalData.value);
  });

  if (!isRef(model)) {
    alert("useLocalCache 的第一个参数为ref对象");
  }

  /**
   * 清空缓存记录
   */
  const clear = () => {
    try {
      LocalStorage.removeItem(uniqKey);
      initLocalData.value = null;
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 获取缓存记录
   * @returns {any|null}
   */
  function GetLocalStorageData() {
    try {
      return JSON.parse(LocalStorage.getItem(uniqKey));
    } catch (e) {
      console.error(e);
    }

    return null;
  }

  /**
   * 返回获取的缓存记录
   * @returns {{}|*}
   */
  const get = () => {
    return GetLocalStorageData();
  };

  const changeCacheStatus = (bol = false) => {
    cache.value = bol;
  };

  /**
   * 添加缓存记录
   * @param val
   */
  const set = (val = model) => {
    const value = _.get(val, "value");

    try {
      LocalStorage.setItem(uniqKey, JSON.stringify(_.cloneDeep(value)));
    } catch (e) {
      console.error(e);
    }
  };
  const debouncedSet = _.debounce(set, 300);

  watch(
    model,
    () => {
      if (cache.value) {
        debouncedSet();
      }
    },
    { immediate: true, deep: true }
  );

  onMounted(async () => {
    initLocalData.value = GetLocalStorageData();
    if (assignedOptions.isEdit) {
      await assignedOptions.formRequest();
    }
    if (!isEqualState.value) {
      showConfirm();
    }
    changeCacheStatus(true);
  });

  async function showConfirm() {
    if (
      assignedOptions.isCustomTip ||
      !initLocalData.value ||
      isEqualState.value
    ) {
      return;
    }
    Modal.confirm({
      title: assignedOptions.modalTitle,
      onOk,
    });
  }

  const submit = async params => {
    const res = await assignedOptions.submitRequest(params);
    if (res) {
      clear();
    }
  };

  function onOk() {
    model.value = _.cloneDeep(initLocalData.value);
    initLocalData.value = null;
  }

  const handleBeforeUnload = event => {
    event.returnValue = "你确定要离开这个页面吗？";
  };
  window.addEventListener("beforeunload", handleBeforeUnload);

  onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  });

  return {
    get,
    set,
    clear,
    initLocalData,
    onOk,
    submit,
  };
};
