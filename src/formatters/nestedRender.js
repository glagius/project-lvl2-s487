import * as _ from 'lodash';

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
const valueToString = ({ key, value, status = 'unchanged' }, depthLevel) => {
  const keys = _.isObject(value) ? _.keys(value) : null;
  if (_.isObject(value)) {
    return [
      addIndent(depthLevel, status),
      `${key}: `,
      '{\n',
      keys.map((valueKey) => valueToString({ key: valueKey, value: value[valueKey] }, depthLevel + 1)).join('\n'),
      `\n${addIndent(depthLevel)}}`].join('');
  }
  return [addIndent(depthLevel, status), `${key}: `, `${value}`].join('');
};
const getNodeChanges = (node, parents = []) => {
  const depthStep = 1;
  const depth = parents.length + depthStep;
  const {
    key, oldValue, newValue, status, children,
  } = node;

  const nodeToString = () => {
    const value = oldValue || newValue;
    const type = _.isObject(value) ? 'object' : 'string';
    const stringTypes = {
      string: () => valueToString({ key, value, status }, depth),
      object: () => [addIndent(depth, status), `${key}: `, '{\n', ...children.map((child) => getNodeChanges(child, [...parents, child.parent])).join('\n'), `\n${addIndent(depth)}}`].join(''),
    };
    return stringTypes[type]();
  };
  if (status === 'changed') {
    return [
      { value: oldValue, change: 'removed' },
      { value: newValue, change: 'added' },
    ].map(({ value, change }) => valueToString({ key, value, status: change }, depth)).join('\n');
  }
  return nodeToString();
};

export default (ast) => ['{', ast.reduce((acc, node) => [...acc, getNodeChanges(node)], []).join('\n'), '}'].join('\n');
