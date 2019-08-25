import ini from 'ini';
import fs from 'fs';

export default filepath => ini.parse(fs.readFileSync(filepath, 'utf8'));
