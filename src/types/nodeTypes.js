// change to function witch gonna take function as argument for method 'toString'
const nodeTypes = {
  // state can be 'added, deleted, current'
  simple: ({ value, key, depth, status }, methods) => ({
    type: 'simple',
    value,
    key,
    depth,
    status: status || 'current',
    ...methods,
    // toString() {
    //   return renderString(this);
    // },
  }),
  object: ({ value, key, depth, status }, methods) => ({
    type: 'object',
    value,
    hasChildren: true,
    key,
    depth,
    status: status || 'current',
    ...methods,
    // toString() {
    //   return objToString(this);
    // },
  }),
  array: ({ value, key, depth, status }, methods) => ({
    type: 'array',
    value,
    hasChildren: true,
    key,
    depth,
    status: status || 'current',
    ...methods,
    // toString() {
    //   return arrToString(this);
    // },
  }),
};
// node is parent of node with key;

// just for old Node version.
// const addOptions = (obj, options) => Object.assign({}, obj, options);

// change spread literalt to mutable state;

export default nodeTypes;
