import yaml from 'js-yaml';
import fs from 'fs';

export default class {
  constructor(filepath) {
    this.filepath = filepath;
  }

  readFile() {
    return yaml.safeLoad(fs.readFileSync(this.filepath, 'utf8'));
  }
}
