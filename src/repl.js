// const makeNode = ({
//   key, value, parent,
// }) => ({
//   key,
//   value,
//   path: [...parent.path, key],
//   type: typeof value,
//   children: typeof value === 'object'
//     ? Object.entries(value).reduce((acc, [childKey, childValue]) => [
//       ...acc,
//       makeNode({
//         key: childKey,
//         value: childValue,
//         parent: { key, value, path: [...parent.path, key] },
//       }),
//     ], [])
//     : null,
// });

// TODO: Make AST for compared data;
// const makeAST = (object) => {
//   const items = Object.entries(object);
//   return items.reduce((acc, [key, value]) => ({
//     ...acc,
//     children: acc.children ? [...acc.children, makeNode({ key, value, parent: acc })] : [makeNode({ key, value, parent: acc })],
//   }),
//   {
//     type: 'object',
//     path: ['/'],
//   });
// };

const checkedNodeTypes = {
  added: value => ({
    status: 'added',
    value,
    type: typeof value,
  }),
  removed: value => ({
    status: 'removed',
    value,
  }),
  // TODO: merge removed + added
  changed: (oldValue, newValue) => ({
    status: 'changed',
    oldValue,
    newValue,
  }),
  unchanged: value => ({
    status: 'unchanged',
    value,
  }),
};
const isObjects = (first, second, property) => typeof first[property] === 'object' && typeof second[property] === 'object';
// TODO: Change to lodash .hasIn
const hasProperty = (obj, prop) => obj.hasOwnProperty(prop);
const compare = (oldObj, newObj) => {
  // const comparedObject = merge(oldObj, newObj);
  const comparedObject = { ...oldObj, ...newObj };
  const comparedKeys = Object.keys(comparedObject);
  return comparedKeys.reduce((acc, key) => {
    if (!hasProperty(oldObj, key)) {
      return {
        ...acc, [key]: checkedNodeTypes.added(newObj[key]),
      };
    }
    if (!hasProperty(newObj, key)) return { ...acc, [key]: checkedNodeTypes.removed(oldObj[key]) };
    if (hasProperty(oldObj, key) && hasProperty(newObj, key)) {
      if (oldObj[key] === newObj[key]) return { ...acc, [key]: checkedNodeTypes.unchanged(oldObj[key]) };
      if (isObjects(oldObj, newObj, key)) {
        return { ...acc, [key]: { ...compare(oldObj[key], newObj[key]) } };
      }
    }
    // TODO: change to deep-merge.
    return { ...acc, [key]: checkedNodeTypes.changed(oldObj[key], newObj[key]) };
  }, {});
};

const newConf = {
  url: '.*kitchenaid.com/.*/(cart|checkout).*',
  total: 89,
  orderTotal: 76,
  season: 'Summer',
  product: {
    year: 2019,
    models: {
      air: {
        price: 190000,
      },
      pro: {
        price: 150000,
        discount: true,
        'best-price': true,
      },
    },
    options: {
      option1: 'four',
      option2: 'four',
      option3: 'four',
    },
  },
};
const oldConf = {
  url: '.*kitchenaid.com/.*/(cart|checkout).*',
  total: 8979,
  orderTotal: 789876,
  product: {
    productName: 'Apple MacBook',
    year: 2019,
    models: {
      air: {
        price: 190000,
      },
      pro: {
        price: 290000,
      },
    },
    options: {
      option1: 'one',
      option2: 'two',
    },
  },
};

const ast = compare(oldConf, newConf);
const addPaths = (obj, path = ['/']) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => (typeof key === 'object'
    ? ({ ...acc, [key]: { ...obj[key], path: path || [...path, key], value: addPaths(obj[key], [...path, key]) } })
    : ({ ...acc, [key]: { ...obj[key], path: path || [...path, key] } })), {});
};
const renderFormats = {
  nested: {
    object: (obj) => {

    },
    primitive: (prim) => { },
  },
  plain: {
    object: (obj) => { },
    primitive: (prim) => { },
  },
  json: {
    object: (obj) => { },
    primitive: (prim) => { },
  },
};
const withPaths = addPaths(ast);
console.log(withPaths);
