# bloodhound-js
[bloodhound.js](https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md) for node and browser

> Bloodhound is the typeahead.js suggestion engine. Bloodhound is robust, flexible, and offers advanced functionalities such as prefetching, intelligent caching, fast lookups, and backfilling with remote data.

### Installtion
``` sh
npm install bloodhound-js --save
```
### Changes
+ no jquery deps
+ works with both browser and node
+ jquery deferred with [es6-promise](https://www.npmjs.com/package/es6-promise)
+ storage polyfill with [storage2](https://www.npmjs.com/package/storage2)
+ ajax with [superagent](https://www.npmjs.com/package/superagent)

### Usage
``` javascript
var Bloodhound = require('bloodhound-js');
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
```

### License
MIT
