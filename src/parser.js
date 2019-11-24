import { merge } from 'lodash';

// const parsePath = keys => keys
//   .map(key => (typeof key === 'number' || key.includes('-') ? `['${key}']` : key))
//   .slice(1)
//   .join('.');

const makeNode = ({ key, value, parent, options }) => ({
  key,
  value,
  parent,
  options,
  type: typeof value,
  children: typeof value === 'object'
    ? Object.entries(value).reduce((acc, [childKey, childValue]) => [
      ...acc,
      makeNode({
        key: childKey,
        value: childValue,
        parent: { key, value },
      }),
    ], [])
    : null,
});

const makeAST = (object) => {
  const items = Object.entries(object);
  return items.reduce((acc, [key, value]) => ({
    ...acc,
    children: acc.children ? [...acc.children, makeNode({ key, value, parent: acc })] : [makeNode({ key, value, parent: acc })],
  }),
    {
      type: 'object',
    });
};

const compare = (obj1, obj2) => {
  const mergedObject = merge(obj1, obj2);
}
/*
Will compare "first" with "second" and return {
  status: added / removed / changed / unchanged,
  oldNode: 'old value',
  newNode: 'new value'
}
*/

// const compare = (previous, current) => (...([previous, current].map(makeAST)));

/*
return {
 type: Object || Array || Primitive,
 value: { } || [] || primitive,
 children: [childrens] || null,

}
*/

// TODO: refactor this code to pure-function.
// const parseItem = (item, keyPath, depth = 0) => {
//   const indent = 2;
//   // TODO: Change "newDepth" name to "newIndent";
//   // take depth out.
//   const newDepth = depth + indent;
//   let itemValue;

//   const lastKey = keyPath ? keyPath[keyPath.length - 1] : '/';
//   const valueTypes = {
//     simple: element => element,
//     object: (obj, objKey, depthLvl) => parseObject(obj, objKey, depthLvl, parseItem),
//     array: (arr, key, depthLvl) => parseArray({
//       coll: arr,
//       key,
//       depth: depthLvl,
//     }, parseItem),
//   };

//   if (lastKey === '/') {
//     itemValue = valueTypes.object(item, [lastKey], depth);
//     const options = { value: itemValue, key: [lastKey], depth };
//     return nodeTypes.object(options);
//   }
//   if (typeof lastKey === 'number') {
//     const type = getValueType(item);
//     itemValue = valueTypes[type](item, [...keyPath], newDepth);
//     const options = { value: itemValue, key: [...keyPath], depth: newDepth };
//     return nodeTypes[type](options);
//   }
//   const type = getValueType(item[lastKey]);
//   itemValue = valueTypes[type](item[lastKey], [...keyPath], newDepth);
//   const options = { value: itemValue, key: [...keyPath], depth: newDepth };
//   return nodeTypes[type](options);
// };

// const changeNestedNodes = (node, status) => (node.value instanceof Array
//   ? {
//     ...node,
//     status,
//     value: node.value.map(item => changeNestedNodes(item, status)),
//   }
//   : {
//     ...node,
//     status,
//   });

export { makeAST, parseItem };
