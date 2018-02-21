var test = require('tape');
var Bloodhound = require('../');

test('prefetch remote example', function(t) {
  t.plan(1)
  var countries = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'http://twitter.github.io/typeahead.js/data/countries.json'
  });

  var promise = countries.initialize();

  promise.then(function() {
    countries.search('norw', function(d) {
      t.deepEqual(d, ['Norway']);
    }, function(d) {
    });
  }, function(err) {
    console.log(err);
  });
});
