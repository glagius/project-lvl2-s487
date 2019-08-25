import { version } from '../package.json';
import getComparedConfig from './utils';
import renderNode from './renders';

const program = require('commander');

export default () => {
  program
    .version(version)
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format <type>', 'Output format. Can be "nested", "plain", "json"')
    .action((firstConfig, secondConfig, cmdObj) => {
      const renderType = cmdObj.format;
      const diff = getComparedConfig(firstConfig, secondConfig);

      if (renderType === 'json') return renderNode(diff, renderType);
      return console.log(renderNode(diff, renderType || 'nested'));
    })
    .parse(process.argv);
  if (!program.args.length) program.help();
};
