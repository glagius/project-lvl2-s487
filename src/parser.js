import nodeTypes from './types/nodeTypes';
import { defaultRender, plainRender } from './renders';

const parseObject = (obj, key, depth, func) => {
  const keys = Object.keys(obj);
  return keys.map(el => func(obj, [...key, el], depth));
};
const parseArray = (arr, key, depth, func) =>
  arr.map((el, index) => func(el, [...key, index], depth));

const parseItem = (item, keyPath, depth = 0) => {
  const lastKey = keyPath ? keyPath[keyPath.length - 1] : '/';
  // change to lodash method
  const getValueType = value => {
    if (value === null || typeof value !== 'object') return 'simple';
    return value instanceof Array ? 'array' : 'object';
  };
  const valueTypes = {
    simple: element => element,
    object: (obj, objKey, depthLvl) => parseObject(obj, objKey, depthLvl, parseItem),
    array: (arr, arrKey, depthLvl) => parseArray(arr, arrKey, depthLvl, parseItem),
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
const compareNodes = renderType => (oldObj, newObj) => {
  const renderMethods = {
    nested: defaultRender,
    plain: plainRender,
  };
  const getNodeByKey = (node, key) => {
    const item = node.value.find(obj => obj.key.join('.') === key);
    return item && { ...item, ...renderMethods[renderType][item.type] };
  };
  const changeNestedNodes = (node, status) => {
    return node.value instanceof Array
      ? {
          ...node,
          status,
          value: node.value.map(item => changeNestedNodes(item, status)),
          ...renderMethods[renderType][node.type],
        }
      : { ...node, status, ...renderMethods[renderType][node.type] };
  };
  const compare = (previous, current) => {
    if (!previous) {
      return [
        {
          ...changeNestedNodes(current, 'added'),
        },
      ];
    }
    if (!current) {
      return [{ ...changeNestedNodes(previous, 'removed') }];
    }
    const { value: oldValue, type: oldType } = previous;
    const { value: newValue, type: newType } = current;
    // works when keys are equal
    const typesEqual = oldType === newType;
    const valuesEqual = oldValue === newValue;

    if (!typesEqual) {
      const changedPrev = {
        ...previous,
        status: 'removed',
      };
      const newCurr = {
        ...current,
        status: 'added',
      };
      return [changedPrev, newCurr];
    }
    if (typesEqual && newType === 'simple') {
      const changedPrev = { ...changeNestedNodes(previous, 'removed') };
      const changedCurrent = { ...changeNestedNodes(current, 'added') };
      const result = valuesEqual ? [current] : [changedPrev, changedCurrent];
      return result;
    }

    const mergedValues = [...oldValue, ...newValue];
    const sortedMergValues = mergedValues.map(el => el.key).map(key => key.join('.'));
    let values = mergedValues;

    if (sortedMergValues.length > 1) {
      values = new Set(sortedMergValues);
    }

    const checkedNode = [...values].reduce((acc, key) => {
      const previousNode = getNodeByKey(previous, key);
      const currentNode = getNodeByKey(current, key);
      return [...acc, ...compare(previousNode, currentNode)];
    }, []);
    const newCurr = {
      ...current,
      value: checkedNode,
      ...renderMethods[renderType][current.type],
    };
    return [nodeTypes[newType](newCurr)];
  };
  return compare(oldObj, newObj)[0];
};
export { parseItem, compareNodes };
