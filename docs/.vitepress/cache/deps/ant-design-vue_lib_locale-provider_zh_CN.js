import {
  require_typeof
} from "./chunk-D26ZM3O5.js";
import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// node_modules/@babel/runtime/helpers/interopRequireDefault.js
var require_interopRequireDefault = __commonJS({
  "node_modules/@babel/runtime/helpers/interopRequireDefault.js"(exports, module) {
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : {
        "default": e
      };
    }
    module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/ant-design-vue/lib/vc-pagination/locale/zh_CN.js
var require_zh_CN = __commonJS({
  "node_modules/ant-design-vue/lib/vc-pagination/locale/zh_CN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = {
      // Options.jsx
      items_per_page: "条/页",
      jump_to: "跳至",
      jump_to_confirm: "确定",
      page: "页",
      // Pagination.jsx
      prev_page: "上一页",
      next_page: "下一页",
      prev_5: "向前 5 页",
      next_5: "向后 5 页",
      prev_3: "向前 3 页",
      next_3: "向后 3 页"
    };
    exports.default = _default;
  }
});

// node_modules/@babel/runtime/helpers/toPrimitive.js
var require_toPrimitive = __commonJS({
  "node_modules/@babel/runtime/helpers/toPrimitive.js"(exports, module) {
    var _typeof = require_typeof()["default"];
    function toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/toPropertyKey.js
var require_toPropertyKey = __commonJS({
  "node_modules/@babel/runtime/helpers/toPropertyKey.js"(exports, module) {
    var _typeof = require_typeof()["default"];
    var toPrimitive = require_toPrimitive();
    function toPropertyKey(t) {
      var i = toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/defineProperty.js
var require_defineProperty = __commonJS({
  "node_modules/@babel/runtime/helpers/defineProperty.js"(exports, module) {
    var toPropertyKey = require_toPropertyKey();
    function _defineProperty(e, r, t) {
      return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: true,
        configurable: true,
        writable: true
      }) : e[r] = t, e;
    }
    module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/objectSpread2.js
var require_objectSpread2 = __commonJS({
  "node_modules/@babel/runtime/helpers/objectSpread2.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread2(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/ant-design-vue/lib/vc-picker/locale/zh_CN.js
var require_zh_CN2 = __commonJS({
  "node_modules/ant-design-vue/lib/vc-picker/locale/zh_CN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var locale = {
      locale: "zh_CN",
      today: "今天",
      now: "此刻",
      backToToday: "返回今天",
      ok: "确定",
      timeSelect: "选择时间",
      dateSelect: "选择日期",
      weekSelect: "选择周",
      clear: "清除",
      month: "月",
      year: "年",
      previousMonth: "上个月 (翻页上键)",
      nextMonth: "下个月 (翻页下键)",
      monthSelect: "选择月份",
      yearSelect: "选择年份",
      decadeSelect: "选择年代",
      yearFormat: "YYYY年",
      dayFormat: "D日",
      dateFormat: "YYYY年M月D日",
      dateTimeFormat: "YYYY年M月D日 HH时mm分ss秒",
      previousYear: "上一年 (Control键加左方向键)",
      nextYear: "下一年 (Control键加右方向键)",
      previousDecade: "上一年代",
      nextDecade: "下一年代",
      previousCentury: "上一世纪",
      nextCentury: "下一世纪"
    };
    var _default = locale;
    exports.default = _default;
  }
});

// node_modules/ant-design-vue/lib/time-picker/locale/zh_CN.js
var require_zh_CN3 = __commonJS({
  "node_modules/ant-design-vue/lib/time-picker/locale/zh_CN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var locale = {
      placeholder: "请选择时间",
      rangePlaceholder: ["开始时间", "结束时间"]
    };
    var _default = locale;
    exports.default = _default;
  }
});

// node_modules/ant-design-vue/lib/date-picker/locale/zh_CN.js
var require_zh_CN4 = __commonJS({
  "node_modules/ant-design-vue/lib/date-picker/locale/zh_CN.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _objectSpread2 = _interopRequireDefault(require_objectSpread2());
    var _zh_CN = _interopRequireDefault(require_zh_CN2());
    var _zh_CN2 = _interopRequireDefault(require_zh_CN3());
    var locale = {
      lang: (0, _objectSpread2.default)({
        placeholder: "请选择日期",
        yearPlaceholder: "请选择年份",
        quarterPlaceholder: "请选择季度",
        monthPlaceholder: "请选择月份",
        weekPlaceholder: "请选择周",
        rangePlaceholder: ["开始日期", "结束日期"],
        rangeYearPlaceholder: ["开始年份", "结束年份"],
        rangeMonthPlaceholder: ["开始月份", "结束月份"],
        rangeQuarterPlaceholder: ["开始季度", "结束季度"],
        rangeWeekPlaceholder: ["开始周", "结束周"]
      }, _zh_CN.default),
      timePickerLocale: (0, _objectSpread2.default)({}, _zh_CN2.default)
    };
    locale.lang.ok = "确定";
    var _default = locale;
    exports.default = _default;
  }
});

// node_modules/ant-design-vue/lib/calendar/locale/zh_CN.js
var require_zh_CN5 = __commonJS({
  "node_modules/ant-design-vue/lib/calendar/locale/zh_CN.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _zh_CN = _interopRequireDefault(require_zh_CN4());
    var _default = _zh_CN.default;
    exports.default = _default;
  }
});

// node_modules/ant-design-vue/lib/locale/zh_CN.js
var require_zh_CN6 = __commonJS({
  "node_modules/ant-design-vue/lib/locale/zh_CN.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _zh_CN = _interopRequireDefault(require_zh_CN());
    var _zh_CN2 = _interopRequireDefault(require_zh_CN4());
    var _zh_CN3 = _interopRequireDefault(require_zh_CN3());
    var _zh_CN4 = _interopRequireDefault(require_zh_CN5());
    var typeTemplate = "${label}不是一个有效的${type}";
    var localeValues = {
      locale: "zh-cn",
      Pagination: _zh_CN.default,
      DatePicker: _zh_CN2.default,
      TimePicker: _zh_CN3.default,
      Calendar: _zh_CN4.default,
      // locales for all components
      global: {
        placeholder: "请选择"
      },
      Table: {
        filterTitle: "筛选",
        filterConfirm: "确定",
        filterReset: "重置",
        filterEmptyText: "无筛选项",
        filterCheckall: "全选",
        filterSearchPlaceholder: "在筛选项中搜索",
        selectAll: "全选当页",
        selectInvert: "反选当页",
        selectNone: "清空所有",
        selectionAll: "全选所有",
        sortTitle: "排序",
        expand: "展开行",
        collapse: "关闭行",
        triggerDesc: "点击降序",
        triggerAsc: "点击升序",
        cancelSort: "取消排序"
      },
      Modal: {
        okText: "确定",
        cancelText: "取消",
        justOkText: "知道了"
      },
      Popconfirm: {
        cancelText: "取消",
        okText: "确定"
      },
      Transfer: {
        searchPlaceholder: "请输入搜索内容",
        itemUnit: "项",
        itemsUnit: "项",
        remove: "删除",
        selectCurrent: "全选当页",
        removeCurrent: "删除当页",
        selectAll: "全选所有",
        removeAll: "删除全部",
        selectInvert: "反选当页"
      },
      Upload: {
        uploading: "文件上传中",
        removeFile: "删除文件",
        uploadError: "上传错误",
        previewFile: "预览文件",
        downloadFile: "下载文件"
      },
      Empty: {
        description: "暂无数据"
      },
      Icon: {
        icon: "图标"
      },
      Text: {
        edit: "编辑",
        copy: "复制",
        copied: "复制成功",
        expand: "展开"
      },
      PageHeader: {
        back: "返回"
      },
      Form: {
        optional: "（可选）",
        defaultValidateMessages: {
          default: "字段验证错误${label}",
          required: "请输入${label}",
          enum: "${label}必须是其中一个[${enum}]",
          whitespace: "${label}不能为空字符",
          date: {
            format: "${label}日期格式无效",
            parse: "${label}不能转换为日期",
            invalid: "${label}是一个无效日期"
          },
          types: {
            string: typeTemplate,
            method: typeTemplate,
            array: typeTemplate,
            object: typeTemplate,
            number: typeTemplate,
            date: typeTemplate,
            boolean: typeTemplate,
            integer: typeTemplate,
            float: typeTemplate,
            regexp: typeTemplate,
            email: typeTemplate,
            url: typeTemplate,
            hex: typeTemplate
          },
          string: {
            len: "${label}须为${len}个字符",
            min: "${label}最少${min}个字符",
            max: "${label}最多${max}个字符",
            range: "${label}须在${min}-${max}字符之间"
          },
          number: {
            len: "${label}必须等于${len}",
            min: "${label}最小值为${min}",
            max: "${label}最大值为${max}",
            range: "${label}须在${min}-${max}之间"
          },
          array: {
            len: "须为${len}个${label}",
            min: "最少${min}个${label}",
            max: "最多${max}个${label}",
            range: "${label}数量须在${min}-${max}之间"
          },
          pattern: {
            mismatch: "${label}与模式不匹配${pattern}"
          }
        }
      },
      Image: {
        preview: "预览"
      }
    };
    var _default = localeValues;
    exports.default = _default;
  }
});

// node_modules/ant-design-vue/lib/locale-provider/zh_CN.js
var require_zh_CN7 = __commonJS({
  "node_modules/ant-design-vue/lib/locale-provider/zh_CN.js"(exports) {
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _zh_CN = _interopRequireDefault(require_zh_CN6());
    var _default = _zh_CN.default;
    exports.default = _default;
  }
});
export default require_zh_CN7();
//# sourceMappingURL=ant-design-vue_lib_locale-provider_zh_CN.js.map
