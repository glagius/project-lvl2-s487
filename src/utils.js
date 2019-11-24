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
// TODO: move it to "compareData";
// const isEqualNodes = (node1, node2, property) => {
//   const props = {
//     type: () => node1.type === node2.type,
//     path: () => parsePath(node1.key) === parsePath(node2.key),
//     value: () => node1.type === node2.type && node1.type === 'simple' && node1.value === node2.value,
//   };
//   return props[property]();
// };

const readFile = filepath => getFileType(getCurrentPath(filepath));

export { readFile };
