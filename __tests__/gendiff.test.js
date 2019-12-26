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
    const oldFile = `./__tests__/__fixtures__/${fileType}/oldConfig.${fileType}`;
    const newFile = `./__tests__/__fixtures__/${fileType}/newConfig.${fileType}`;
    const comparedDiff = genDiff(oldFile, newFile, renderFormat);
    expect(comparedDiff).toBe(getText(`./__tests__/__fixtures__/results/${renderFormat}Result.txt`));
  });
});
describe('Test engine workflow', () => {
  test('Get AST in JSON', async () => {
    const oldFile = './__tests__/__fixtures__/json/oldConfig.json';
    const newFile = './__tests__/__fixtures__/json/newConfig.json';
    const comparedConfig = genDiff(oldFile, newFile, 'json');
    expect(comparedConfig).toBe(JSON.stringify(JSON.parse(comparedConfig)));
  });
});
