import nodeTypes from './types/nodeTypes';

const parsePath = keys => keys
  .map(key => (typeof key === 'number' || key.includes('-') ? `['${key}']` : key))
  .slice(1)
  .join('.');
const parseObject = (obj, key, depth, func) => {
  const keys = Object.keys(obj);
  return keys.map(el => func(obj, [...key, el], depth));
};
const parseArray = (item, func) => {
  const { coll, key, depth } = item;
  return coll.map((el, index) => func(el, [...key, index], depth));
};

const getValueType = (value) => {
  if (value === null || typeof value !== 'object') return 'simple';
  return value instanceof Array ? 'array' : 'object';
};
const parseItem = (item, keyPath, depth = 0) => {
  const lastKey = keyPath ? keyPath[keyPath.length - 1] : '/';
  const valueTypes = {
    simple: element => element,
    object: (obj, objKey, depthLvl) => parseObject(obj, objKey, depthLvl, parseItem),
    array: (arr, key, depthLvl) => parseArray({
      coll: arr,
      key,
      depth: depthLvl,
    }, parseItem),
  };
  const indent = 2;
  const newDepth = depth + indent;
  let itemValue;

  if (lastKey === '/') {
    itemValue = valueTypes.object(item, [lastKey], depth);
    const options = { value: itemValue, key: [lastKey], depth };
    return nodeTypes.object(options);
  }
  if (typeof lastKey === 'number') {
    const type = getValueType(item);
    itemValue = valueTypes[type](item, [...keyPath], newDepth);
    const options = { value: itemValue, key: [...keyPath], depth: newDepth };
    return nodeTypes[type](options);
  }
  const type = getValueType(item[lastKey]);
  itemValue = valueTypes[type](item[lastKey], [...keyPath], newDepth);
  const options = { value: itemValue, key: [...keyPath], depth: newDepth };
  return nodeTypes[type](options);
};
const changeNestedNodes = (node, status) => (node.value instanceof Array
  ? {
    ...node,
    status,
    value: node.value.map(item => changeNestedNodes(item, status)),
  }
  : {
    ...node,
    status,
  });
const isEqual = (node1, node2, property) => {
  const props = {
    type: () => node1.type === node2.type,
    path: () => parsePath(node1.key) === parsePath(node2.key),
    value: () => node1.type === node2.type && node1.type === 'simple' && node1.value === node2.value,
  };
  return props[property]();
};
const compareNodes = (oldObj, newObj) => {
  const getMergedValue = (prevValue, newValue) => {
    const comparedValue = prevValue.reduce((acc, prevEl) => {
      const newEl = newValue.find(el => parsePath(el.key) === parsePath(prevEl.key));
      if (!newEl) return [...acc, changeNestedNodes(prevEl, 'removed')];
      if (!isEqual(prevEl, newEl, 'path') || !isEqual(prevEl, newEl, 'type')) {
        return [
          ...acc,
          changeNestedNodes(prevEl, 'removed'),
          changeNestedNodes(newEl, 'added'),
        ];
      }
      if (prevEl.type === 'simple') {
        return isEqual(prevEl, newEl, 'value')
          ? [...acc, prevEl]
          : [
            ...acc,
            changeNestedNodes(prevEl, 'removed'),
            changeNestedNodes(newEl, 'added'),
          ];
      }
      return [...acc, { ...prevEl, value: getMergedValue(prevEl.value, newEl.value) }];
    }, []);
    const newValRest = newValue.filter(
      el => !comparedValue.find(
        val => isEqual(el, val, 'path'),
      ),
    ).map(el => changeNestedNodes(el, 'added'));
    return [...comparedValue, ...newValRest];
  };
  return {
    ...oldObj,
    ...newObj,
    value: getMergedValue(oldObj.value, newObj.value),
  };
};
export { parsePath, parseItem, compareNodes };
