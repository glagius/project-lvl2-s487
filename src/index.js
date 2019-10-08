import getComparedDiff from './utils';
import renderNode from './renders';

export default (...args) => {
  const [first, second, format] = args;
  const renderType = format || 'default';
  if (!second || !first) throw new Error('Bad filepath');

  const diff = getComparedDiff(first, second);
  if (renderType === 'json') return renderNode(diff, renderType);
  return renderNode(diff, renderType);
};
