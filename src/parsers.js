import yaml from 'js-yaml';

const getParsingData = (ext, dataCollection) => {
  let parsingData = '';
  if (ext === '.json') {
    parsingData = dataCollection.map((fileContent) => JSON.parse(fileContent));
  } else if (ext === '.yml' || ext === '.yaml') {
    parsingData = dataCollection.map((data) => yaml.load(data));
  }

  return parsingData;
};

export default getParsingData;
