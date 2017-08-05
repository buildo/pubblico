const request = require('request');

module.exports = (url, { token, query, data }) => new Promise((resolve, reject) => {
  request.post({
    url,
    query,
    body: data,
    json: true,
    headers: { Authorization: `Bearer ${token}` }
  }, (error, response, body) => {
    if (error) {
      // console.error('POST ERROR', { error });
      reject({ error });
    }
    // console.log('post RESPONSE', { body });
    resolve(body);
  });
});
