const renderNestedDiff = (object, depth) => {
  const indentSize = 4;
  const indentType = ' ';
  const getIndent = num => indentType.repeat(num);
  const keys = Object.keys(object);

  const renderItem = (key, value, status) => {
    const statusSign = {
      added: `${getIndent((depth * indentSize) - (indentSize / 2))}+ `,
      removed: `${getIndent((depth * indentSize) - (indentSize / 2))}- `,
      unchanged: getIndent(depth * indentSize),
    };
    const currentIndent = statusSign[status || 'unchanged'];
    if (typeof value !== 'object') {
      return [currentIndent, `${key}: `, `${value}`].filter(Boolean).join('');
    }
    if (Array.isArray(value)) {
      return value.map(el => renderItem(key, el.value, el.status)).join('\n');
    }
    return [currentIndent, `${key}: `, '{\n', renderNestedDiff(value, depth + 1), `\n${currentIndent}}`].filter(Boolean).join('');
  };

  const items = keys.reduce((acc, key) => [
    ...acc,
    renderItem(key, object[key], object[key].status),
  ], []).join('\n');
  return depth === 1 ? ['{\n', items, '\n}'].join('') : items;
};

export default (obj, format) => {
  const renderFormats = {
    plain: () => { },
    nested: () => renderNestedDiff(obj, 1),
    json: () => { },
  };
  return renderFormats[format](obj);
};
