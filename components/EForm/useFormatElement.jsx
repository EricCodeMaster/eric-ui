import dayjs from "dayjs";
import _ from "lodash";

const NO_DATA = "--";

export const useFormatElement = () => {
  const formatValue = value => {
    return <span class={"j-span-white-space-warp"}>{value ?? NO_DATA}</span>;
  };

  const formatDate = (date, item) => {
    const format = item.props?.format || "YYYY-MM-DD HH:mm:ss";

    let time;
    let isValidTime = true;
    if (_.isArray(date)) {
      isValidTime = date.every(item => dayjs(item, format, true).isValid());
      time = date.map(item => dayjs(item).format(format));

      return (
        <span class={"j-span-white-space-warp"}>
          {isValidTime ? `${time[0]}-${time[1]}` : NO_DATA}
        </span>
      );
    }

    time = dayjs(date).format(format);
    isValidTime = dayjs(date, format, true).isValid();
    return (
      <span class={"j-span-white-space-warp"}>
        {isValidTime ? time : NO_DATA}
      </span>
    );
  };

  const formatSelect = (data, node) => {
    let target = {};
    if (node.props?.mode === "multiple") {
      target = node.props?.options?.filter(o => data.includes(o.value));
      return (
        <span>
          {target.length > 0
            ? target.map(item => {
                return <a-tag>{item.title || item.label || item.value}</a-tag>;
              })
            : NO_DATA}
        </span>
      );
    }
    target = node.props?.options?.find(o => o.value === data) || {};
    return (
      <span class={"j-span-white-space-warp"}>
        {target.title || target.label || data}
      </span>
    );
  };

  const formatTreeSelect = (data, node) => {
    const options = node.props && node.props["tree-data"];
    let result = [];

    const selectValue = _.isArray(data) ? data : [data];
    const findLabel = (target, value) => {
      return target.forEach(o => {
        if (value.some(v => v === o.value)) {
          result.push(o);
        }
        if (o.children) {
          return findLabel(o.children, value);
        }
      });
    };

    findLabel(options, selectValue);

    return (
      <span>
        {result.length > 0
          ? result.map(item => {
              return <a-tag>{item.title || item.label || item.value}</a-tag>;
            })
          : NO_DATA}
      </span>
    );
  };

  return {
    formatValue,
    formatDate,
    formatSelect,
    formatTreeSelect,
  };
};
