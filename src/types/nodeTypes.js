// change to function witch gonna take function as argument for method 'toString'
const nodeTypes = {
  // state can be 'added, removed, current'
  simple: ({ value, key, depth, status, ...args }) => ({
    type: 'simple',
    value,
    key,
    depth,
    status: status || 'current',
    ...args,
  }),
  object: ({ value, key, depth, status, ...args }) => ({
    type: 'object',
    value,
    hasChildren: true,
    key,
    depth,
    status: status || 'current',
    ...args,
  }),
  array: ({ value, key, depth, status, ...args }) => ({
    type: 'array',
    value,
    hasChildren: true,
    key,
    depth,
    status: status || 'current',
    ...args,
  }),
};
// node is parent of node with key;

// just for old Node version.
// const addOptions = (obj, options) => Object.assign({}, obj, options);

// change spread literalt to mutable state;

export default nodeTypes;
