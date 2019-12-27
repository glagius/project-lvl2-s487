#!/usr/bin/env node
import generateDiff from '..';
import { version } from '../../package.json';

const program = require('commander');

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format <type>', 'Output format. Can be "nested", "plain", "json"')
  .action((path1, path2, { format }) => {
    if (!path1 || !path2) throw new Error('Need at least 2 filepaths');
    generateDiff(path1, path2, format);
  })
  .parse(process.argv);
if (!program.args.length) program.help();
