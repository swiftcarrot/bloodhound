var Bloodhound = require('../');

var countries = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'http://twitter.github.io/typeahead.js/data/countries.json'
});

var promise = countries.initialize();

promise.then(function() {
  console.log('engine init done');

  countries.search('a', function(d) {
    console.log(d);
  }, function(d) {
    console.log(d)
  });
}, function(err) {
  console.log(err);
});
