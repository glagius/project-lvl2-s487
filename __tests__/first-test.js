import fs from 'fs';
import gendiff from '../src/utils';

const getResult = (path) => fs.readFileSync(path, 'utf8');
test('checkDiff one', () => {
  expect(gendiff('/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/oldConfig1.json', '/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/newConfig1.json')).toBe(getResult('/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult1.txt'));
});

test('checkDiff two', () => {
  expect(gendiff('../__tests__/__fixtures__/oldConfig1.json', '../__tests__/__fixtures__/newConfig2.json')).toBe(getResult('/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult2.txt'));
});

test('checkDiff three', () => {
  expect(gendiff('../__tests__/__fixtures__/oldConfig1.json', '../__tests__/__fixtures__/newConfig3.json')).toBe(getResult('/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult3.txt'));
});

test('checkDiff four', () => {
  expect(gendiff('../__tests__/__fixtures__/oldConfig1.json', '../__tests__/__fixtures__/newConfig4.json')).toBe(getResult('/home/glagius/WorkProjects/hexlet/project2/__tests__/__fixtures__/diffResult4.txt'));
});
