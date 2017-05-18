const lg = require('./lg');
const readFileIfExistsSync = require('./readFileIfExistsSync');
const {  writeFileSync } = require('fs');
const {
  isEmpty,
  map,
  pickBy: clear // clear falsy from objects
} = require('lodash');
const configPath = require('./configPath');

const config = JSON.parse(readFileIfExistsSync(configPath) || '{}');
const {
  setToken = config.mediumApiToken,
  publication = config.publication
} = require('yargs').argv;

const newConfig = clear(Object.assign({}, config, {
  mediumApiToken: setToken,
  publication
}));

writeFileSync(configPath, JSON.stringify(newConfig));

lg(isEmpty(newConfig) ?
  'Your config is empty, set the mediumApiToken passing param --setToken' :
  `Config updated, ${map(newConfig, (value, key) => `\n${key}: ${value}`)}`
);

