import ini from 'ini';
import yaml from 'js-yaml';

export default (content, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
      return yaml.safeLoad(content);
    case 'ini':
      return ini.parse(content);
    default:
      return new Error('Wrong "filepath"');
  }
};
