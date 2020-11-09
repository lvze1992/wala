function formatTime(ts) {
  let date = new Date(ts);
  var y = date.getFullYear(),
    month = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  return `${y}/${month}/${d} ${h}:${m}:${s}`;
}
function mapValue(object, iteratee) {
  object = Object(object);
  const result = {};
  Object.keys(object).forEach(key => {
    result[key] = iteratee(object[key], key, object);
  });
  return result;
}
function getUtcTime(timestr) {
  const [date, time] = timestr.split("T");
  let list = [date, time, "GMT"];
  return +new Date(list.join(" "));
}
function maxBy(array, iteratee) {
  let result;
  if (array == null) {
    return result;
  }
  let computed;
  for (const value of array) {
    const current = iteratee(value);
    if (
      current != null &&
      (computed === undefined ? current === current : current > computed)
    ) {
      computed = current;
      result = value;
    }
  }
  return result;
}
function omit(object, iteratee) {
  object = Object(object);
  const result = {};
  Object.keys(object).forEach(key => {
    const computed = iteratee(object[key], key, object);
    if (!computed) {
      result[key] = object[key];
    }
  });
  return result;
}
function isEmpty(value) {
  if (value === null || typeof value === "undefined") {
    return true;
  }
  if (Array.isArray(value)) {
    return !value.length;
  }
  if (typeof value === "object") {
    return !Object.keys(value).length;
  }
  return true;
}
function formatPercent(value) {
  value = Number(value);
  return (value * 100).toFixed(4) + "%";
}
function formatDuration(time) {
  let hour = parseInt(time / (60 * 60 * 1000));
  time = time - hour * (60 * 60 * 1000);
  let minute = parseInt(time / (60 * 1000));
  return hour ? `${hour}h${minute}m` : `${minute}m`;
}
module.exports = {
  formatTime,
  mapValue,
  getUtcTime,
  maxBy,
  omit,
  isEmpty,
  formatPercent,
  formatDuration
};
