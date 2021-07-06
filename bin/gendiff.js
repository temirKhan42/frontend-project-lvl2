#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import stylish from '../src/stylish.js';
import generateDiff from '../index.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .version('0.1.2', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f --format [type]', 'output format', stylish, stylish)
  .description('Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2, options) => {
    const diff = generateDiff(filepath1, filepath2);
    const result = options.format(diff);

    console.log(result);
    return result;
  });

program.parse(process.argv);
