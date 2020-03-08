import path from 'path';
import * as _ from 'lodash';
import { readINI, readJSON, readYAML } from './parsers';
import render from './formatters';

const getCurrentPath = (filepath) => path.resolve(filepath);

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

const compareValues = (obj1, obj2, key) => {
  if (!_.has(obj1, key)) return { status: 'added', newValue: obj2[key] };
  if (!_.has(obj2, key)) return { status: 'removed', oldValue: obj1[key] };
  if (obj1[key] === obj2[key] || (
    _.isObject(obj1[key]) && _.isObject(obj2[key])
  )) return { status: 'unchanged', oldValue: obj1[key] };
  return { status: 'changed', oldValue: obj1[key], newValue: obj2[key] };
};

const compare = (oldObject, newObject) => {
  const keys = _.union(_.keys(oldObject), _.keys(newObject));
  return keys.map((key) => {
    const changes = compareValues(oldObject, newObject, key);
    if (typeof newObject[key] === 'object') {
      const children = compare(oldObject[key], newObject[key]);
      return {
        key,
        ...changes,
        children: children.map((child) => ({ ...child, parent: key })),
      };
    }
    return { key, ...changes };
  });
};

export default (path1, path2, format = 'nested') => {
  const oldConfig = getContent(path1);
  const newConfig = getContent(path2);
  const ast = compare(oldConfig, newConfig);
  return render(format, ast);
};
