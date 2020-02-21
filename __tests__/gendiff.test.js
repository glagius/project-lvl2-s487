import fs from 'fs';
import genDiff from '..';

const getFilePath = (fileType, contentType) => {
  if (fileType === 'txt') return `./__tests__/__fixtures__/results/${contentType}.${fileType}`;
  return `./__tests__/__fixtures__/${contentType}/config.${fileType}`;
};
const getText = (filepath) => fs.readFileSync(filepath, 'utf8');

describe('Test renders output', () => {
  test.each([
    ['nested', 'json'],
    ['plain', 'json'],
    ['nested', 'yml'],
    ['plain', 'yml'],
    ['nested', 'ini'],
    ['plain', 'ini'],
  ])('Render %s diff of %s files', (renderFormat, fileType) => {
    const oldContent = getFilePath(fileType, 'oldConfig');
    const newContent = getFilePath(fileType, 'newConfig');
    const comparedDiff = genDiff(oldContent, newContent, renderFormat);
    expect(comparedDiff).toBe(getText(getFilePath('txt', renderFormat)));
  });
});
describe('Test engine workflow', () => {
  test('Get AST in JSON', async () => {
    const oldContent = getFilePath('json', 'oldConfig');
    const newContent = getFilePath('json', 'newConfig');
    const stringifiedJSON = getText(getFilePath('txt', 'json'));
    const comparedConfig = genDiff(oldContent, newContent, 'json');
    expect(JSON.stringify(comparedConfig)).toBe(stringifiedJSON);
  });
});
