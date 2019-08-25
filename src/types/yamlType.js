import yaml from 'js-yaml';
import fs from 'fs';

export default filepath => yaml.safeLoad(fs.readFileSync(filepath, 'utf8'));
