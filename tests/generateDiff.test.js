import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import generateDiff from '../src/generateDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const string = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('Generate diffirence from JSON files', () => {
  const pathTofile1 = getFixturePath('filepath1.json');
  const pathTofile2 = getFixturePath('filepath2.json');

  expect(generateDiff(pathTofile1, pathTofile2)).toBe(string);
});

test('Generate diffirence from YAML files', () => {
  const pathTofile1 = getFixturePath('filepath1.yml');
  const pathTofile2 = getFixturePath('filepath2.yml');

  expect(generateDiff(pathTofile1, pathTofile2)).toBe(string);
});
