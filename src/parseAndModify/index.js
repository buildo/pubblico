const parseMentions = require('./parseMentions');
const gistify = require('./gistify');

const asyncCompose = (...fns) => (x) => fns.reduce((a, b) => a.then(b), Promise.resolve(x));

module.exports = asyncCompose(
  gistify,
  parseMentions
);
