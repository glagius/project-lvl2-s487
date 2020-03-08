import fs from 'fs';
import genDiff from '../src';

const getFilePath = (contentType, fileType) => `./__tests__/__fixtures__/${fileType}/${contentType}.${fileType}`;
const getText = (filepath) => fs.readFileSync(filepath, 'utf8');

describe('Test renders output', () => {
  test.each([
    ['nested', 'json'],
    ['plain', 'json'],
    ['nested', 'yml'],
    ['plain', 'yml'],
    ['nested', 'ini'],
    ['plain', 'ini'],
    ['json', 'json'],
  ])('Render %s diff of %s files', (renderFormat, fileType) => {
    const oldConfigPath = getFilePath('oldConfig', fileType);
    const newConfigPath = getFilePath('newConfig', fileType);
    const result = getText(getFilePath(renderFormat, 'txt'));
    const comparedDiff = genDiff(oldConfigPath, newConfigPath, renderFormat);
    expect(comparedDiff).toBe(result);
  });
});
