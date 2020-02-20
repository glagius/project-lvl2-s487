import fs from 'fs';
import genDiff from '..';

const getFilePath = (fileType, contentType) => fileType === 'txt' ?
  `./__tests__/__fixtures__/results/${contentType}.${fileType}`
  :
  `./__tests__/__fixtures__/${contentType}/config.${fileType}`;
const getText = (filepath) => fs.readFileSync(filepath, 'utf8');

describe('Test renders output', () => {
  test.each`fileType  | renderFormat
  ${'json'} | ${'nested'}
  ${'json'} | ${'plain'}
  ${'yml'}  | ${'nested'}
  ${'yml'}  | ${'plain'}
  ${'ini'}  | ${'nested'}
  ${'ini'}  | ${'plain'}`('Render $renderFormat type of $fileType diff', ({ fileType, renderFormat }) => {
    const oldContent = getFilePath(fileType, 'oldConfig');
    const newContent = getFilePath(fileType, 'newConfig');
    const comparedDiff = genDiff(oldContent, newContent, renderFormat);
    expect(comparedDiff).toBe(getText(getFilePath('txt', renderFormat)));
  });
});
describe('Test engine workflow', () => {
  test('Get AST in JSON', async () => {
    const oldContent = getFilePath('json', 'oldConfig');
    const newContent = getFilePath('json', 'newConfig');;
    const stringifiedJSON = getText(getFilePath('txt', 'json'));
    const comparedConfig = genDiff(oldContent, newContent, 'json');
    expect(JSON.stringify(comparedConfig)).toBe(stringifiedJSON);
  });
});
