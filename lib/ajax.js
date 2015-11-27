var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = function(o) {
  return new Promise(function(resolve, reject) {
    request.get(o.url).end(function(err, res) {
      if(err) return reject(err);
      resolve(res.body);
    });
  });
};
