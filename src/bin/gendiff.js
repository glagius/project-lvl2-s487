#!/usr/bin/env node
import genDiff from '..';
import { version } from '../../package.json';

const program = require('commander');

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format <type>', 'Output format. Can be "nested", "plain", "json"')
  .action((firstConfig, secondConfig, cmdObj) => {
    const diff = genDiff(firstConfig, secondConfig, cmdObj.format);
    if (cmdObj.format !== 'json') {
      console.log(diff);
      return false;
    } return diff;
  })
  .parse(process.argv);
if (!program.args.length) program.help();
