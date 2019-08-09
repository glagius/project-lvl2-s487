// import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import JSONfile from './types/jsonType';
import YMLfile from './types/yamlType';
import INIfile from './types/iniType';

const getCurrentPath = filename =>
  path.isAbsolute(filename) ? filename : path.resolve(__dirname, filename);

const getFileType = filepath => {
  const type = path.extname(filepath) ? path.extname(filepath).slice(1) : false;
  const classesByType = {
    json: () => new JSONfile(filepath),
    yml: () => new YMLfile(filepath),
    ini: () => new INIfile(filepath),
  };
  return classesByType[type]();
};
const renderNode = item => {
  return item.toString();
};
const isNum = str => typeof str === 'number';

const addKeyPath = (item, keys = []) => {
  const { type, key, value } = item;
  if (type === 'simple') return Object.assign({}, item, { key: [...keys, key] });
  // if (type === 'simple') return ({...item, key: [...keys, key] });
  // переделать
  return Object.assign({}, item, {
    key: [...keys, key],
    value: value.map(el => addKeyPath(el, [...keys, key])),
  });
  //
  // return ({...item, key: [...keys, key], value: value.map(el => addKeyPath(el, [...keys, key])) });
};
// parse and render
const parseItem = (item, key = '/', depth = 0) => {
  const newDepth = depth + 2;
  // change to lodash method
  const getValueType = value => {
    if (value === null || typeof value !== 'object') return 'primitive';
    return value instanceof Array ? 'array' : 'object';
  };
  const nodeTypes = {
    primitive: (val, key) => new PrimitiveNode(val, key, depth),
    object: (val, key) => new ObjectNode(parseObject(val, newDepth), key, depth),
    array: (val, key) => new ArrayNode(parseArray(val, newDepth), key, depth),
  };
  if (key === '/') {
    return nodeTypes['object'](item, key, depth);
  }
  if (typeof key === 'number') {
    const type = getValueType(item);
    return nodeTypes[type](item);
  }
  const type = getValueType(item[key]);
  return nodeTypes[type](item[key], key);
};

const parseObject = (obj, depth) => {
  const keys = Object.keys(obj);
  return keys.map(el => parseItem(obj, el, depth));
};
const parseArray = (arr, depth) => arr.map((el, index) => parseItem(el, index, depth));

// finish ?
const compareNodes = (oldObj, newObj) => {
  const getNodeByKey = (node, key) => {
    const { type } = node;
    const item = node.value.find(item => item.key === key);
    return item;
  };
  const compare = (old, current) => {
    if (!old) {
      const newCurrNode = { ...current, status: 'added' };
      return [newCurrNode];
    }
    if (!current) {
      return [old];
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
      const newPrev = { ...old, status: 'deleted' };
      const newCurrent = { ...current, status: 'added' };
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
    return [nodeTypes[newType](newCurr)];
  };
  return compare(oldObj, newObj)[0];
};

const renderDiff = (filepath1, filepath2) => {
  const compareResults = [];
  const firstConfig = getFileType(getCurrentPath(filepath1)).readFile();
  const secondConfig = getFileType(getCurrentPath(filepath2)).readFile();
  const objKeys = Object.keys({ ...firstConfig, ...secondConfig });

  const getDiff = key => {
    const oldVal = _.has(firstConfig, key) && firstConfig[key];
    const newVal = _.has(secondConfig, key) && secondConfig[key];
    const pushDiffString = type => {
      const stringsByType = {
        new: () => compareResults.push(`+${key}:${newVal}`),
        old: () => compareResults.push(`${key}:${oldVal}`),
        changed: () => compareResults.push(`+${key}:${newVal}`, `-${key}:${oldVal}`),
        removed: () => compareResults.push(`-${key}:${oldVal}`),
      };
      return stringsByType[type]();
    };

    if (!oldVal) return pushDiffString('new');
    if (!newVal) return pushDiffString('removed');
    if (oldVal !== newVal) return pushDiffString('changed');
    return pushDiffString('old');
  };

  objKeys.forEach(prop => getDiff(prop));
  return ['{', ...compareResults, '}'].join('\n');
};
export default renderDiff;
