#!/usr/bin/env node

import engine from '..';

const testFunc = (num1, num2) => console.log(`We have ${num1} and ${num2}`);
engine(testFunc);
