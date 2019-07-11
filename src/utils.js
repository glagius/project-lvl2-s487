// import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import JSONfile from './types/jsonType';
import YMLfile from './types/yamlType';

const getCurrentPath = filepath => (path.isAbsolute(filepath)
  ? filepath
  : path.resolve(__dirname, filepath));
const getFileType = (filepath) => {
  const type = (path.extname(filepath)
    ? path.extname(filepath).slice(1)
    : false);
  const classesByType = {
    json: () => new JSONfile(filepath),
    yml: () => new YMLfile(filepath),
    ini: () => new INIfile(filepath),
  };
  return classesByType[type]();
};

export default (filepath1, filepath2) => {
  const compareResults = [];
  const firstConfig = getFileType(getCurrentPath(filepath1)).readFile();
  const secondConfig = getFileType(getCurrentPath(filepath2)).readFile();в
  const objKeys = Object.keys({ ...firstConfig, ...secondConfig });

  const getDiff = (prop) => {
    const oldVal = _.has(firstConfig, prop) && firstConfig[prop];
    const newVal = _.has(secondConfig, prop) && secondConfig[prop];
    const pushDiffString = (type) => {
      const stringsByType = {
        new: () => compareResults.push(`+${prop}:${newVal}`),
        old: () => compareResults.push(`${prop}:${oldVal}`),
        changed: () => compareResults.push(`+${prop}:${newVal}`, `-${prop}:${oldVal}`),
        removed: () => compareResults.push(`-${prop}:${oldVal}`),
      };
      return stringsByType[type]();
    };

    if (!oldVal) return pushDiffString('new');
    if (!newVal) return pushDiffString('removed');
    if (oldVal !== newVal) return pushDiffString('changed');
    return pushDiffString('old');
  };

  objKeys.forEach(prop => getDiff(prop));
  return ['{', ...compareResults, '}'].join('\n');
};
