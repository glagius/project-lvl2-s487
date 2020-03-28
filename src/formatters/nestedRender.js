import isObject from 'lodash/isObject';

const addIndent = (depth = 1, status = 'unchanged') => {
  const indentSize = 4;
  const halfIndent = indentSize / 2;
  const indentType = ' ';
  const getIndent = (num) => indentType.repeat(num);
  switch (status) {
    case 'added':
      return `${getIndent((depth * indentSize) - halfIndent)}+ `;
    case 'removed':
      return `${getIndent((depth * indentSize) - halfIndent)}- `;
    default:
      return getIndent(depth * indentSize);
  }
};
const stringifyObject = (node = {}, depth = 1, status = 'unchanged') => {
  const keys = Object.keys(node);
  return keys.reduce((acc, key) => {
    if (isObject(node[key])) {
      return [
        ...acc,
        `${addIndent(depth, status)}${key}: {`,
        stringifyObject(node[key], depth + 1),
        `${addIndent(depth)}}`,
      ];
    }
    return [...acc, `${addIndent(depth, status)}${key}: ${node[key]}`];
  }, []).join('\n');
};

const stringifyAST = (ast = [], depth = 1) => ast.map((node) => {
  const {
    key, status, oldValue, newValue, children,
  } = node;
  if (children) {
    return [`${addIndent(depth, status)}${key}: {`, stringifyAST(children, depth + 1), `${addIndent(depth)}}`].join('\n');
  }
  switch (status) {
    case 'unchanged':
      return stringifyObject({ [key]: oldValue }, depth);
    case 'added':
      return stringifyObject({ [key]: newValue }, depth, status);
    case 'removed':
      return stringifyObject({ [key]: oldValue }, depth, status);
    case 'changed':
      return [stringifyObject({ [key]: oldValue }, depth, 'removed'), stringifyObject({ [key]: newValue }, depth, 'added')].join('\n');
    default:
      return new Error(`Found wrong status: ${status} !`);
  }
}).join('\n');

export default (ast) => ['{', stringifyAST(ast, 1), '}'].join('\n');
