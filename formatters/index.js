import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './jsonFormatter.js';

const getFormatDiff = (diff, format) => {
  let result = '';
  if (format === 'stylish') {
    result = stylish(diff);
  } else if (format === 'plain') {
    result = plain(diff);
  } else if (format === 'json') {
    result = jsonFormatter(diff);
  }

  return result;
};

export default getFormatDiff;
