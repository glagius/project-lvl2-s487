// import fs from 'fs';
import path from 'path';
// import _ from 'lodash';
import JSONfile from './types/jsonType';
import YMLfile from './types/yamlType';
import INIfile from './types/iniType';
import { parseItem, compareNodes } from './parser';

const getCurrentPath = filepath => {
  return path.isAbsolute(filepath) ? filepath : path.normalize(filepath);
};
const getFileType = filepath => {
  const type = path.extname(filepath) ? path.extname(filepath).slice(1) : false;
  const classesByType = {
    json: () => new JSONfile(filepath),
    yml: () => new YMLfile(filepath),
    ini: () => new INIfile(filepath),
  };
  return classesByType[type]();
};

const getComparedConfig = (filepath1, filepath2) => {
  const firstConfig = getFileType(getCurrentPath(filepath1)).readFile();
  const secondConfig = getFileType(getCurrentPath(filepath2)).readFile();
  return compareNodes(parseItem(firstConfig), parseItem(secondConfig));
};
export default getComparedConfig;
