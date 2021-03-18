export const addOffset = (offset, style) => {
  let newStyle = {offset: offset}
  for (let key in style) {
    newStyle[key] = style[key];
  }
  return newStyle;
}