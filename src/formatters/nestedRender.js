import { isObject } from 'lodash';

const addIndent = (depth, status = 'unchanged') => {
  const indentSize = 4;
  const indentType = ' ';
  const getIndent = (num) => indentType.repeat(num);
  const statusSign = {
    added: `${getIndent((depth * indentSize) - (indentSize / 2))}+ `,
    removed: `${getIndent((depth * indentSize) - (indentSize / 2))}- `,
    unchanged: getIndent(depth * indentSize),
    changed: getIndent(depth * indentSize),
  };
  return statusSign[status];
};
const valueToString = ({ name, value }, depthLevel, status = 'changed') => {
  const keys = isObject(value) ? Object.keys(value) : null;
  if (keys) {
    return [
      addIndent(depthLevel, status),
      `${name}: `,
      '{\n',
      keys.map((key) => valueToString({ name: key, value: value[key] }, depthLevel + 1)).join('\n'),
      `\n${addIndent(depthLevel)}}`].join('');
  }
  return [addIndent(depthLevel, status), `${name}: `, `${value}`].join('');
};
const getNodeChanges = (node, parents = []) => {
  const depthStep = 1;
  const depth = parents.length + depthStep;
  const {
    name, value, children, status, changes,
  } = node;

  const nodeToString = () => {
    const type = isObject(value) ? 'object' : 'string';
    const stringTypes = {
      string: () => [addIndent(depth, status), `${name}: `, `${value}`],
      object: () => [addIndent(depth, status), `${name}: `, '{\n', ...children.map((child) => getNodeChanges(child, [...parents, child.parent])).join('\n'), `\n${addIndent(depth)}}`],
    };
    return stringTypes[type]().join('');
  };
  if (status === 'changed') {
    return changes.reduce((acc, modification) => {
      const { value: modificationValue, status: modificationStatus } = modification;
      return [
        ...acc,
        valueToString({ name, value: modificationValue }, depth, modificationStatus),
      ];
    }, []).join('\n');
  }
  return nodeToString();
};

export default (ast) => ['{', ast.reduce((acc, node) => [...acc, getNodeChanges(node)], []).join('\n'), '}'].join('\n');
