import fs from 'fs';
import path from 'path';
import _ from 'lodash';
// __tests__/__fixtures__/newConfig1.json
// __tests__/__fixtures__/newConfig2.json

export default (filepath1, filepath2) => {
  const compareResults = [];
  const getCurrentPath = (filepath) => path.isAbsolute(filepath) ? filepath : path.resolve(__dirname, filepath);
  const firstConfig = JSON.parse(fs.readFileSync(getCurrentPath(filepath1)));
  const secondConfig = JSON.parse(fs.readFileSync(getCurrentPath(filepath2)))
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
