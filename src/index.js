import { version } from '../package.json';
import { renderDiff } from '../utils';

const program = require('commander');

export default () => {
  program
    .version(version)
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format <type>', 'Output format', 'nested')
    .action(type => {
      renderDiff(type)(firstConfig, secondConfig);
    })
    .parse(process.argv);
  if (!program.args.length) program.help();
};
