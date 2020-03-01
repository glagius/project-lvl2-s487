import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import { has, isObject } from 'lodash';
import render from './formatters';

const getCurrentPath = (filepath) => path.resolve(filepath);

const readJSON = (filepath) => JSON.parse(fs.readFileSync(filepath));
const readYAML = (filepath) => yaml.safeLoad(fs.readFileSync(filepath, 'utf8'));
const readINI = (filepath) => ini.parse(fs.readFileSync(filepath, 'utf8'));

const getContent = (contentPath) => {
  const filepath = getCurrentPath(contentPath);
  const type = path.extname(filepath) ? path.extname(filepath).slice(1) : false;
  const conventers = {
    json: readJSON,
    yml: readYAML,
    ini: readINI,
  };
  return type ? conventers[type](filepath) : new Error('Wrong "filepath"');
};
const makeNode = ({
  name = '', value = '', parent = null, ...options
}) => ({
  name,
  value,
  parent,
  hasChildren: typeof value === 'object',
  ...options,
});
const compareValues = (obj1, obj2, key) => {
  if (!has(obj1, key)) return { status: 'added', changes: [{ value: obj2[key], status: 'added' }] };
  if (!has(obj2, key)) return { status: 'removed', changes: [{ value: obj1[key], status: 'removed' }] };
  if (obj1[key] === obj2[key]) return { status: 'unchanged', changes: null };
  if (typeof obj1[key] === typeof obj2[key] && isObject(obj1[key])) return { status: 'unchanged', changes: null };
  return { status: 'changed', changes: [{ value: obj1[key], status: 'removed' }, { value: obj2[key], status: 'added' }] };
};

const compare = (oldContent, newContent) => {
  const mergedObject = { ...oldContent, ...newContent };
  return Object.keys(mergedObject).map((key) => {
    const changes = compareValues(oldContent, newContent, key);
    if (isObject(mergedObject[key])) {
      const children = compare(oldContent[key], newContent[key]);
      return makeNode({
        name: key,
        value: mergedObject[key],
        children: children.map((child) => ({ ...child, parent: key })),
        ...changes,
      });
    }
    return makeNode({ name: key, value: mergedObject[key], ...changes });
  });
};

export default (path1, path2, format = 'plain') => {
  const filesContent = [path1, path2].map((datapath) => getContent(datapath));
  const ast = compare(...filesContent);
  return render(format, ast);
};
