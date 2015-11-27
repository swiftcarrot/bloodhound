var test = require('tape');
var Bloodhound = require('../');

test('basic usage', function(t) {
  var engine = new Bloodhound({
    local: ['dog', 'pig', 'moose'],
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: Bloodhound.tokenizers.whitespace
  });

  var promise = engine.initialize();

  promise.then(function() {
    engine.search('d', function(d) {
      t.deepEqual(d, ['dog']);
    }, function(d) {
      t.deepEqual(d, []);
    });
  });
});
