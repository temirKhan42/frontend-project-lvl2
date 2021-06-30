import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import getParsingData from './parsers.js';

const getData = (filepath) => {
  const fullPath = filepath.startsWith('/') ? filepath : path.resolve(filepath);
  return readFileSync(fullPath, 'utf8');
};

const includesArray = (array, subArr) => array.some((arr) => _.isEqual(arr, subArr));

const getDiff = ([data1, data2]) => {
  const data1KeyVal = Object.entries(data1);
  const data2KeyVal = Object.entries(data2);
  return _.unionWith(data2KeyVal, data1KeyVal, _.isEqual)
    .sort(([key1], [key2]) => (key1 > key2 ? 1 : -1))
    .map((keyVal) => {
      const key = keyVal[0];
      const value = keyVal[1];
      if (!includesArray(data1KeyVal, keyVal)) {
        return `  + ${key}: ${value}${'\n'}`;
      }
      if (!includesArray(data2KeyVal, keyVal)) {
        return `  - ${key}: ${value}${'\n'}`;
      }
      return `    ${key}: ${value}${'\n'}`;
    })
    .reduce((acc, line) => `${acc}${line}`);
};

const generateDiff = (...filepathCollection) => {
  let extensions = [];
  const parsingDataCollection = filepathCollection
    .map((filepath) => {
      extensions = [...extensions, path.extname(filepath)];
      return getData(filepath);
    })
    .map((data, index) => getParsingData(extensions[index], data));

  return `{\n${getDiff(parsingDataCollection)}}`;
};

export default generateDiff;
