import nestedRender from './nestedRender';
import plainRender from './plainRender';

const jsonRender = (ast) => JSON.stringify(ast);
const formatters = {
  nested: nestedRender,
  plain: plainRender,
  json: jsonRender,
};

export default (format, ast) => formatters[format](ast);
