import nodeTypes from './types/nodeTypes';
import { defaultRender } from './renders';

// const addKeyPath = (item, keys = []) => {
//   const { type, key, value } = item;
//   // if (type === 'simple') return Object.assign({}, item, { key: [...keys, key] });
//   if (type === 'simple') return { ...item, key: [...keys, key] };
//   // переделать
//   // return Object.assign({}, item, {
//   //   key: [...keys, key],
//   //   value: value.map(el => addKeyPath(el, [...keys, key])),
//   // });
//   //
//   return {
//     ...item,
//     key: [...keys, key],
//     value: value.map(el => addKeyPath(el, [...keys, key])),
//   };
// };
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
    return nodeTypes.object(options, {
      toString() {
        return defaultRender.object(this);
      },
    });
  }
  if (typeof key === 'number') {
    const type = getValueType(item);
    itemValue = valueTypes[type](item, newDepth);
    const options = { value: itemValue, key, depth: newDepth };
    // change logic in arrayParser
    return nodeTypes[type](options, {
      toString() {
        return defaultRender[type](this);
      },
    });
  }
  const type = getValueType(item[key]);
  itemValue = valueTypes[type](item[key], newDepth);
  const options = { value: itemValue, key, depth: newDepth };
  return nodeTypes[type](options, {
    toString() {
      return defaultRender[type](this);
    },
  });
};

const compareNodes = (oldObj, newObj) => {
  const getNodeByKey = (node, key) => {
    const item = node.value.find(obj => obj.key === key);
    return item;
  };
  const changeNestedNodes = (node, options) =>
    node.value instanceof Array
      ? { ...node, ...options, value: node.value.map(item => changeNestedNodes(item)) }
      : { ...node, ...options };
  const compare = (old, current) => {
    // add function for adding new status for all nested nodes;
    if (!old) {
      const newCurrNode = { ...changeNestedNodes(current, { status: 'added' }) };
      return [newCurrNode];
    }
    if (!current) {
      return [{ ...changeNestedNodes(old, { status: 'deleted' }) }];
    }
    const { value: oldValue, type: oldType } = old;
    const { value: newValue, type: newType } = current;
    // works when keys are equal
    const typesEqual = oldType === newType;
    const valuesEqual = oldValue === newValue;

    if (!typesEqual) {
      const newPrev = { ...old, status: 'deleted' };
      const newCurr = { ...current, status: 'added' };
      return [newPrev, newCurr];
    }
    if (typesEqual && newType === 'simple') {
      const newPrev = { ...changeNestedNodes(old, { status: 'deleted' }) };
      const newCurrent = { ...changeNestedNodes(current, { status: 'added' }) };
      const result = valuesEqual ? [current] : [newPrev, newCurrent];
      return result;
    }

    const mergedValues = [...oldValue, ...newValue];
    const sortedMergValues = mergedValues.map(el => el.key);
    let values = mergedValues;

    if (sortedMergValues.length > 1) {
      values = new Set(sortedMergValues);
    }

    const checkedNode = [...values].reduce((acc, key) => {
      const oldNode = getNodeByKey(old, key);
      const currentNode = getNodeByKey(current, key);
      return [...acc, ...compare(oldNode, currentNode)];
    }, []);
    const newCurr = { ...current, value: checkedNode };
    return [
      nodeTypes[newType](newCurr, {
        toString() {
          return defaultRender[newType](this);
        },
      }),
    ];
  };
  return compare(oldObj, newObj)[0];
};

export { parseItem, compareNodes };
