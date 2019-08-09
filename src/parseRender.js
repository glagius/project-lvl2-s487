const { nodeTypes } = require('./nodeTypes');

const valueTypes = {
  simple: val => val,
  object: (val, depth) => parseObject(val, depth),
  array: (val, depth) => parseArray(val, depth),
};

const parseItem = (item, key = '/', depth = 0) => {
  const indent = 2;
  const newDepth = depth + indent;
  let value;
  // change to lodash method
  const getValueType = value => {
    if (value === null || typeof value !== 'object') return 'simple';
    return value instanceof Array ? 'array' : 'object';
  };
  if (key === '/') {
    value = valueTypes['object'](item, depth);
    return nodeTypes['object']({ value, key, depth });
  }
  if (typeof key === 'number') {
    const type = getValueType(item);
    value = valueTypes[type](item, newDepth);
    // change logic in arrayParser
    return nodeTypes[type]({ value, key, depth: newDepth });
  }
  const type = getValueType(item[key]);
  value = valueTypes[type](item[key], newDepth);
  return nodeTypes[type]({ value, key, depth: newDepth });
};
const parseObject = (obj, depth) => {
  const keys = Object.keys(obj);
  return keys.map(el => parseItem(obj, el, depth));
};
const parseArray = (arr, depth) => arr.map((el, index) => parseItem(el, index, depth));

const renderNode = coll => {
  // console.log(coll)
  return coll.toString();
};

module.exports = {
  parseItem,
  parseObject,
  parseArray,
  renderNode,
};
