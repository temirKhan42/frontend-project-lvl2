import stylish from './stylish.js';
import plain from './plain.js';

const getFormatDiff = (diff, format) => {
  let result = '';
  if (format === 'stylish') {
    result = stylish(diff);
  } else if (format === 'plain') {
    result = plain(diff);
  }

  return result;
};

export default getFormatDiff;
