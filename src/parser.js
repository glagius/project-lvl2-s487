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
// const getNodeByKey = (node, key) => {
//   const item = node.value.find(obj => obj.key.join('.') === key);
//   return item;
// };
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
const compareNodes = (oldObj, newObj) => {
  const getMergedValue = (prevVal, newVal) => {
    console.log('prevVal = ', prevVal, '\nnewVal = ', newVal);
    const comparedValue = prevVal.reduce((acc, prevEl, ind) => {
      console.log('Acc = ', acc);
      const newEl = newVal[ind];
      const isValuesEqual = prevEl.value === newEl.value;
      const prevElPath = parsePath(prevEl.key);
      const newElPath = parsePath(newEl.key);
      if (prevElPath !== newElPath || prevEl.type !== newEl.type) {
        return [
          ...acc,
          changeNestedNodes(prevEl, 'removed'),
          changeNestedNodes(newEl, 'added'),
        ];
      }
      if (prevEl.type === 'simple') {
        console.log('Type is = ', prevEl.type, '\npath is = ', prevElPath, newElPath);
        return isValuesEqual
          ? [...acc, prevEl]
          : [
            ...acc,
            changeNestedNodes(prevEl, 'removed'),
            changeNestedNodes(newEl, 'added'),
          ];
      }
      console.log('Type2 is = ', prevEl.type, '\npath2 is = ', prevElPath, newElPath);
      return [...acc, ...getMergedValue(prevEl.value, newEl.value)];
    }, []);
    const getRest = (array, target) => array.slice();
    console.log('ComparedVal = ', comparedValue);
    console.log('new Rest = ', newVal);
    // console.log('Result = ', [
    //   ...comparedValue,
    //   ...newVal.slice(comparedValue.length - 1),
    // ]);
    return [...comparedValue, ...newVal.map(el => changeNestedNodes(el, 'added'))];
  };
  return {
    ...oldObj,
    ...newObj,
    value: getMergedValue(oldObj.value, newObj.value),
  };
  // const compare = (previous, current) => {
  //   if (!previous) {
  //     return [
  //       {
  //         ...changeNestedNodes(current, 'added'),
  //       },
  //     ];
  //   }
  //   if (!current) {
  //     return [{ ...changeNestedNodes(previous, 'removed') }];
  //   }
  //   const { value: oldValue, type: oldType } = previous;
  //   const { value: newValue, type: newType } = current;
  //   const typesEqual = oldType === newType;
  //   const isValuesEqual = oldValue === newValue;

  //   if (!typesEqual) {
  //     const changedPrev = {
  //       ...previous,
  //       status: 'removed',
  //     };
  //     const newCurr = {
  //       ...current,
  //       status: 'added',
  //     };
  //     return [changedPrev, newCurr];
  //   }
  //   if (typesEqual && newType === 'simple') {
  //     const changedPrev = { ...changeNestedNodes(previous, 'removed') };
  //     const changedCurrent = { ...changeNestedNodes(current, 'added') };
  //     const result = valuesEqual ? [current] : [changedPrev, changedCurrent];
  //     return result;
  //   }
};
//   const mergedValues = [...oldValue, ...newValue];
//   const sortedMergValues = mergedValues.map(el => el.key).map(key => key.join('.'));
//   let values = mergedValues;

//   if (sortedMergValues.length > 1) {
//     values = new Set(sortedMergValues);
//   }

//   const checkedNode = [...values].reduce((acc, key) => {
//     const previousNode = getNodeByKey(previous, key);
//     const currentNode = getNodeByKey(current, key);
//     return [...acc, ...compare(previousNode, currentNode)];
//   }, []);
//   const newCurr = {
//     ...current,
//     value: checkedNode,
//   };
//   return [nodeTypes[newType](newCurr)];
// };
// return compare(oldObj, newObj)[0];
export { parsePath, parseItem, compareNodes };
