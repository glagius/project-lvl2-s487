import fs from 'fs';
import genDiff from '../src/index';

const getText = filepath => fs.readFileSync(filepath, 'utf8');

describe('Test renders output', () => {
  test.each`
  fileType  | renderType
  ${'json'} | ${'default'}
  ${'json'} | ${'plain'}
  ${'yml'}  | ${'default'}
  ${'yml'}  | ${'plain'}
  ${'ini'}  | ${'default'}
  ${'ini'}  | ${'plain'}`('Render $renderType type of $fileType diff', ({ fileType, renderType }) => {
  const oldFile = `./__tests__/__fixtures__/${fileType}/oldConfig.${fileType}`;
  const newFile = `./__tests__/__fixtures__/${fileType}/newConfig.${fileType}`;
  const comparedDiff = genDiff(oldFile, newFile, renderType);
  expect(comparedDiff).toBe(getText(`./__tests__/__fixtures__/results/${renderType}Result.txt`));
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
