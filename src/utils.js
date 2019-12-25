import path from 'path';
import readJSON from './types/jsonType';
import readYML from './types/yamlType';
import readINI from './types/iniType';

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

const getKeys = obj => Object.keys(obj);
const cleanArray = arr => arr.filter(Boolean);
const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
const readFile = filepath => getFileType(getCurrentPath(filepath));

export {
  readFile, getKeys, cleanArray, hasProperty,
};
