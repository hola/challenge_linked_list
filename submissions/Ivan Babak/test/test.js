'use strict';

// Tests taken from https://github.com/joyent/node/blob/857975d5e7e0d7bf38577db0478d9e5ede79922e/test/simple/test-timers-linked-list.js

var assert = require('assert');

module.exports = function (L) {

  var list = { name: 'list' };
  var A = { name: 'A' };
  var B = { name: 'B' };
  var C = { name: 'C' };
  var D = { name: 'D' };


  L.init(list);
  L.init(A);
  L.init(B);
  L.init(C);
  L.init(D);

  assert.ok(L.isEmpty(list));
  assert.equal(null, L.peek(list));

  L.append(list, A);
  // list -> A
  assert.equal(A, L.peek(list));

  L.append(list, B);
  // list -> A -> B
  assert.equal(A, L.peek(list));

  L.append(list, C);
  // list -> A -> B -> C
  assert.equal(A, L.peek(list));

  L.append(list, D);
  // list -> A -> B -> C -> D
  assert.equal(A, L.peek(list));

  var x = L.shift(list);
  assert.equal(A, x);
  // list -> B -> C -> D
  assert.equal(B, L.peek(list));

  x = L.shift(list);
  assert.equal(B, x);
  // list -> C -> D
  assert.equal(C, L.peek(list));

  // B is already removed, so removing it again shouldn't hurt.
  L.remove(B);
  // list -> C -> D
  assert.equal(C, L.peek(list));

  // Put B back on the list
  L.append(list, B);
  // list -> C -> D -> B
  assert.equal(C, L.peek(list));

  L.remove(C);
  // list -> D -> B
  assert.equal(D, L.peek(list));

  L.remove(B);
  // list -> D
  assert.equal(D, L.peek(list));

  L.remove(D);
  // list
  assert.equal(null, L.peek(list));


  assert.ok(L.isEmpty(list));


  L.append(list, D);
  // list -> D
  assert.equal(D, L.peek(list));

  L.append(list, C);
  L.append(list, B);
  L.append(list, A);
  // list -> D -> C -> B -> A

  // Append should REMOVE C from the list and append it to the end.
  L.append(list, C);

  // list -> D -> B -> A -> C
  assert.equal(D, L.shift(list));
  // list -> B -> A -> C
  assert.equal(B, L.peek(list));
  assert.equal(B, L.shift(list));
  // list -> A -> C
  assert.equal(A, L.peek(list));
  assert.equal(A, L.shift(list));
  // list -> C
  assert.equal(C, L.peek(list));
  assert.equal(C, L.shift(list));
  // list
  assert.ok(L.isEmpty(list));

};
