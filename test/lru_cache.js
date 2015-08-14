var test = require('tape');
var LruCache = require('../lib/lru_cache');

var _cache = function() {
  return new LruCache(3);
};

test('should make entries retrievable by their keys', function(t) {
  var cache = _cache();

  var key = 'key';
  var val = 42;
  cache.set(key, val);

  t.plan(1);
  t.strictEqual(cache.get(key), val);
});

test('should return undefined if key has not been set', function(t) {
  var cache = _cache();

  t.plan(1);
  t.strictEqual(cache.get('wat?'), undefined);
});

test('should hold up to maxSize entries', function(t) {
  var cache = _cache();

  cache.set('one', 1);
  cache.set('two', 2);
  cache.set('three', 3);
  cache.set('four', 4);

  t.plan(4);
  t.strictEqual(cache.get('one'), undefined);
  t.strictEqual(cache.get('two'), 2);
  t.strictEqual(cache.get('three'), 3);
  t.strictEqual(cache.get('four'), 4);
});

test('should evict lru entry if cache is full', function(t) {
  var cache = _cache();
  cache.set('one', 1);
  cache.set('two', 2);
  cache.set('three', 3);
  cache.get('one');
  cache.set('four', 4);

  t.plan(5);
  t.strictEqual(cache.get('one'), 1);
  t.strictEqual(cache.get('two'), undefined);
  t.strictEqual(cache.get('three'), 3);
  t.strictEqual(cache.get('four'), 4);
  t.strictEqual(cache.size, 3);
});