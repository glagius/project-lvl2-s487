import nodeTypes from './types/nodeTypes';
import { defaultRender, plainRender } from './renders';

const parseKeys = keys =>
  keys
    .map(key => {
      return typeof key === 'number' || typeof key === 'number' ? `['${key}']` : key;
    })
    .slice(1)
    .join('.');
const addKeyPath = (item, keys = []) => {
  const { type, key, value } = item;
  // if (type === 'simple') return Object.assign({}, item, { key: [...keys, key] });
  if (type === 'simple') return { ...item, key: parseKeys([...keys, key]) };
  // переделать
  // return Object.assign({}, item, {
  //   key: [...keys, key],
  //   value: value.map(el => addKeyPath(el, [...keys, key])),
  // });
  //
  return {
    ...item,
    key: parseKeys([...keys, key]),
    value: value.map(el => addKeyPath(el, [...keys, key])),
  };
};
const parseObject = (obj, depth, func) => {
  const keys = Object.keys(obj);
  return keys.map(el => func(obj, el, depth));
};
const parseArray = (arr, depth, func) => arr.map((el, index) => func(el, index, depth));
const parseItem = (item, key = '/', depth = 0) => {
  // change to lodash method
  const getValueType = value => {
    if (value === null || typeof value !== 'object') return 'simple';
    return value instanceof Array ? 'array' : 'object';
  };
  const valueTypes = {
    simple: val => val,
    object: (val, depthLvl) => parseObject(val, depthLvl, parseItem),
    array: (val, depthLvl) => parseArray(val, depthLvl, parseItem),
  };
  const indent = 2;
  const newDepth = depth + indent;
  let itemValue;

  if (key === '/') {
    itemValue = valueTypes.object(item, depth);
    const options = { value: itemValue, key, depth };
    return nodeTypes.object(options);
  }
  if (typeof key === 'number') {
    const type = getValueType(item);
    itemValue = valueTypes[type](item, newDepth);
    const options = { value: itemValue, key, depth: newDepth };
    // change logic in arrayParser
    return nodeTypes[type](options);
  }
  const type = getValueType(item[key]);
  itemValue = valueTypes[type](item[key], newDepth);
  const options = { value: itemValue, key, depth: newDepth };
  return nodeTypes[type](options);
};
const compareNodes = renderType => (oldObj, newObj) => {
  const renderMethods = {
    nested: defaultRender,
    plain: plainRender,
  };
  let oldNode;
  let newNode;
  if (renderType === 'plain') {
    oldNode = addKeyPath(oldObj);
    newNode = addKeyPath(newObj);
  }
  const getNodeByKey = (node, key) => {
    const item = node.value.find(obj => obj.key === key);
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
      const changedCurrNode = {
        ...changeNestedNodes(current, 'added'),
      };
      return [changedCurrNode];
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
    const sortedMergValues = mergedValues.map(el => el.key);
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
  return compare(oldNode || oldObj, newNode || newObj)[0];
};
export { parseItem, compareNodes };
