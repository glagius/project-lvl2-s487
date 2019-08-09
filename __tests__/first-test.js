import fs from 'fs';
import gendiff from '../src/utils';

const getResult = path => fs.readFileSync(path, 'utf8');
describe('Flat configs', () => {
  test('checkDiff json 1', () => {
    expect(
      gendiff(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfig.json',
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfig1.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult1.txt',
      ),
    );
  });

  test('checkDiff json 2', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/json/oldConfig.json',
        '../__tests__/__fixtures__/json/newConfig2.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult2.txt',
      ),
    );
  });

  test('checkDiff json 3', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/json/oldConfig.json',
        '../__tests__/__fixtures__/json/newConfig3.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult3.txt',
      ),
    );
  });

  test('checkDiff json 4', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/json/oldConfig.json',
        '../__tests__/__fixtures__/json/newConfig4.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult4.txt',
      ),
    );
  });

  test('checkDiff yaml 1', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/yaml/oldConfig.yml',
        '../__tests__/__fixtures__/yaml/newConfig1.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult1.txt',
      ),
    );
  });

  test('checkDiff yaml 2', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/yaml/oldConfig.yml',
        '../__tests__/__fixtures__/yaml/newConfig2.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult2.txt',
      ),
    );
  });

  test('checkDiff yaml 3', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/yaml/oldConfig.yml',
        '../__tests__/__fixtures__/yaml/newConfig3.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult3.txt',
      ),
    );
  });

  test('checkDiff yaml 4', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/yaml/oldConfig.yml',
        '../__tests__/__fixtures__/yaml/newConfig4.yml',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult4.txt',
      ),
    );
  });

  test('checkDiff ini 1', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/ini/oldConfig.ini',
        '../__tests__/__fixtures__/ini/newConfig1.ini',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult1.txt',
      ),
    );
  });

  test('checkDiff ini 2', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/ini/oldConfig.ini',
        '../__tests__/__fixtures__/ini/newConfig2.ini',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult2.txt',
      ),
    );
  });

  test('checkDiff ini 3', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/ini/oldConfig.ini',
        '../__tests__/__fixtures__/ini/newConfig3.ini',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult3.txt',
      ),
    );
  });

  test('checkDiff ini 4', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/ini/oldConfig.ini',
        '../__tests__/__fixtures__/ini/newConfig4.ini',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/flatConfigs/diffResult4.txt',
      ),
    );
  });
});
describe('Nested blocks', () => {
  test('checkDiff json 1', () => {
    expect(
      gendiff(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfigNested.json',
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfigNested1.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/nestedConfigs/diffResult1.txt',
      ),
    );
  });

  test('checkDiff json 2', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/json/oldConfigNested.json',
        '../__tests__/__fixtures__/json/newConfigNested2.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/nestedConfigs/diffResult2.txt',
      ),
    );
  });

  test('checkDiff json 3', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/json/oldConfigNested.json',
        '../__tests__/__fixtures__/json/newConfigNested3.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/nestedConfigs/diffResult3.txt',
      ),
    );
  });

  test('checkDiff json 4', () => {
    expect(
      gendiff(
        '../__tests__/__fixtures__/json/oldConfigNested.json',
        '../__tests__/__fixtures__/json/newConfigNested4.json',
      ),
    ).toBe(
      getResult(
        '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/nestedConfigs/diffResult4.txt',
      ),
    );
  });
});

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
      option2: 'two',
      option3: 'three',
    },
  },
  errorMessage: 'What is this?',
  newObj: 21,
};
const merged = {
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
      option2: 'two',
      option3: 'three',
    },
  },
  errorMessage: 'What is this?',
  newObj: 21,
};
const simpleObj = { a: 2, b: 3, c: 'string', d: 'value', f: true, g: null };
const simpleArr = [1, 2, 3];
const objWithArray = { a: 2, b: 3, c: ['a', 'b'] };
const nestedObj = { a: 2, b: { c: 5 } };

const arrayOfObjects = [{ a: 2 }, { b: 3 }, { c: 67 }];
const nestedAray = [{ a: 2 }, { b: [1, 2, 3] }, { c: 23 }];

const parsedResults = {
  simpleObj: '{\n  a: 2,\n  b: 3,\n  c: string,\n  d: value,\n  f: true,\n  g: null,\n}',
  simpleArr: '[\n  1,\n  2,\n  3,\n]',
  nestedObj: '{\n  a: 2,\n  b: {\n    c: 5,\n  },\n}',
  objWithArray: '{\n  a: 2,\n  b: 3,\n  c: [\n    a,\n    b,\n  ]\n}',
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
};

const getTree = (arr, property) =>
  arr.reduce(
    (acc, el) =>
      el.children
        ? [...acc, [el[property], getTree(el.children, acc)]]
        : [...acc, el[property]],
    [],
  );

const getTreeTypes = item => {
  const children = parseItem(item).children;
  const parsedTree = children.reduce(
    (acc, el) =>
      el.children ? [...acc, [el.type, getTree(el.children, 'type')]] : [...acc, el.type],
    [],
  );
  return parsedTree;
};

describe('item to string', () => {
  it('should render object', () => {
    const nodes = parseItem(simpleObj);
    expect(renderNode(nodes)).toBe(parsedResults.simpleObj);
  });
  it('should render nestedObject', () => {
    const nodes = parseItem(nestedObj);
    console.log(renderNode(nodes));
    expect(renderNode(nodes)).toBe(parsedResults.nestedObj);
  });
  it('should render objWithArray', () => {
    console.log(parseItem(objWithArray));
    expect(parseItem(objWithArray).toString()).toBe(parsedResults.objWithArray);
  });
});
describe('parse item', () => {
  it('should parse simpleObject', () => {
    expect(parseItem(simpleObj).children.map(el => el.type)).toEqual(
      parsedResults.parsedSimpleObj,
    );
  });
  it('should parse object with array', () => {
    expect(getTreeTypes(objWithArray)).toEqual(parsedResults.parsedObjWithArray);
  });
  it('should parse nested object', () => {
    expect(getTreeTypes(nestedObj)).toEqual(parsedResults.parsedNestedObject);
  });
});
