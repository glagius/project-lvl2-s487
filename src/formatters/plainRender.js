import * as _ from 'lodash';

const convertValue = (val) => (_.isObject(val) ? '[complex-value]' : val);
const convertProperty = (prop) => (prop.includes('-') ? `['${prop}']` : prop);

const getNodeChanges = (node, parents = []) => {
  const {
    key, oldValue, newValue, status, children,
  } = node;
  const propPath = [...parents, convertProperty(key)].filter((el) => !!el).join('.');

  const getNodeChangesDescription = () => {
    if (status === 'unchanged') return null;
    const currentValue = oldValue || newValue;

    const changeDescription = {
      removed: () => `Property '${propPath}' was removed`,
      added: () => `Property '${propPath}' was added with value: '${convertValue(currentValue)}'`,
      changed: () => `Property '${propPath}' was updated. From '${convertValue(oldValue)}' to '${convertValue(newValue)}'`,
    };
    return changeDescription[status]();
  };
  return children
    ? children.map((child) => getNodeChanges(child, [...parents, key])).filter((el) => !!el).join('\n')
    : getNodeChangesDescription();
};

export default (ast) => ast.reduce((acc, node) => [...acc, getNodeChanges(node)], []).filter((el) => !!el).join('\n');
