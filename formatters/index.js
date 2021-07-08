import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './jsonFormatter.js';

const getFormatDiff = (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  } if (format === 'plain') {
    return plain(diff);
  } if (format === 'json') {
    return jsonFormatter(diff);
  }

  return '';
};

export default getFormatDiff;
