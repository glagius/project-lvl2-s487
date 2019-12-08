import renderDiff from './renders';
import compare from './parser';
import { readFile } from './utils';

export default (path1, path2, format = 'plain') => {
  if (!path1 || !path2) throw new Error('Need at least 2 filepaths');

  const parsedContents = [path1, path2].map(readFile);
  const comparedDiff = compare(...parsedContents);

  return renderDiff(comparedDiff, format);
};
