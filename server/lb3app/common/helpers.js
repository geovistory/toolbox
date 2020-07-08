/**
 * Converts a loopback model instance to a plain object
 * having only the properties allowed by schema (excluding hidden fields).
 * Undefined properties are converted to null.
 */
exports.toObject = function (item) {

  // if this has no constructor, we assume it is already a plain object
  if(!item.constructor || !item.constructor.definition) return item;

  const props = item.constructor.definition.properties;
  const object = {}
  Object.keys(props)
    .forEach(key => {
      if (!props[key].hidden ) {
        object[key] = item[key] !== undefined ? item[key] : null;
      }
    });
  return object
}
