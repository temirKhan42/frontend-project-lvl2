import _ from 'lodash';

const stylish = (obj, offset = '') => {
  const space = `  ${offset}`;
  const result = Object.entries(obj)
    .map(([key, value]) => {
      const val = _.isPlainObject(value) ? stylish(value, `  ${space}`) : value;
      const s = key.startsWith('+') || key.startsWith('-') ? space : `  ${space}`;
      return `${s}${key}: ${val}${'\n'}`;
    })
    .join('');

  return `{${'\n'}${result}${offset}}`;
};

export default stylish;
