// needed for angular-cesium
function isNumber(arg) {
  return typeof arg === "number";
}
exports.isNumber = isNumber;

// needed for url.js
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
exports.isObject = isObject;

function isString(arg) {
  return typeof arg === "string";
}
exports.isString = isString;
