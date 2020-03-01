import { isObject } from 'lodash';

const convertValue = (val) => (isObject(val) ? '[complex-value]' : val);
const convertProperty = (prop) => (prop.includes('-') ? `['${prop}']` : prop);

const getNodeChanges = (node, parents = []) => {
  const {
    name, children, status, changes,
  } = node;
  const propPath = [...parents, convertProperty(name)].filter((el) => !!el).join('.');

  const getNodeChangesDescription = () => {
    if (status === 'unchanged') return null;
    const [firstValue, secondValue] = changes.map((el) => el.value);
    const currentValue = secondValue || firstValue;

    const changeDescription = {
      removed: () => `Property '${propPath}' was removed`,
      added: () => `Property '${propPath}' was added with value: '${convertValue(currentValue)}'`,
      changed: () => `Property '${propPath}' was updated. From '${convertValue(firstValue)}' to '${convertValue(secondValue)}'`,
    };
    return changeDescription[status]();
  };
  return children
    ? children.map((child) => getNodeChanges(child, [...parents, name])).filter((el) => !!el).join('\n')
    : getNodeChangesDescription();
};

export default (ast) => ast.reduce((acc, node) => [...acc, getNodeChanges(node)], []).filter((el) => !!el).join('\n');
