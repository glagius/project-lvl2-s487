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

test('checkDiff ini 1', () => {
  expect(
    gendiff(
      '../__tests__/__fixtures__/ini/oldConfig.ini',
      '../__tests__/__fixtures__/ini/newConfig1.ini',
    ),
  ).toBe(
    getResult(
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult1.txt',
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
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult2.txt',
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
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult3.txt',
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
      '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult4.txt',
    ),
  );
});
