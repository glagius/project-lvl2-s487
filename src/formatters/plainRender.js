import _ from 'lodash';

const convertValue = (val) => (_.isObject(val) ? '[complex-value]' : val);
const convertProperty = (prop) => (prop.includes('-') ? `['${prop}']` : prop);

const getNodeChanges = (node, parents = []) => {
  const {
    key, oldValue, newValue, status, children,
  } = node;
  const propPath = [...parents, convertProperty(key)].filter((el) => !!el).join('.');

  const getNodeChangesDescription = () => {
    const currentValue = oldValue || newValue;
    switch (status) {
      case 'removed':
        return `Property '${propPath}' was removed`;
      case 'added':
        return `Property '${propPath}' was added with value: '${convertValue(currentValue)}'`;
      case 'changed':
        return `Property '${propPath}' was updated. From '${convertValue(oldValue)}' to '${convertValue(newValue)}'`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unexpected status: ${status}`);
    }
  };
  return children
    ? children.map((child) => getNodeChanges(child, [...parents, key])).filter((el) => !!el).join('\n')
    : getNodeChangesDescription();
};

export default (ast) => ast.reduce((acc, node) => [...acc, getNodeChanges(node)], []).filter((el) => !!el).join('\n');
