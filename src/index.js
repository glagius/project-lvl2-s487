import { version } from '../package.json';
import { getComparedConfig, renderNode, saveToFile } from './utils';

const program = require('commander');

export default () => {
  program
    .version(version)
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format <type>', 'Output format, and destination, if "type" is "json"')
    .option('-s, --save [destination]', 'Save diff in "destination" directory')
    .action((firstConfig, secondConfig, cmdObj) => {
      const renderType = cmdObj.format;
      const destination = cmdObj.save;
      const diff = getComparedConfig(renderType || 'nested')(firstConfig, secondConfig);

      if (destination) {
        saveToFile(diff, destination);
        return;
      }

      console.log(renderNode(diff));
    })
    .parse(process.argv);
  if (!program.args.length) program.help();
};
