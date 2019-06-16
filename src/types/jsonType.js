import fs from 'fs';
// import path from 'path';
// import _ from 'lodash';

export default class {
  constructor(filepath) {
    this.filepath = filepath;
  }

  readFile() {
    return JSON.parse(fs.readFileSync(this.filepath));
  }
}
