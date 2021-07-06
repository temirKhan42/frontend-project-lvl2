import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import generateDiff from '../index.js';
import stylish from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const string = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('Generate diffirence from JSON files', () => {
  const pathTofile1 = getFixturePath('filepath1.json');
  const pathTofile2 = getFixturePath('filepath2.json');
  const diff = generateDiff(pathTofile1, pathTofile2);
  expect(stylish(diff)).toBe(string);
});

test('Generate diffirence from YAML files', () => {
  const pathTofile1 = getFixturePath('filepath1.yml');
  const pathTofile2 = getFixturePath('filepath2.yml');
  const diff = generateDiff(pathTofile1, pathTofile2);
  expect(stylish(diff)).toBe(string);
});
