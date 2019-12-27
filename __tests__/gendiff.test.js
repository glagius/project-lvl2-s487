/* eslint-disable indent */
import fs from 'fs';
import genDiff from '..';

const getText = filepath => fs.readFileSync(filepath, 'utf8');
describe('Test renders output', () => {
  test.each`
  fileType  | renderFormat
  ${'json'} | ${'nested'}
  ${'json'} | ${'plain'}
  ${'yml'}  | ${'nested'}
  ${'yml'}  | ${'plain'}
  ${'ini'}  | ${'nested'}
  ${'ini'}  | ${'plain'}`('Render $renderFormat type of $fileType diff', ({ fileType, renderFormat }) => {
    const oldContent = `./__tests__/__fixtures__/${fileType}/oldConfig.${fileType}`;
    const newContent = `./__tests__/__fixtures__/${fileType}/newConfig.${fileType}`;
    const comparedDiff = genDiff(oldContent, newContent, renderFormat);
    expect(comparedDiff).toBe(getText(`./__tests__/__fixtures__/results/${renderFormat}Result.txt`));
  });
});
describe('Test engine workflow', () => {
  test('Get AST in JSON', async () => {
    const oldContent = './__tests__/__fixtures__/json/oldConfig.json';
    const newContent = './__tests__/__fixtures__/json/newConfig.json';
    const stringifiedJSON = getText('./__tests__/__fixtures__/results/jsonResult.txt');
    const comparedConfig = genDiff(oldContent, newContent, 'json');
    expect(JSON.stringify(comparedConfig)).toBe(stringifiedJSON);
  });
});
