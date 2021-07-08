import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import generateDiff from '../index.js';

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

const plainString = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const jsonString = '{"common":{"+ follow":false,"setting1":"Value 1","- setting2":200,"- setting3":true,"+ setting3":null,"+ setting4":"blah blah","+ setting5":{"key5":"value5"},"setting6":{"doge":{"- wow":"","+ wow":"so much"},"key":"value","+ ops":"vops"}},"group1":{"- baz":"bas","+ baz":"bars","foo":"bar","- nest":{"key":"value"},"+ nest":"str"},"- group2":{"abc":12345,"deep":{"id":45}},"+ group3":{"deep":{"id":{"number":45}},"fee":100500}}';

test('Get diffirence from JSON files in format: default', () => {
  const pathTofile1 = getFixturePath('filepath1.json');
  const pathTofile2 = getFixturePath('filepath2.json');
  const diff = generateDiff(pathTofile1, pathTofile2);
  expect(diff).toBe(string);
});

test('Get diffirence from YAML files in format: default', () => {
  const pathTofile1 = getFixturePath('filepath1.yml');
  const pathTofile2 = getFixturePath('filepath2.yml');
  const diff = generateDiff(pathTofile1, pathTofile2);
  expect(diff).toBe(string);
});

test('Get diffirence from JSON files in format: plain', () => {
  const pathTofile1 = getFixturePath('filepath1.json');
  const pathTofile2 = getFixturePath('filepath2.json');
  const diff = generateDiff(pathTofile1, pathTofile2, 'plain');
  expect(diff).toBe(plainString);
});

test('Get diffirence from YAML files in format: plain', () => {
  const pathTofile1 = getFixturePath('filepath1.yml');
  const pathTofile2 = getFixturePath('filepath2.yml');
  const diff = generateDiff(pathTofile1, pathTofile2, 'plain');
  expect(diff).toBe(plainString);
});

test('Get diffirence from JSON files in format: json', () => {
  const pathTofile1 = getFixturePath('filepath1.json');
  const pathTofile2 = getFixturePath('filepath2.json');
  const diff = generateDiff(pathTofile1, pathTofile2, 'json');
  expect(diff).toBe(jsonString);
});

test('Get diffirence from YAML files in format: json', () => {
  const pathTofile1 = getFixturePath('filepath1.yml');
  const pathTofile2 = getFixturePath('filepath2.yml');
  const diff = generateDiff(pathTofile1, pathTofile2, 'json');
  expect(diff).toBe(jsonString);
});
