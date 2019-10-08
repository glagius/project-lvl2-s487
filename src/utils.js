import path from 'path';
import readJSON from './types/jsonType';
import readYML from './types/yamlType';
import readINI from './types/iniType';
import { parseItem, compareNodes } from './parser';

const getCurrentPath = filepath => (
  path.isAbsolute(filepath)
    ? filepath
    : path.normalize(filepath));
const getFileType = (filepath) => {
  const type = path.extname(filepath) ? path.extname(filepath).slice(1) : false;
  const classesByType = {
    json: () => readJSON(filepath),
    yml: () => readYML(filepath),
    ini: () => readINI(filepath),
  };
  return type ? classesByType[type]() : false;
};

const getComparedDiff = (filepath1, filepath2) => {
  const firstConfig = getFileType(getCurrentPath(filepath1));
  const secondConfig = getFileType(getCurrentPath(filepath2));
  if (!firstConfig || !secondConfig) throw new Error('Bad filetype');
  return compareNodes(parseItem(firstConfig), parseItem(secondConfig));
};
export default getComparedDiff;
