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

const getDiff = (data1, data2) => {
  const data1KeyVal = Object.entries(data1);
  const data2KeyVal = Object.entries(data2);

  const unionData = _.unionWith(data2KeyVal, data1KeyVal, _.isEqual)
    .sort(([key1], [key2]) => (key1 > key2 ? 1 : -1));
  const uniqUnionData = _.uniqWith(unionData, isUniq);

  return uniqUnionData.reduce((acc, [key, value]) => {
    const isValueObject = _.isPlainObject(value);
    const data1Val = data1[key];
    const data2Val = data2[key];
    const val = _.isPlainObject(data1Val)
      && _.isPlainObject(data2Val)
      ? getDiff(data1Val, data2Val) : value;

    if (!includesKeyValue(data1KeyVal, [key, value], isValueObject)) {
      acc[`+ ${key}`] = val;
    } else if (!includesKeyValue(data2KeyVal, [key, value], isValueObject)) {
      acc[`- ${key}`] = val;
    } else {
      acc[key] = val;
    }
    return acc;
  }, {});
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const extensions = [];
  const dataCollection = [filepath1, filepath2]
    .map((filepath) => {
      extensions.push(path.extname(filepath));
      return getData(filepath);
    })
    .map((data, index) => getParsingData(extensions[index], data));

  const diff = getDiff(...dataCollection);
  return getFormatDiff(diff, format);
};

export default genDiff;
