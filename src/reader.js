import ini from 'ini';
import fs from 'fs';
import yaml from 'js-yaml';
import has from 'lodash/has';

const readJSON = (filepath) => JSON.parse(fs.readFileSync(filepath));
const readYAML = (filepath) => yaml.safeLoad(fs.readFileSync(filepath, 'utf8'));
const readINI = (filepath) => ini.parse(fs.readFileSync(filepath, 'utf8'));

export default (filepath, filetype) => {
  const converters = {
    json: readJSON,
    yml: readYAML,
    ini: readINI,
  };

  return has(converters, filetype) ? converters[filetype](filepath) : new Error('Wrong "filepath"');
};
