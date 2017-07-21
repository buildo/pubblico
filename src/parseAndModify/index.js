const compose = require('lodash/flowRight');
const parseMentions = require('./parseMentions');

module.exports = compose([
  parseMentions
]);