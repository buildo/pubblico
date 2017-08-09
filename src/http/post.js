const request = require('request');
const omitUndefined = require('lodash/pickBy');

module.exports = (url, { token, query, data }) => new Promise((resolve, reject) => {
  request.post({
    url,
    query,
    body: data,
    json: true,
    headers: omitUndefined({ Authorization: token ? `Bearer ${token}` : undefined, 'User-Agent': 'Pubblico' })
  }, (error, response, body) => {
    if (error) {
      // console.error('POST ERROR', { error });
      reject({ error });
    }
    // console.log('post RESPONSE', { body });
    resolve(body);
  });
});
