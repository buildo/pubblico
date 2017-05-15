const lg = require('./lg');
const {  writeFileSync } = require('fs');
const config = require('../config.json');
const {
  setToken = config.mediumApiToken,
  publication = config.publication
} = require('yargs').argv;

const newConfig = Object.assign({}, config, {
  mediumApiToken: setToken,
  publication
});

writeFileSync('../config.json', JSON.stringify(newConfig));

lg('Config updated', JSON.stringify(newConfig, null, 2));

