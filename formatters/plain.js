import _ from 'lodash';

const getCorrectValue = (value) => {
  let val = value;
  if (_.isPlainObject(value)) {
    val = '[complex value]';
  } else if (typeof value === 'string') {
    val = `'${val}'`;
  }
  return val;
};

const iter = (obj, path = '') => {
  const result = Object.entries(obj)
    .map(([key, value], index, array) => {
      let line = '';
      const val = getCorrectValue(value);
      const currentProp = key.startsWith('-')
        || key.startsWith('+')
        ? key.slice(2) : key;

      const property = path === '' ? currentProp : `${path}.${currentProp}`;
      if (!key.startsWith('-') && !key.startsWith('+') && _.isPlainObject(value)) {
        return iter(value, property);
      }
      if (!key.startsWith('-') && !key.startsWith('+')) {
        return '';
      }

      const nextKey = array[index + 1]?.[0] === undefined ? '' : array[index + 1][0];
      const nextProp = nextKey.startsWith('-')
        || nextKey.startsWith('+')
        ? nextKey.slice(2) : nextKey;

      const prevKey = array[index - 1]?.[0] === undefined ? '' : array[index - 1][0];
      const prevProp = prevKey.startsWith('-')
        || prevKey.startsWith('+')
        ? prevKey.slice(2) : prevKey;

      if (key.startsWith('-') && currentProp === nextProp) {
        const nextValue = array[index + 1][1];
        const nextVal = getCorrectValue(nextValue);
        line = `Property '${property}' was updated. From ${val} to ${nextVal}\n`;
      } else if (key.startsWith('-')) {
        line = `Property '${property}' was removed\n`;
      } else if (key.startsWith('+') && currentProp !== prevProp) {
        line = `Property '${property}' was added with value: ${val}\n`;
      }

      return line;
    })
    .join('');

  return result;
};

const plain = (obj) => {
  const plainDiff = iter(obj);

  return plainDiff.trim();
};

export default plain;
