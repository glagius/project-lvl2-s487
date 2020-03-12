import nestedRender from './nestedRender';
import plainRender from './plainRender';

const formatters = {
  nested: nestedRender,
  plain: plainRender,
  json: JSON.stringify,
};

export default (ast, format) => formatters[format](ast);
