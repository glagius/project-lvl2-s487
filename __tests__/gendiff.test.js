import fs from 'fs';
import genDiff from '..';

const getFilePath = (contentType, fileType) => {
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
    const oldContent = getFilePath('oldConfig', fileType);
    const newContent = getFilePath('newConfig', fileType);
    const comparedDiff = genDiff(oldContent, newContent, renderFormat);
    expect(comparedDiff).toBe(getText(getFilePath(renderFormat, 'txt')));
  });
});
describe('Test engine workflow', () => {
  test('Get AST in JSON', async () => {
    const oldContent = getFilePath('oldConfig', 'json');
    const newContent = getFilePath('newConfig', 'json');
    const stringifiedAST = getText(getFilePath('json', 'txt'));
    const comparedConfig = genDiff(oldContent, newContent, 'json');
    expect(comparedConfig).toBe(stringifiedAST);
  });
});
