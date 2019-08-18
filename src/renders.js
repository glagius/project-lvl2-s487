const statusSign = {
  added: '+ ',
  removed: '- ',
};
const isNum = str => typeof str === 'number';
const defaultRender = {
  object: {
    toString({ value, key, depth, status }) {
      const sign = statusSign[status] || '';
      const whiteSpace = ' ';
      const indentSign =
        depth > 0 ? whiteSpace.repeat(depth - 2) : whiteSpace.repeat(depth);
      const putIndent = diffSign => (diffSign ? indentSign : whiteSpace.repeat(depth));
      if (isNum(key)) {
        const result = [
          `\n${putIndent(sign)}${sign}{`,
          ...value.map(el => el.toString(el)),
          `\n${putIndent(null)}}`,
        ].join('');
        return result;
      }
      if (key === '/') {
        const result = [`{`, ...value.map(el => el.toString(el)), `\n}`].join('');
        // console.log('Result root = ', result, '\nValue = ', value.map(el => el.toString()));
        return result;
      }
      // used pop() only for prettier formatter;
      const result = [
        `\n${putIndent(sign)}${sign}${key}: {`,
        ...value.map(el => el.toString(el)),
        `\n${putIndent(null)}}`,
      ].join('');
      // console.log('Result obj = ', result, '\nValue = ', value);
      return result;
    },
  },
  array: {
    toString({ value, key, depth, status }) {
      const sign = statusSign[status] || '';
      const whiteSpace = ' ';
      const indentSign = whiteSpace.repeat(depth - 2);
      const putIndent = diffSign => (diffSign ? indentSign : whiteSpace.repeat(depth));
      if (isNum(key)) {
        const result = ['[\n', ...value.map(el => el.toString(el)), `\n]`].join('');
        return result;
      }
      const result = [
        `\n${putIndent(sign)}${sign}${key}: [`,
        ...value.map(el => el.toString(el)),
        `\n${putIndent(null)}]`,
      ].join('');
      return result;
    },
  },
  simple: {
    toString({ value, key, depth, status }) {
      const sign = statusSign[status] || '';
      const whiteSpace = ' ';
      const indentSign = whiteSpace.repeat(depth - 2);
      const putIndent = diffSign => (diffSign ? indentSign : whiteSpace.repeat(depth));
      return isNum(key)
        ? `\n${putIndent(sign)}${sign}${value}`
        : `\n${putIndent(sign)}${sign}${key}: ${value}`;
    },
  },
};

const plainText = {
  added: (key, value) => `Property '${key}' was added with value: '${value}'`,
  removed: key => `Property '${key}' was removed`,
  changed: (key, ...values) => {
    const [oldValue, newValue] = values;
    return `Property '${key}' was updated. From '${oldValue}' to '${newValue}'`;
  },
};
const checkList = list => {
  const checkedList = list.map((item, index) => {
    if (item.type !== 'simple') return item.toString(item);
    // console.log('Item = ', item);
    let changedNode;
    switch (item.status) {
      case 'removed':
        changedNode = list
          .filter((el, ind) => ind !== index)
          .find(el => el.key === item.key);
        if (changedNode && item.value !== changedNode.value)
          return plainText['changed'](item.key, item.value, changedNode.value);
        return plainText[item.status] && plainText[item.status](item.key, item.value);
      case 'added':
        changedNode = list.find(el => el.key === item.key && el.status === 'removed');
        if (changedNode) return null;
        return plainText[item.status] && plainText[item.status](item.key, item.value);
      default:
        return null;
    }
  });
  return checkedList.filter(el => el).join('\n');
};
const plainRender = {
  object: {
    toString({ value }) {
      return checkList(value);
    },
  },
  array: {
    toString({ value }) {
      return checkList(value);
    },
  },
  simple: {
    toString() {
      return new Error('Called toString on "simple" node');
    },
  },
};

export { defaultRender, plainRender };
