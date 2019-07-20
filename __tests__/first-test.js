import fs from 'fs';
import gendiff from '../src/utils';

const getResult = path => fs.readFileSync(path, 'utf8');
test('checkDiff json 1', () => {
  expect(
    gendiff(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/oldConfig1.json',
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/json/newConfig1.json',
    ),
  ).toBe(
    getResult(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult1.txt',
    ),
  );
});

test('checkDiff json 2', () => {
  expect(
    gendiff(
      '../__tests__/__fixtures__/json/oldConfig1.json',
      '../__tests__/__fixtures__/json/newConfig2.json',
    ),
  ).toBe(
    getResult(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult2.txt',
    ),
  );
});

test('checkDiff json 3', () => {
  expect(
    gendiff(
      '../__tests__/__fixtures__/json/oldConfig1.json',
      '../__tests__/__fixtures__/json/newConfig3.json',
    ),
  ).toBe(
    getResult(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult3.txt',
    ),
  );
});

test('checkDiff json 4', () => {
  expect(
    gendiff(
      '../__tests__/__fixtures__/json/oldConfig1.json',
      '../__tests__/__fixtures__/json/newConfig4.json',
    ),
  ).toBe(
    getResult(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult4.txt',
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
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult1.txt',
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
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult2.txt',
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
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult3.txt',
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
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult4.txt',
    ),
  );
});
