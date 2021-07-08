import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import getParsingData from './src/parsers.js';
import getFormatDiff from './formatters/index.js';

const getData = (filepath) => {
  const fullPath = filepath.startsWith('/') ? filepath : path.resolve(filepath);
  return readFileSync(fullPath, 'utf8');
};

const isUniq = (obj, oth) => {
  if (_.isPlainObject(obj[1]) && _.isPlainObject(oth[1])) {
    return obj[0] === oth[0];
  }
  return false;
};

const includesKeyValue = (arrayData, arrayKeyValue, isValueObject) => {
  if (isValueObject) {
    return arrayData.some(([key, value]) => (
      _.isEqual(key, arrayKeyValue[0]) && _.isPlainObject(value)
    ));
  }
  return arrayData.some((arr) => _.isEqual(arr, arrayKeyValue));
};

const getValidKey = (data1, data2, [key, value], isValueObject) => {
  if (!includesKeyValue(data1, [key, value], isValueObject)) {
    return `+ ${key}`;
  } if (!includesKeyValue(data2, [key, value], isValueObject)) {
    return `- ${key}`;
  }

  return key;
};

const getDiff = (data1, data2) => {
  const data1KeyVal = Object.entries(data1);
  const data2KeyVal = Object.entries(data2);

  const unionData = _.unionWith(data1KeyVal, data2KeyVal, _.isEqual);
  const sortedUnionData = _.sortBy(unionData, [(arr) => (arr[0])]);
  const uniqUnionData = _.uniqWith(sortedUnionData, isUniq);

  return uniqUnionData.reduce((acc, [key, value]) => {
    const result = { ...acc };
    const isValueObject = _.isPlainObject(value);
    const data1Val = data1[key];
    const data2Val = data2[key];
    const val = _.isPlainObject(data1Val)
      && _.isPlainObject(data2Val)
      ? getDiff(data1Val, data2Val) : value;

    const validKey = getValidKey(data1KeyVal, data2KeyVal, [key, value], isValueObject);
    return { ...result, ...{ [validKey]: val } };
  }, {});
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const pathCollection = [filepath1, filepath2];
  const dataCollection = pathCollection
    .map((filepath) => getData(filepath))
    .map((data, index) => getParsingData(path.extname(pathCollection[index]), data));

  const diff = getDiff(...dataCollection);
  return getFormatDiff(diff, format);
};

export default genDiff;
