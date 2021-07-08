import _ from 'lodash';

const getCorrectValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getProperty = (key) => (
  key.startsWith('-') || key.startsWith('+') ? key.slice(2) : key
);

const iter = (obj, path = '') => {
  const result = Object.entries(obj)
    .map(([key, value], index, array) => {
      const val = getCorrectValue(value);
      const currentProp = getProperty(key);

      const property = path === '' ? currentProp : `${path}.${currentProp}`;
      if (!key.startsWith('-') && !key.startsWith('+') && _.isPlainObject(value)) {
        return iter(value, property);
      } if (!key.startsWith('-') && !key.startsWith('+')) {
        return '';
      }

      const nextKey = array[index + 1]?.[0] === undefined ? '' : array[index + 1][0];
      const nextProp = getProperty(nextKey);

      const prevKey = array[index - 1]?.[0] === undefined ? '' : array[index - 1][0];
      const prevProp = getProperty(prevKey);

      if (key.startsWith('-') && currentProp === nextProp) {
        const nextValue = array[index + 1][1];
        const nextVal = getCorrectValue(nextValue);
        return `Property '${property}' was updated. From ${val} to ${nextVal}\n`;
      } if (key.startsWith('-')) {
        return `Property '${property}' was removed\n`;
      } if (key.startsWith('+') && currentProp !== prevProp) {
        return `Property '${property}' was added with value: ${val}\n`;
      }

      return '';
    })
    .join('');

  return result;
};

const plain = (obj) => {
  const plainDiff = iter(obj);

  return plainDiff.trim();
};

export default plain;
