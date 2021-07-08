#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../index.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .version('0.1.2', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f --format [type]', 'output format', 'stylish', 'stylish')
  .description('Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options.format);

    console.log(diff);
    return diff;
  });

program.parse(process.argv);
