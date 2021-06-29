import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import generateDiff from '../lib/generateDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('extractLinks', () => {
  const pathTojson1 = getFixturePath('file1.json');
  const pathTojson2 = getFixturePath('file2.json');
  const string = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

  expect(generateDiff(pathTojson1, pathTojson2)).toBe(string);
});
