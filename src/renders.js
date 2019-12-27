const addIndent = (depth, status = 'unchanged') => {
  const indentSize = 4;
  const indentType = ' ';
  const getIndent = num => indentType.repeat(num);
  const statusSign = {
    added: `${getIndent((depth * indentSize) - (indentSize / 2))}+ `,
    removed: `${getIndent((depth * indentSize) - (indentSize / 2))}- `,
    unchanged: getIndent(depth * indentSize),
  };

  return statusSign[status];
};
const renderObject = (obj, depth, status = 'unchanged') => {
  const keys = Object.keys(obj);
  return keys.map(key => (typeof obj[key] !== 'object'
    ? [addIndent(depth, status), `${key}: `, `${obj[key]}`].filter(Boolean).join('')
    : [addIndent(depth, status), `${key}: `, '{\n', ...renderObject(obj[key], depth + 1).join('\n'), `\n${addIndent(depth)}}`].filter(Boolean).join('')));
};
const getItemChangesDescription = (changes, parents, status = 'unchanged') => {
  if (status === 'unchanged') return null;
  const convertValue = val => (typeof val === 'object' ? '[complex-value]' : val);
  const propPath = parents.join('.');
  const [firstValue, secondValue] = changes.map(el => el.value);
  const currentValue = secondValue || firstValue;

  const changeDescription = {
    removed: () => `Property '${propPath}' was removed`,
    added: () => `Property '${propPath}' was added with value: '${convertValue(currentValue)}'`,
    changed: () => `Property '${propPath}' was updated. From '${convertValue(firstValue)}' to '${convertValue(secondValue)}'`,
  };
  return changeDescription[status]();
};

const renderNestedDiff = (item, formatter, depth = 0) => {
  const {
    key, children, changes, status, value,
  } = item;
  const nodeStatus = {
    unchanged: () => (children
      ? [`${addIndent(depth, status)}${[key]}: `,
        '{\n', children.map(el => renderNestedDiff(el, formatter, depth + 1))
          .join('\n'), `\n${addIndent(depth)}}`].join('')
      : formatter({ [key]: value }, depth, status)),
    added: () => formatter({ [key]: value }, depth, status),
    removed: () => formatter({ [key]: value }, depth, status),
    changed: () => changes.map(({ value: v, status: s }) => formatter({ [key]: v }, depth, s)).join('\n'),
    root: () => ['{', ...children.map(el => renderNestedDiff(el, formatter, depth + 1)), '}'].join('\n'),
  };
  return nodeStatus[status || 'root']();
};
const renderPlainDiff = (item, formatter, parents = []) => {
  const convertProperty = prop => (prop.includes('-') ? `['${prop}']` : prop);
  const {
    key, children, changes, status,
  } = item;
  const propPath = [...parents, key && convertProperty(key)].filter(el => !!el);
  const itemChangeDescription = getItemChangesDescription(changes, propPath, status);
  return children
    ? children.map(node => renderPlainDiff(node, formatter, propPath)).filter(el => !!el).join('\n')
    : itemChangeDescription;
};

export default (obj, format) => {
  const renderFormats = {
    plain: () => renderPlainDiff(obj, getItemChangesDescription),
    nested: () => renderNestedDiff(obj, renderObject),
    json: () => JSON.parse(JSON.stringify(obj)),
  };
  return renderFormats[format](obj);
};
