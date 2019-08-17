import fs from 'fs';
import { renderDiff, renderNode } from '../src/utils';
import { parseItem, compareNodes } from '../src/parser';

const getResult = path => fs.readFileSync(path, 'utf8');
describe('Flat configs', () => {
  test('checkDiff json 1', () => {
    expect(
      renderDiff(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfig.json',
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfig1.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult1.txt',
      ),
    );
  });

  test('checkDiff json 2', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/json/oldConfig.json',
        '../__tests__/__fixtures__/json/newConfig2.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult2.txt',
      ),
    );
  });

  test('checkDiff json 3', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/json/oldConfig.json',
        '../__tests__/__fixtures__/json/newConfig3.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult3.txt',
      ),
    );
  });

  test('checkDiff json 4', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/json/oldConfig.json',
        '../__tests__/__fixtures__/json/newConfig4.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult4.txt',
      ),
    );
  });

  test('checkDiff yaml 1', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/yaml/oldConfig.yml',
        '../__tests__/__fixtures__/yaml/newConfig1.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult1.txt',
      ),
    );
  });

  test('checkDiff yaml 2', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/yaml/oldConfig.yml',
        '../__tests__/__fixtures__/yaml/newConfig2.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult2.txt',
      ),
    );
  });

  test('checkDiff yaml 3', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/yaml/oldConfig.yml',
        '../__tests__/__fixtures__/yaml/newConfig3.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult3.txt',
      ),
    );
  });

  test('checkDiff yaml 4', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/yaml/oldConfig.yml',
        '../__tests__/__fixtures__/yaml/newConfig4.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult4.txt',
      ),
    );
  });

  test('checkDiff ini 1', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/ini/oldConfig.ini',
        '../__tests__/__fixtures__/ini/newConfig1.ini',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult1.txt',
      ),
    );
  });

  test('checkDiff ini 2', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/ini/oldConfig.ini',
        '../__tests__/__fixtures__/ini/newConfig2.ini',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult2.txt',
      ),
    );
  });

  test('checkDiff ini 3', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/ini/oldConfig.ini',
        '../__tests__/__fixtures__/ini/newConfig3.ini',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/flatConfigs/diffResult3.txt',
      ),
    );
  });

  test('checkDiff ini 4', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/ini/oldConfig.ini',
        '../__tests__/__fixtures__/ini/newConfig4.ini',
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
      renderDiff(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested1.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult1.txt',
      ),
    );
  });
  test('checkDiff json 2', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/json/oldConfigNested.json',
        '../__tests__/__fixtures__/json/newConfigNested2.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult2.txt',
      ),
    );
  });
  test('checkDiff json 3', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/json/oldConfigNested.json',
        '../__tests__/__fixtures__/json/newConfigNested3.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult3.txt',
      ),
    );
  });
  test('checkDiff json 4', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/json/oldConfigNested.json',
        '../__tests__/__fixtures__/json/newConfigNested4.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult4.txt',
      ),
    );
  });
  test('checkDiff yaml 1', () => {
    expect(
      renderDiff(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/yaml/oldConfigNested.yml',
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/yaml/newConfigNested1.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult1.txt',
      ),
    );
  });
  test('checkDiff yaml 2', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/yaml/oldConfigNested.yml',
        '../__tests__/__fixtures__/yaml/newConfigNested2.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult2.txt',
      ),
    );
  });
  test('checkDiff yaml 3', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/yaml/oldConfigNested.yml',
        '../__tests__/__fixtures__/yaml/newConfigNested3.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult3.txt',
      ),
    );
  });
  test('checkDiff yaml 4', () => {
    expect(
      renderDiff(
        '../__tests__/__fixtures__/yaml/oldConfigNested.yml',
        '../__tests__/__fixtures__/yaml/newConfigNested4.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/diffResult4.txt',
      ),
    );
  });
});

describe('unit test for parse / render functions', () => {
  const oldObj = {
    url: '.*kitchenaid.com/.*/(cart|checkout).*',
    total: 8979,
    orderTotal: 789876,
    product: {
      productName: 'Apple MacBook',
      year: 2019,
      models: [{ name: 'Air', price: 190000 }, { name: 'Pro', price: 290000 }],
      options: {
        option1: 'one',
        option2: 'two',
      },
    },
    errorMessage: 'What is this?',
    newObj: 21,
  };
  const newObj = {
    url: '.*kitchenaid.com/.*/(cart|checkout).*',
    total: 8979,
    orderTotal: 789876,
    product: {
      productName: 'Apple MacBook',
      year: 2019,
      models: [
        { name: 'Air', price: 190000, colors: [1, 2, 3] },
        { name: 'Pro', price: 290000, colors: [1, 2] },
      ],
      options: {
        option1: 'one',
        option2: 'four',
        option3: 'three',
      },
    },
    errorMessage: 'What is this?',
    newObj: 21,
  };
  const simpleObj = { a: 2, b: 3, c: 'string', d: 'value', f: true, g: null };
  const nestedObj = { a: 2, b: { c: 5 } };

  const parsedResults = {
    simpleObj: '{\n  a: 2\n  b: 3\n  c: string\n  d: value\n  f: true\n  g: null\n}',
    simpleArr: '[\n  1\n  2\n  3\n]',
    nestedObj: '{\n  a: 2\n  b: {\n    c: 5\n  }\n}',
    objWithArray: '{\n  a: 2\n  b: 3\n  c: [\n    a\n    b\n  ]\n}',
    parsedSimpleObj: [
      'PrimitiveNode',
      'PrimitiveNode',
      'PrimitiveNode',
      'PrimitiveNode',
      'PrimitiveNode',
      'PrimitiveNode',
    ],
    parsedObjWithArray: [
      'PrimitiveNode',
      'PrimitiveNode',
      ['ArrayNode', ['PrimitiveNode', 'PrimitiveNode']],
    ],
    parsedNestedObject: ['PrimitiveNode', ['ObjectNode', ['PrimitiveNode']]],
    comparedObj:
      '{\n  url: .*kitchenaid.com/.*/(cart|checkout).*\n  total: 8979\n  orderTotal: 789876\n  product: {\n    productName: Apple MacBook\n    year: 2019\n    models: [\n      {\n        name: Air\n        price: 190000\n      + colors: [\n          1\n          2\n          3\n        ]\n      }\n      {\n        name: Pro\n        price: 290000\n      + colors: [\n          1\n          2\n        ]\n      }\n    ]\n    options: {\n      option1: one\n    - option2: two\n    + option2: four\n    + option3: three\n    }\n  }\n  errorMessage: What is this?\n  newObj: 21\n}',
  };

  it('should render object', () => {
    const nodes = parseItem(simpleObj);
    expect(renderNode(nodes)).toBe(parsedResults.simpleObj);
  });
  it('should render nestedObject', () => {
    const nodes = parseItem(nestedObj);
    expect(renderNode(nodes)).toBe(parsedResults.nestedObj);
  });
  it('should parse compared difficult objects', () => {
    const parsedSimple1 = parseItem(oldObj);
    const parsedSimple2 = parseItem(newObj);
    const compared = compareNodes(parsedSimple1, parsedSimple2);
    // console.log(
    //   'Compared = ',
    //   compared,
    //   '\nOld = ',
    //   parsedSimple1,
    //   '\n New = ',
    //   parsedSimple2,
    // );
    expect(renderNode(compared)).toEqual(parsedResults.comparedObj);
  });
});

// describe('Test nested blocks for plain result', () => {
//   test('Make plain diff for json1', () => {
//     expect(
//       renderDiff(
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested1.json',
//       ),
//     ).toBe(
//       getResult(
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult1.txt',
//       ),
//     );
//   });
//   test('Make plain diff for json2', () => {
//     expect(
//       renderDiff(
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested2.json',
//       ),
//     ).toBe(
//       getResult(
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult2.txt',
//       ),
//     );
//   });
//   test('Make plain diff for json3', () => {
//     expect(
//       renderDiff(
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested3.json',
//       ),
//     ).toBe(
//       getResult(
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult3.txt',
//       ),
//     );
//   });
//   test('Make plain diff for json4', () => {
//     expect(
//       renderDiff(
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested4.json',
//       ),
//     ).toBe(
//       getResult(
//         '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/results/nestedConfigs/plainResult/diffResult4.txt',
//       ),
//     );
//   });
// });
