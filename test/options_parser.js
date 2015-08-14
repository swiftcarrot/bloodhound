var test = require('tape');
var parser = require('../lib/options_parser');
var _ = require('../lib/utils');

function _build(o) {
  return parser(_.mixin({
    datumTokenizer: _.noop,
    queryTokenizer: _.noop
  }, o || {}));
}

function _prefetch(o) {
  return parser({
    datumTokenizer: _.noop,
    queryTokenizer: _.noop,
    prefetch: _.mixin({
      url: '/example'
    }, o || {})
  });
}

test('should throw exception if datumTokenizer is not set', function(t) {
  t.plan(1);

  t.throws(function() {
    parser({datumTokenizer: null});
  });
});

test('should throw exception if queryTokenizer is not set', function(t) {
  t.plan(1);
  t.throws(function() {
    parser({queryTokenizer: null});
  });
});

test('should wrap sorter', function(t) {
  var o = _build({sorter: function(a, b) {return a - b;}});

  t.plan(1);
  t.deepEqual(o.sorter([2, 1, 3]), [1, 2, 3]);
});

test('should default sorter to identity function', function(t) {
  var o = _build();
  t.plan(1);
  t.deepEqual(o.sorter([2, 1, 3]), [2, 1, 3]);
});

// local

test('should default to empty array', function(t) {
  var o = _build();

  t.plan(1);
  t.deepEqual(o.local, []);
});

test('should support function', function(t) {
  var o = _build({local: function() {return [1];}});

  t.plan(1);
  t.deepEqual(o.local, [1]);
});

test('should support arrays', function(t) {
  var o = _build({local: [1]});

  t.plan(1);
  t.deepEqual(o.local, [1]);
});


// prefetch

test('should throw exception if url is not set', function(t) {
  t.plan(1);
  t.throws(function() {
    _prefetch({url: null});
  });
});

test('should support simple string format', function(t) {
  t.plan(1);
  t.true(_build({prefetch: '/prefetch'}).prefetch !== undefined);
});

test('should default ttl to 1 day', function(t) {
  t.plan(1);
  t.strictEqual(_prefetch().prefetch.ttl, 86400000);
});

test('should default cache to true', function(t) {
  t.plan(1);
  t.true(_prefetch().prefetch.cache);
});

// test('should default transform to identiy function', function() {
//   var o = prefetch();
//   expect(o.prefetch.transform('foo')).toBe('foo');
// });

// test('should default cacheKey to url', function() {
//   var o = prefetch();
//   expect(o.prefetch.cacheKey).toBe(o.prefetch.url);
// });

// // test('should default transport to jQuery.ajax', function() {
// //   var o = prefetch();
// //   expect(o.prefetch.transport).toBe($.ajax);
// // });

// test('should prepend verison to thumbprint', function() {
//   var o = prefetch();
//   expect(o.prefetch.thumbprint).toBe('%VERSION%');

//   o = prefetch({ thumbprint: 'foo' });
//   expect(o.prefetch.thumbprint).toBe('%VERSION%foo');
// });

// test('should wrap custom transport to be deferred compatible', function() {
//   var o, errDeferred, successDeferred;

//   o = prefetch({ transport: errTransport });
//   errDeferred = o.prefetch.transport('q');

//   o = prefetch({ transport: successTransport });
//   successDeferred = o.prefetch.transport('q');

//   waits(0);
//   runs(function() {
//     expect(errDeferred.isRejected()).toBe(true);
//     expect(successDeferred.isResolved()).toBe(true);
//   });

//   function errTransport(q, success, error) { error(); }
//   function successTransport(q, success, error) { success(); }
// });
