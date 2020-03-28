import has from 'lodash/has';
import union from 'lodash/union';
import keys from 'lodash/keys';
import isObject from 'lodash/isObject';
import path from 'path';
import fs from 'fs';

import parse from './parser';
import render from './formatters';

const parseFilePath = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const filetype = path.extname(filepath).slice(1);
  return { absolutePath, filetype };
};

const compareValues = (obj1, obj2, key) => {
  if (!has(obj1, key)) {
    return { status: 'added', newValue: obj2[key] };
  }
  if (!has(obj2, key)) {
    return { status: 'removed', oldValue: obj1[key] };
  }
  if (obj1[key] === obj2[key] || (
    isObject(obj1[key]) && isObject(obj2[key])
  )) {
    return { status: 'unchanged', oldValue: obj1[key] };
  }
  return { status: 'changed', oldValue: obj1[key], newValue: obj2[key] };
};

const compare = (oldObject, newObject) => {
  const mergedKeys = union(keys(oldObject), keys(newObject));
  return mergedKeys.map((key) => {
    const changes = compareValues(oldObject, newObject, key);
    return { key, ...changes };
  });
};

export default (filepath1, filepath2, format = 'nested') => {
  const { absolutePath: absolutePath1, filetype: filetype1 } = parseFilePath(filepath1);
  const { absolutePath: absolutePath2, filetype: filetype2 } = parseFilePath(filepath2);
  const content1 = fs.readFileSync(absolutePath1, 'utf8');
  const content2 = fs.readFileSync(absolutePath2, 'utf8');
  const config1 = parse(content1, filetype1);
  const config2 = parse(content2, filetype2);
  const ast = compare(config1, config2);

  return render(ast, format);
};
