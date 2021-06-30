import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import getParsingData from './parsers.js';

const getDataCollection = (filePathCollection) => (
  filePathCollection
    .map((filePath) => (filePath.startsWith('/') ? filePath : path.resolve(filePath)))
    .map((filePath) => readFileSync(filePath, 'utf8'))
);

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
  const ext = path.extname(filepathCollection[0]);
  const dataCollection = getDataCollection(filepathCollection);
  const parsingDataCollection = getParsingData(ext, dataCollection);
  return `{\n${getDiff(parsingDataCollection)}}`;
};

export default generateDiff;
