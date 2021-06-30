import yaml from 'js-yaml';

const getParsingData = (ext, data) => {
  if (ext === '.json') {
    return JSON.parse(data);
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data);
  }
  return '';
};

export default getParsingData;
