import fs from 'fs';
import { getComparedConfig, renderNode } from '../src/utils';
import engine from '..';

const getResult = path => fs.readFileSync(path, 'utf8');
describe('Flat configs', () => {
  test('checkDiff json 1', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfig.json',
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfig1.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult1.txt',
      ),
    );
  });

  test('checkDiff json 2', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/json/oldConfig.json',
          '../__tests__/__fixtures__/json/newConfig2.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult2.txt',
      ),
    );
  });

  test('checkDiff json 3', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/json/oldConfig.json',
          '../__tests__/__fixtures__/json/newConfig3.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult3.txt',
      ),
    );
  });

  test('checkDiff json 4', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/json/oldConfig.json',
          '../__tests__/__fixtures__/json/newConfig4.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult4.txt',
      ),
    );
  });

  test('checkDiff yaml 1', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/yaml/oldConfig.yml',
          '../__tests__/__fixtures__/yaml/newConfig1.yml',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult1.txt',
      ),
    );
  });

  test('checkDiff yaml 2', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/yaml/oldConfig.yml',
          '../__tests__/__fixtures__/yaml/newConfig2.yml',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult2.txt',
      ),
    );
  });

  test('checkDiff yaml 3', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/yaml/oldConfig.yml',
          '../__tests__/__fixtures__/yaml/newConfig3.yml',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult3.txt',
      ),
    );
  });

  test('checkDiff yaml 4', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/yaml/oldConfig.yml',
          '../__tests__/__fixtures__/yaml/newConfig4.yml',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult4.txt',
      ),
    );
  });

  test('checkDiff ini 1', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/ini/oldConfig.ini',
          '../__tests__/__fixtures__/ini/newConfig1.ini',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult1.txt',
      ),
    );
  });

  test('checkDiff ini 2', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/ini/oldConfig.ini',
          '../__tests__/__fixtures__/ini/newConfig2.ini',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult2.txt',
      ),
    );
  });

  test('checkDiff ini 3', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/ini/oldConfig.ini',
          '../__tests__/__fixtures__/ini/newConfig3.ini',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult3.txt',
      ),
    );
  });

  test('checkDiff ini 4', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/ini/oldConfig.ini',
          '../__tests__/__fixtures__/ini/newConfig4.ini',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult4.txt',
      ),
    );
  });
});
describe('Nested blocks', () => {
  test('checkDiff json 1', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested1.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult1.txt',
      ),
    );
  });
  test('checkDiff json 2', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/json/oldConfigNested.json',
          '../__tests__/__fixtures__/json/newConfigNested2.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult2.txt',
      ),
    );
  });
  test('checkDiff json 3', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/json/oldConfigNested.json',
          '../__tests__/__fixtures__/json/newConfigNested3.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult3.txt',
      ),
    );
  });
  test('checkDiff json 4', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/json/oldConfigNested.json',
          '../__tests__/__fixtures__/json/newConfigNested4.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult4.txt',
      ),
    );
  });
  test('checkDiff yaml 1', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/yaml/oldConfigNested.yml',
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/yaml/newConfigNested1.yml',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult1.txt',
      ),
    );
  });
  test('checkDiff yaml 2', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/yaml/oldConfigNested.yml',
          '../__tests__/__fixtures__/yaml/newConfigNested2.yml',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult2.txt',
      ),
    );
  });
  test('checkDiff yaml 3', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/yaml/oldConfigNested.yml',
          '../__tests__/__fixtures__/yaml/newConfigNested3.yml',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult3.txt',
      ),
    );
  });
  test('checkDiff yaml 4', () => {
    expect(
      renderNode(
        getComparedConfig('nested')(
          '../__tests__/__fixtures__/yaml/oldConfigNested.yml',
          '../__tests__/__fixtures__/yaml/newConfigNested4.yml',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult4.txt',
      ),
    );
  });
});
describe('Test nested blocks for plain result', () => {
  test('Make plain diff for json1', () => {
    expect(
      renderNode(
        getComparedConfig('plain')(
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested1.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult1.txt',
      ),
    );
  });
  test('Make plain diff for json2', () => {
    expect(
      renderNode(
        getComparedConfig('plain')(
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested2.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult2.txt',
      ),
    );
  });
  test('Make plain diff for json3', () => {
    expect(
      renderNode(
        getComparedConfig('plain')(
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested3.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult3.txt',
      ),
    );
  });
  test('Make plain diff for json4', () => {
    expect(
      renderNode(
        getComparedConfig('plain')(
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
          '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested4.json',
        ),
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult4.txt',
      ),
    );
  });
});
describe('Test engine workflow', () => {
  // test('Сomparing two flat configs', () => {
  //   expect(
  //     engine()(
  //       '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfig.json',
  //       '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfig1.json',
  //     ),
  //   ).toBe(
  //     getResult(
  //       '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult1.txt',
  //     ),
  //   );
  // });
  // test('Сomparing two nested configs', () => {
  //   expect(
  //     engine()(
  //       '../__tests__/__fixtures__/json/oldConfigNested.json',
  //       '../__tests__/__fixtures__/json/newConfigNested4.json',
  //     ),
  //   ).toBe(
  //     getResult(
  //       '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult4.txt',
  //     ),
  //   );
  // });
  // test('Comparing two nested configs in "plain" format', () => {
  //   expect(
  //     engine()(
  //       '-f',
  //       'plain',
  //       '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
  //       '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested4.json',
  //     ),
  //   ).toBe(
  //     getResult(
  //       '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult4.txt',
  //     ),
  //   );
  // });
  test('Saving result into json file', () => {
    expect(engine()).toBe('Some text');
  });
});
