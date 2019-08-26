import fs from 'fs';
import getComparedConfig from '../src/utils';
import renderNode from '../src/renders';

const getResult = filepath => fs.readFileSync(filepath, 'utf8');
const results = {
  flatConfigs: [
    getResult('./__tests__/__fixtures__/results/flatConfigs/diffResult1.txt'),
    getResult('./__tests__/__fixtures__/results/flatConfigs/diffResult2.txt'),
    getResult('./__tests__/__fixtures__/results/flatConfigs/diffResult3.txt'),
    getResult('./__tests__/__fixtures__/results/flatConfigs/diffResult4.txt'),
  ],
  nested: [
    getResult('./__tests__/__fixtures__/results/nestedConfigs/diffResult2.txt'),
    getResult('./__tests__/__fixtures__/results/nestedConfigs/diffResult4.txt'),
  ],
  plain: [
    getResult(
      './__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult2.txt',
    ),
    getResult(
      './__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult4.txt',
    ),
  ],
};
const oldConfigs = {
  flatConfigs: {
    json: './__tests__/__fixtures__/json/oldConfig.json',
    yml: './__tests__/__fixtures__/yaml/oldConfig.yml',
    ini: './__tests__/__fixtures__/ini/oldConfig.ini',
  },
  nested: {
    json: './__tests__/__fixtures__/json/oldConfigNested.json',
    yml: './__tests__/__fixtures__/yaml/oldConfigNested.yml',
  },
};
describe('Flat configs', () => {
  test('checkDiff json 1', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.json,
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfig1.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[0]);
  });
  test('checkDiff json 2', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.json,
      './__tests__/__fixtures__/json/newConfig2.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[1]);
  });
  test('checkDiff json 3', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.json,
      './__tests__/__fixtures__/json/newConfig3.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[2]);
  });
  test('checkDiff json 4', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.json,
      './__tests__/__fixtures__/json/newConfig4.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[3]);
  });

  test('checkDiff yaml 1', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.yml,
      './__tests__/__fixtures__/yaml/newConfig1.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[0]);
  });
  test('checkDiff yaml 2', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.yml,
      './__tests__/__fixtures__/yaml/newConfig2.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[1]);
  });
  test('checkDiff yaml 3', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.yml,
      './__tests__/__fixtures__/yaml/newConfig3.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[2]);
  });
  test('checkDiff yaml 4', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.yml,
      './__tests__/__fixtures__/yaml/newConfig4.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[3]);
  });

  test('checkDiff ini 1', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.ini,
      './__tests__/__fixtures__/ini/newConfig1.ini',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[0]);
  });
  test('checkDiff ini 2', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.ini,
      './__tests__/__fixtures__/ini/newConfig2.ini',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[1]);
  });
  test('checkDiff ini 3', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.ini,
      './__tests__/__fixtures__/ini/newConfig3.ini',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[2]);
  });
  test('checkDiff ini 4', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.ini,
      './__tests__/__fixtures__/ini/newConfig4.ini',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.flatConfigs[3]);
  });
});

describe('Nested blocks', () => {
  test('checkDiff json 1', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.nested.json,
      './__tests__/__fixtures__/json/newConfigNested2.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.nested[0]);
  });
  test('checkDiff json 2', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.nested.json,
      './__tests__/__fixtures__/json/newConfigNested4.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.nested[1]);
  });

  test('checkDiff yaml 1', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.nested.yml,
      './__tests__/__fixtures__/yaml/newConfigNested2.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.nested[0]);
  });
  test('checkDiff yaml 2', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.nested.yml,
      './__tests__/__fixtures__/yaml/newConfigNested4.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(results.nested[1]);
  });

  // There should be tests for nested ini files, but it don't
});
describe('Test nested blocks for plain result', () => {
  test('Make plain diff for json 1', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.nested.json,
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested2.json',
    );
    expect(renderNode(comparedConfig, 'plain')).toBe(results.plain[0]);
  });
  test('Make plain diff for json 2', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.nested.json,
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested4.json',
    );
    expect(renderNode(comparedConfig, 'plain')).toBe(results.plain[1]);
  });

  test('checkDiff yaml 1', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.nested.yml,
      './__tests__/__fixtures__/yaml/newConfigNested2.yml',
    );
    expect(renderNode(comparedConfig, 'plain')).toBe(results.plain[0]);
  });
  test('checkDiff yaml 2', () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.nested.yml,
      './__tests__/__fixtures__/yaml/newConfigNested4.yml',
    );
    expect(renderNode(comparedConfig, 'plain')).toBe(results.plain[1]);
  });
});
describe('Test engine workflow', () => {
  test('Get AST in JSON', async () => {
    const comparedConfig = getComparedConfig(
      oldConfigs.flatConfigs.json,
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfig1.json',
    );
    expect(renderNode(comparedConfig, 'json')).toBe(JSON.stringify(comparedConfig));
  });
});
