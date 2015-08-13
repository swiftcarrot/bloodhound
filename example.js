var Bloodhound = require('./');

var engine = new Bloodhound({
  local: ['dog', 'pig', 'moose'],
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  datumTokenizer: Bloodhound.tokenizers.whitespace
});


var promise = engine.initialize();

promise.then(function() {
  console.log('engine init done');

  engine.search('d', function(d) {
    console.log(d);
  }, function(d) {
    console.log(d);
  });
});
