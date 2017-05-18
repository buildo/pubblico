module.exports = (...args) => {
  console.log('PUBBLICO 📰 ', ...args); // eslint-disable-line no-console
  return args[0];
};