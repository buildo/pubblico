const { readFileSync } = require('fs');

module.exports = (filePath) => {
  try {
    return readFileSync(filePath, 'utf8');
  } catch (err) {
    return '';
  }
};

