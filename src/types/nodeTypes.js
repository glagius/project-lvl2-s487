const nodeTypes = {
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

export default nodeTypes;
