import ini from 'ini';
import fs from 'fs';

export default class {
  constructor(filepath) {
    this.filepath = filepath;
  }

  readFile() {
    return ini.parse(fs.readFileSync(this.filepath, 'utf8'));
  }
}
