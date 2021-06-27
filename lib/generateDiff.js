import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const normolizePath = (filePathCollect) => (
  filePathCollect
    .map((filePath) => (filePath.startsWith('/') ? filePath : path.resolve(filePath)))
);

const getDataCollection = (filePathCount) => (
  filePathCount
    .map((filePath) => readFileSync(filePath, 'utf8'))
    .map((fileContent) => JSON.parse(fileContent))
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
        return `+ ${key}: ${value}${'\n'}`;
      }
      if (!includesArray(data2KeyVal, keyVal)) {
        return `- ${key}: ${value}${'\n'}`;
      }
      return `  ${key}: ${value}${'\n'}`;
    })
    .reduce((acc, line) => `${acc}${line}`);
};

const generateDiff = (...filepathCount) => {
  const absolutePathCollection = normolizePath(filepathCount);
  const dataCollect = getDataCollection(absolutePathCollection);
  const result = `{\n${getDiff(dataCollect)}}`;
  return result;
};

export default generateDiff;
