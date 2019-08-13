const statusSign = {
  added: '+ ',
  deleted: '- ',
};
const isNum = str => typeof str === 'number';

const defaultRender = {
  object: ({ value, key, depth, status }) => {
    const sign = statusSign[status] || '';
    const whiteSpace = ' ';
    const indentSign =
      depth > 0 ? whiteSpace.repeat(depth - 2) : whiteSpace.repeat(depth);
    const putIndent = diffSign => (diffSign ? indentSign : whiteSpace.repeat(depth));
    if (isNum(key)) {
      const result = [
        `\n${putIndent(sign)}${sign}{`,
        ...value.map(el => el.toString()),
        `\n${putIndent(null)}}`,
      ].join('');
      return result;
    }
    if (key === '/') {
      const result = [`{`, ...value.map(el => el.toString()), `\n}`].join('');
      // console.log('Result root = ', result, '\nValue = ', value.map(el => el.toString()));
      return result;
    }
    // used pop() only for prettier formatter;
    const result = [
      `\n${putIndent(sign)}${sign}${key}: {`,
      ...value.map(el => el.toString()),
      `\n${putIndent(null)}}`,
    ].join('');
    // console.log('Result obj = ', result, '\nValue = ', value);
    return result;
  },
  array: ({ value, key, depth, status }) => {
    const sign = statusSign[status] || '';
    const whiteSpace = ' ';
    const indentSign = whiteSpace.repeat(depth - 2);
    const putIndent = diffSign => (diffSign ? indentSign : whiteSpace.repeat(depth));
    if (isNum(key)) {
      const result = ['[\n', ...value.map(el => el.toString()), `\n]`].join('');
      return result;
    }
    const result = [
      `\n${putIndent(sign)}${sign}${key}: [`,
      ...value.map(el => el.toString()),
      `\n${putIndent(null)}]`,
    ].join('');
    return result;
  },
  simple: ({ value, key, depth, status }) => {
    const sign = statusSign[status] || '';
    const whiteSpace = ' ';
    const indentSign = whiteSpace.repeat(depth - 2);
    const putIndent = diffSign => (diffSign ? indentSign : whiteSpace.repeat(depth));
    // console.log(
    //   'Simple result = ',
    //   isNum(key)
    //     ? `\n${putIndent(sign)}${sign}${value},`
    //     : `\n${putIndent(sign)}${sign}${key}: ${value},`,
    // );
    return isNum(key)
      ? `\n${putIndent(sign)}${sign}${value}`
      : `\n${putIndent(sign)}${sign}${key}: ${value}`;
  },
};

const plainRender = {
  object: () => {},
  array: () => {},
  simple: () => {},
};

// const plainRenderText = {};

export { defaultRender, plainRender };
