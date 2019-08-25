import fs from 'fs';

export default filepath => JSON.parse(fs.readFileSync(filepath));
