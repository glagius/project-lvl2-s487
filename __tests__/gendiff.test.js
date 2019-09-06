import fs from 'fs';
import getComparedDiff from '../src/utils';
import renderNode from '../src/renders';

const getText = filepath => fs.readFileSync(filepath, 'utf8');
describe('Test renders output', () => {
  // ${'json'} | ${'plain'}
  // ${'yml'}  | ${'default'}
  // ${'yml'}  | ${'plain'}
  // ${'ini'}  | ${'default'}
  // ${'ini'}  | ${'plain'}
  test.each`
  fileType  | renderType
  ${'json'} | ${'default'}

 `('Render $renderType type of $fileType diff', ({ fileType, renderType }) => {
  const oldFile = `./__tests__/__fixtures__/${fileType}/oldConfig.${fileType}`;
  const newFile = `./__tests__/__fixtures__/${fileType}/newConfig.${fileType}`;
  const comparedDiff = getComparedDiff(oldFile, newFile);
  expect(renderNode(comparedDiff, renderType)).toBe(getText(`./__tests__/__fixtures__/results/${renderType}Result.txt`));
});
});
// describe('Test engine workflow', () => {
//   test('Get AST in JSON', async () => {
//     const oldFile = './__tests__/__fixtures__/json/oldConfig.json';
//     const newFile = './__tests__/__fixtures__/json/newConfig.json';
//     const comparedConfig = getComparedDiff(oldFile, newFile);
//     expect(renderNode(comparedConfig, 'json')).toBe(JSON.stringify(comparedConfig));
//   });
// });
