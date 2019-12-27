import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import render from './renders';

const compare = (oldConfig, newConfig) => {
  const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

  const getComparisonResult = (oldObj = {}, newObj = {}) => {
    const mergedObject = { ...oldObj, ...newObj };
    const keys = Object.keys(mergedObject);
    const compareValues = (obj1, obj2, key) => {
      // TODO: change logic with hasProperty;
      if (!hasProperty(obj1, key)) return { status: 'added', changes: [{ value: obj2[key], status: 'added' }] };
      if (!hasProperty(obj2, key)) return { status: 'removed', changes: [{ value: obj1[key], status: 'removed' }] };
      //
      if (obj1[key] === obj2[key]) return { status: 'unchanged', changes: null };
      if (typeof obj1[key] === typeof obj2[key] && typeof obj1[key] === 'object') return { status: 'unchanged', changes: null };
      return { status: 'changed', changes: [{ value: obj1[key], status: 'removed' }, { value: obj2[key], status: 'added' }] };
    };
    return keys.reduce((acc, key) => {
      if (typeof mergedObject[key] === 'object') {
        return {
          ...acc,
          children: [
            ...acc.children,
            {
              key,
              value: mergedObject[key],
              ...compareValues(oldObj, newObj, key),
              ...getComparisonResult(oldObj[key], newObj[key]),
            },
          ],
        };
      }
      return {
        ...acc,
        children: [
          ...acc.children,
          {
            key,
            value: mergedObject[key],
            ...compareValues(oldObj, newObj, key),
          },
        ],
      };
    }, { children: [] });
  };
  return getComparisonResult(oldConfig, newConfig);
};

export default (path1, path2, format = 'plain') => {
  const getCurrentPath = filepath => path.resolve(filepath);

  const readJSON = filepath => JSON.parse(fs.readFileSync(filepath));
  const readYAML = filepath => yaml.safeLoad(fs.readFileSync(filepath, 'utf8'));
  const readINI = filepath => ini.parse(fs.readFileSync(filepath, 'utf8'));

  const parseFile = (filepath) => {
    const type = path.extname(filepath) ? path.extname(filepath).slice(1) : false;
    const classesByType = {
      json: () => readJSON(filepath),
      yml: () => readYAML(filepath),
      ini: () => readINI(filepath),
    };
    return type ? classesByType[type]() : false;
  };

  const parsedContents = [path1, path2].map(el => parseFile(getCurrentPath(el)));
  const diff = compare(...parsedContents);

  return render(diff, format);
};
