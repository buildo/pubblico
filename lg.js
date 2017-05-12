module.exports = (...args) => {
  console.log('PUBBLICO 📰 ', ...args);
  return args[0];
};