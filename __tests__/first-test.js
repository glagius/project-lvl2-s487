import fs from 'fs';
import getComparedConfig from '../src/utils';
import renderNode from '../src/renders';

const getResult = filepath => fs.readFileSync(filepath, 'utf8');
const results = {
  flat: [
    getResult('./__tests__/__fixtures__/results/flat/diffResult1.txt'),
    getResult('./__tests__/__fixtures__/results/flat/diffResult2.txt'),
    getResult('./__tests__/__fixtures__/results/flat/diffResult3.txt'),
    getResult('./__tests__/__fixtures__/results/flat/diffResult4.txt'),
  ],
  nested: [
    getResult('./__tests__/__fixtures__/results/nested/diffResult2.txt'),
    getResult('./__tests__/__fixtures__/results/nested/diffResult4.txt'),
  ],
  plain: [
    getResult('./__tests__/__fixtures__/results/plain/diffResult2.txt'),
    getResult('./__tests__/__fixtures__/results/plain/diffResult4.txt'),
  ],
};
const oldConfigs = {
  flat: {
    json: './__tests__/__fixtures__/json/oldConfig.json',
    yml: './__tests__/__fixtures__/yml/oldConfig.yml',
    ini: './__tests__/__fixtures__/ini/oldConfig.ini',
  },
  nested: {
    json: './__tests__/__fixtures__/json/oldConfigNested.json',
    yml: './__tests__/__fixtures__/yml/oldConfigNested.yml',
  },
  plain: {
    json: './__tests__/__fixtures__/json/oldConfigNested.json',
    yml: './__tests__/__fixtures__/yml/oldConfigNested.yml',
  },
};
const getTestByType = (fileType, resultType, renderType) => {
  results[resultType].forEach((res, ind) => {
    test(`checkDiff ${fileType} ${ind}`, () => {
      const comparedConfig = getComparedConfig(
        oldConfigs[resultType][fileType],
        `./__tests__/__fixtures__/${fileType}/${resultType}Config${ind}.${fileType}`,
      );
      expect(renderNode(comparedConfig, renderType)).toBe(results[resultType][ind]);
    });
  });
};
describe('Flat configs', () => {
  getTestByType('json', 'flat', 'nested');
  getTestByType('yml', 'flat', 'nested');
  getTestByType('ini', 'flat', 'nested');
});

describe('Nested blocks', () => {
  getTestByType('json', 'nested', 'nested');
  getTestByType('yml', 'nested', 'nested');
  // There should be tests for nested ini files, but it don't
});
describe('Test nested blocks for plain result', () => {
  getTestByType('json', 'plain', 'plain');
  getTestByType('yml', 'plain', 'plain');
});
describe('Test engine workflow', () => {
  test('Get AST in JSON', async () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flat.json,
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/flatConfig0.json',
    );
    expect(renderNode(comparedConfig, 'json')).toBe(JSON.stringify(comparedConfig));
  });
});
