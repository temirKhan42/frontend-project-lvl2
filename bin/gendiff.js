#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';

const program = new Command();

program
  .version('1.0.0', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.');

program.parse(process.argv);
