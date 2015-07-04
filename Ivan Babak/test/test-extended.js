'use strict';

var assert = require('assert');

module.exports = function (L) {
  
  var list = { name: 'list' };
  var A = { name: 'A' };
  var B = { name: 'B' };
  var C = { name: 'C' };
  var D = { name: 'D' };
  
  var key1 = L.init(list);
  var key2 = L.init(list);
  
  L.init(A);
  L.init(B);
  L.init(C);
  L.init(D);
  
  assert.notEqual('undefined', typeof key1);
  assert.notEqual('undefined', typeof key2);
  assert.notEqual(key1, key2);
  
  assert.ok(L.isEmpty(list));
  assert.equal(null, L.peek(list));
  
  assert.ok(L.isEmpty(list, key1));
  assert.equal(null, L.peek(list, key1));
  
  assert.ok(L.isEmpty(list, key2));
  assert.equal(null, L.peek(list, key2));

  L.append(list, A);
  // list -> A
  // list2 -> (empty)
  assert.equal(false, L.isEmpty(list));
  assert.equal(false, L.isEmpty(list, key1));
  assert.equal(A, L.peek(list));
  assert.equal(A, L.peek(list, key1));
  assert.equal(null, L.peek(list, key2));
  
  L.append(list, B);
  // list -> A -> B
  // list2 -> (empty)
  assert.equal(false, L.isEmpty(list));
  assert.equal(false, L.isEmpty(list, key1));
  assert.equal(A, L.peek(list));
  assert.equal(A, L.peek(list, key1));
  assert.equal(null, L.peek(list, key2));
  
  L.append(list, A, key2);
  // list -> A -> B
  // list2 -> A
  assert.equal(A, L.peek(list));
  assert.equal(A, L.peek(list, key1));
  assert.equal(A, L.peek(list, key2));
  
  L.append(list, B, key2);
  // list -> A -> B
  // list2 -> A -> B
  assert.equal(A, L.peek(list));
  assert.equal(A, L.peek(list, key1));
  assert.equal(A, L.peek(list, key2));
  
  L.append(list, C, key2);
  // list -> A -> B
  // list2 -> A -> B -> C
  assert.equal(A, L.peek(list));
  assert.equal(A, L.peek(list, key1));
  assert.equal(A, L.peek(list, key2));
  
  L.append(list, D, key2);
  // list -> A -> B
  // list2 -> A -> B -> C -> D
  assert.equal(A, L.peek(list));
  assert.equal(A, L.peek(list, key1));
  assert.equal(A, L.peek(list, key2));
  
  // A is removed from the first list by default.
  L.remove(A);
  // list -> B
  // list2 -> A -> B -> C -> D
  assert.equal(false, L.isEmpty(list));
  assert.equal(false, L.isEmpty(list, key1));
  assert.equal(false, L.isEmpty(list, key2));
  assert.equal(B, L.peek(list));
  assert.equal(B, L.peek(list, key1));
  assert.equal(A, L.peek(list, key2));
  
  // A is removed from the specified list.
  L.remove(A, key2);
  // list -> B
  // list2 -> B -> C -> D
  assert.equal(false, L.isEmpty(list));
  assert.equal(false, L.isEmpty(list, key1));
  assert.equal(false, L.isEmpty(list, key2));
  assert.equal(B, L.peek(list));
  assert.equal(B, L.peek(list, key1));
  assert.equal(B, L.peek(list, key2));
  
  
  var x = L.shift(list, key2);
  assert.equal(B, x);
  // list -> (empty)
  // list2 -> C -> D
  assert.equal(false, L.isEmpty(list));
  assert.equal(false, L.isEmpty(list, key1));
  assert.equal(false, L.isEmpty(list, key2));
  assert.equal(B, L.peek(list));
  assert.equal(B, L.peek(list, key1));
  assert.equal(C, L.peek(list, key2));
  
  x = L.shift(list, key2);
  assert.equal(C, x);
  // list -> B
  // list2 -> D
  assert.equal(false, L.isEmpty(list));
  assert.equal(false, L.isEmpty(list, key1));
  assert.equal(false, L.isEmpty(list, key2));
  assert.equal(B, L.peek(list));
  assert.equal(B, L.peek(list, key1));
  assert.equal(D, L.peek(list, key2));
  
  L.remove(D, key2);
  // list -> B
  // list2 -> (empty)
  assert.equal(null, L.peek(list, key2));
  
  assert.ok(L.isEmpty(list, key2));
  
  L.append(list, D, key2);
  // list2 -> D
  assert.equal(D, L.peek(list, key2));
  
  L.append(list, C, key2);
  L.append(list, B, key2);
  L.append(list, A, key2);
  // list2 -> D -> C -> B -> A
  
  // Append should REMOVE C from the list and append it to the end.
  L.append(list, C, key2);
  // list2 -> D -> B -> A -> C
  
  assert.equal(D, L.shift(list, key2));
  // list2 -> B -> A -> C
  
  assert.equal(B, L.peek(list, key2));
  assert.equal(B, L.shift(list, key2));
  // list2 -> A -> C
  
  assert.equal(A, L.peek(list, key2));
  assert.equal(A, L.shift(list, key2));
  // list2 -> C
  
  assert.equal(C, L.peek(list, key2));
  assert.equal(C, L.shift(list, key2));
  // list2 -> (empty)
  
  assert.ok(L.isEmpty(list, key2));
  
  // list -> B
  assert.equal(B, L.peek(list));
  assert.equal(B, L.peek(list, key1));
  assert.equal(B, L.shift(list, key1));
  // list -> (empty)
  
  assert.ok(L.isEmpty(list, key1));
  
};
