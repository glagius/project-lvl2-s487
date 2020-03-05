import ini from 'ini';
import fs from 'fs';
import yaml from 'js-yaml';

const readJSON = (filepath) => JSON.parse(fs.readFileSync(filepath));
const readYAML = (filepath) => yaml.safeLoad(fs.readFileSync(filepath, 'utf8'));
const readINI = (filepath) => ini.parse(fs.readFileSync(filepath, 'utf8'));

export { readINI, readJSON, readYAML };
