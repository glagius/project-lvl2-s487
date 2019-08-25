import fs from 'fs';
import getComparedConfig from '../src/utils';
import renderNode from '../src/renders';

const getResult = filepath => fs.readFileSync(filepath, 'utf8');

describe('Flat configs', () => {
  test('checkDiff json 1', () => {
    const comparedConfig = getComparedConfig(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfig.json',
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfig1.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult1.txt',
      ),
    );
  });
  test('checkDiff json 2', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/json/oldConfig.json',
      './__tests__/__fixtures__/json/newConfig2.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult2.txt',
      ),
    );
  });
  test('checkDiff json 3', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/json/oldConfig.json',
      './__tests__/__fixtures__/json/newConfig3.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult3.txt',
      ),
    );
  });
  test('checkDiff json 4', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/json/oldConfig.json',
      './__tests__/__fixtures__/json/newConfig4.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult4.txt',
      ),
    );
  });

  test('checkDiff yaml 1', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/yaml/oldConfig.yml',
      './__tests__/__fixtures__/yaml/newConfig1.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult1.txt',
      ),
    );
  });
  test('checkDiff yaml 2', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/yaml/oldConfig.yml',
      './__tests__/__fixtures__/yaml/newConfig2.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult2.txt',
      ),
    );
  });
  test('checkDiff yaml 3', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/yaml/oldConfig.yml',
      './__tests__/__fixtures__/yaml/newConfig3.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult3.txt',
      ),
    );
  });
  test('checkDiff yaml 4', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/yaml/oldConfig.yml',
      './__tests__/__fixtures__/yaml/newConfig4.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult4.txt',
      ),
    );
  });

  test('checkDiff ini 1', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/ini/oldConfig.ini',
      './__tests__/__fixtures__/ini/newConfig1.ini',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult1.txt',
      ),
    );
  });
  test('checkDiff ini 2', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/ini/oldConfig.ini',
      './__tests__/__fixtures__/ini/newConfig2.ini',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult2.txt',
      ),
    );
  });
  test('checkDiff ini 3', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/ini/oldConfig.ini',
      './__tests__/__fixtures__/ini/newConfig3.ini',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult3.txt',
      ),
    );
  });
  test('checkDiff ini 4', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/ini/oldConfig.ini',
      './__tests__/__fixtures__/ini/newConfig4.ini',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult4.txt',
      ),
    );
  });
});

describe('Nested blocks', () => {
  test('checkDiff json 1', () => {
    const comparedConfig = getComparedConfig(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested1.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult1.txt',
      ),
    );
  });
  test('checkDiff json 2', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/json/oldConfigNested.json',
      './__tests__/__fixtures__/json/newConfigNested2.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult2.txt',
      ),
    );
  });
  test('checkDiff json 3', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/json/oldConfigNested.json',
      './__tests__/__fixtures__/json/newConfigNested3.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult3.txt',
      ),
    );
  });
  test('checkDiff json 4', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/json/oldConfigNested.json',
      './__tests__/__fixtures__/json/newConfigNested4.json',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult4.txt',
      ),
    );
  });

  test('checkDiff yaml 1', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/yaml/oldConfigNested.yml',
      './__tests__/__fixtures__/yaml/newConfigNested1.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult1.txt',
      ),
    );
  });
  test('checkDiff yaml 2', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/yaml/oldConfigNested.yml',
      './__tests__/__fixtures__/yaml/newConfigNested2.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult2.txt',
      ),
    );
  });
  test('checkDiff yaml 3', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/yaml/oldConfigNested.yml',
      './__tests__/__fixtures__/yaml/newConfigNested3.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult3.txt',
      ),
    );
  });
  test('checkDiff yaml 4', () => {
    const comparedConfig = getComparedConfig(
      './__tests__/__fixtures__/yaml/oldConfigNested.yml',
      './__tests__/__fixtures__/yaml/newConfigNested4.yml',
    );
    expect(renderNode(comparedConfig, 'nested')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult4.txt',
      ),
    );
  });

  // There should be tests for nested ini files, but it don't
});
describe('Test nested blocks for plain result', () => {
  test('Make plain diff for json1', () => {
    const comparedConfig = getComparedConfig(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested1.json',
    );
    expect(renderNode(comparedConfig, 'plain')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult1.txt',
      ),
    );
  });
  test('Make plain diff for json2', () => {
    const comparedConfig = getComparedConfig(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested2.json',
    );
    expect(renderNode(comparedConfig, 'plain')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult2.txt',
      ),
    );
  });
  test('Make plain diff for json3', () => {
    const comparedConfig = getComparedConfig(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested3.json',
    );
    expect(renderNode(comparedConfig, 'plain')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult3.txt',
      ),
    );
  });
  test('Make plain diff for json4', () => {
    const comparedConfig = getComparedConfig(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested4.json',
    );
    expect(renderNode(comparedConfig, 'plain')).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult4.txt',
      ),
    );
  });
});
describe('Test engine workflow', () => {
  test('Get AST in JSON', async () => {
    const comparedConfig = getComparedConfig(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfig.json',
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfig1.json',
    );
    expect(renderNode(comparedConfig, 'json')).toBe(JSON.stringify(comparedConfig));
  });
});
