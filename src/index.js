import { version } from '../package.json';

const program = require('commander');

export default (func) => {
  program
    .version(version)
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format <type>', 'Output format')
    .action(func)
    .parse(process.argv);
  if (!program.args.length) program.help();
};
