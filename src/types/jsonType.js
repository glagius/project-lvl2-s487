import fs from 'fs';

export default class {
  constructor(filepath) {
    this.filepath = filepath;
  }

  readFile() {
    return JSON.parse(fs.readFileSync(this.filepath));
  }
}
