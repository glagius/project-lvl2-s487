const nodeTypes = {
  simple: ({ status, ...args }) => ({
    type: 'simple',
    status: status || 'current',
    ...args,
  }),
  object: ({ status, ...args }) => ({
    type: 'object',
    hasChildren: true,
    status: status || 'current',
    ...args,
  }),
  array: ({ status, ...args }) => ({
    type: 'array',
    hasChildren: true,
    status: status || 'current',
    ...args,
  }),
};

export default nodeTypes;
