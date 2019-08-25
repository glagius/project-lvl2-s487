const statusSign = {
  added: '+ ',
  removed: '- ',
};
const isNum = str => typeof str === 'number';
const defaultRender = ({ value, key, depth, status, type }) => {
  const lastKey = key[key.length - 1];
  const sign = statusSign[status] || '';
  const whiteSpace = ' ';
  const indentSign = depth > 0 ? whiteSpace.repeat(depth - 2) : whiteSpace.repeat(depth);
  const putIndent = diffSign => (diffSign ? indentSign : whiteSpace.repeat(depth));
  if (lastKey === '/') {
    const result = [`{`, ...value.map(el => defaultRender(el)), `\n}`].join('');
    return result;
  }
  if (isNum(lastKey)) {
    const rendersByType = {
      object: () =>
        [
          `\n${putIndent(sign)}${sign}{`,
          ...value.map(el => defaultRender(el)),
          `\n${putIndent(null)}}`,
        ].join(''),
      array: () => ['[\n', ...value.map(el => defaultRender(el)), `\n]`].join(''),
      simple: () => `\n${putIndent(sign)}${sign}${value}`,
    };
    return rendersByType[type]();
  }
  const rendersByType = {
    object: () =>
      [
        `\n${putIndent(sign)}${sign}${lastKey}: {`,
        ...value.map(el => defaultRender(el)),
        `\n${putIndent(null)}}`,
      ].join(''),
    array: () =>
      [
        `\n${putIndent(sign)}${sign}${lastKey}: [`,
        ...value.map(el => defaultRender(el)),
        `\n${putIndent(null)}]`,
      ].join(''),
    simple: () => `\n${putIndent(sign)}${sign}${lastKey}: ${value}`,
  };
  return rendersByType[type]();
};

const parsePath = path =>
  path
    .map(key => {
      return typeof key === 'number' || key.includes('-') === 'number'
        ? `['${key}']`
        : key;
    })
    .slice(1)
    .join('.');
const plainText = {
  added: (key, value) => `Property '${key}' was added with value: '${value}'`,
  removed: key => `Property '${key}' was removed`,
  changed: (key, ...values) => {
    const [oldValue, newValue] = values;
    return `Property '${key}' was updated. From '${oldValue}' to '${newValue}'`;
  },
};
const plainRender = config => {
  const checkedList = config.value.map((item, index) => {
    if (item.type !== 'simple') return plainRender(item);
    const key = parsePath(item.key);
    let changedNode;
    switch (item.status) {
      case 'removed':
        changedNode = config.value
          .filter((el, ind) => ind !== index)
          .find(el => parsePath(el.key) === key);
        if (changedNode && item.value !== changedNode.value)
          return plainText.changed(key, item.value, changedNode.value);
        return plainText[item.status] && plainText[item.status](key, item.value);
      case 'added':
        changedNode = config.value.find(
          el => parsePath(el.key) === key && el.status === 'removed',
        );
        if (changedNode) return null;
        return plainText[item.status] && plainText[item.status](key, item.value);
      default:
        return null;
    }
  });
  return checkedList.filter(el => el).join('\n');
};

const getJSON = config => JSON.stringify(config);

export default (node, renderType) => {
  const renderMethods = {
    nested: defaultRender,
    plain: plainRender,
    json: getJSON,
  };
  return renderMethods[renderType](node);
};
