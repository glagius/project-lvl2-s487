import ini from 'ini';
import yaml from 'js-yaml';
import has from 'lodash/has';

export default (content, type) => {
  const parsers = {
    json: () => JSON.parse(content),
    yml: () => yaml.safeLoad(content),
    ini: () => ini.parse(content),
  };

  return has(parsers, type) ? parsers[type]() : new Error('Wrong "filepath"');
};
