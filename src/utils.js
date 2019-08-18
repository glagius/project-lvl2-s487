// import fs from 'fs';
import path from 'path';
// import _ from 'lodash';
import JSONfile from './types/jsonType';
import YMLfile from './types/yamlType';
import INIfile from './types/iniType';
import { parseItem, compareNodes } from './parser';

const getCurrentPath = filename =>
  path.isAbsolute(filename) ? filename : path.resolve(__dirname, filename);

const getFileType = filepath => {
  const type = path.extname(filepath) ? path.extname(filepath).slice(1) : false;
  const classesByType = {
    json: () => new JSONfile(filepath),
    yml: () => new YMLfile(filepath),
    ini: () => new INIfile(filepath),
  };
  return classesByType[type]();
};
const renderNode = item => item.toString(item);

const renderDiff = (type = 'nested') => (filepath1, filepath2) => {
  const firstConfig = getFileType(getCurrentPath(filepath1)).readFile();
  const secondConfig = getFileType(getCurrentPath(filepath2)).readFile();
  const comparedConfig = compareNodes(type)(
    parseItem(firstConfig),
    parseItem(secondConfig),
  );
  return renderNode(comparedConfig);
};
export { renderDiff, renderNode };
