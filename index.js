import { Command } from 'commander/esm.mjs';
import generateDiff from './lib/generateDiff.js';

const genDiff = () => {
  const program = new Command();

  program
    .version('1.0.0', '-v, --version', 'output the version number')
    .helpOption('-h, --help', 'output usage information')
    .option('-f --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .action((filepath1, filepath2) => {
      const result = generateDiff(filepath1, filepath2);
      console.log(result);
    });

  program.parse(process.argv);
};

export default genDiff;
