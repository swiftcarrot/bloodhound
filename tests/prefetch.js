var test = require('tape');
var Bloodhound = require('../');

test('prefetch remote example', function(t) {
  var countries = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'http://twitter.github.io/typeahead.js/data/countries.json'
  });

  var promise = countries.initialize();

  promise.then(function() {
    countries.search('south', function(d) {
      console.log(d);
    }, function(d) {
      console.log(d)
    });
  }, function(err) {
    console.log(err);
  });
});
