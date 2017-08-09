const request = require('request');

module.exports = (url, { token, query }) => new Promise((resolve, reject) => {
  request.get({
    url,
    query,
    headers: { Authorization: `Bearer ${token}` }
  }, (error, response, body) => {
    if (error) {
      reject(error);
    }
    resolve(JSON.parse(body).data);
  });
});
