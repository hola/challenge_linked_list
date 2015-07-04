
var common = require('../common');
var assert = require('assert');
var L = require('_generic_linklist');


var list = { name: 'list' };
var listB = { name: 'listB' };

var A = { name: 'A' };
var C = { name: 'C' };
var D = { name: 'D' };

L.init(list);
L.init(listB);

assert.ok(L.isEmpty(list));
assert.equal(null, L.peek(list));
assert.ok(L.isEmpty(listB));
assert.equal(null, L.peek(listB));

L.append(list, A);
// list -> A
assert.equal(A, L.peek(list));

L.append(list, listB);
// list -> A -> listB
assert.equal(A, L.peek(list));

L.append(list, C);
// list -> A -> listB -> C
assert.equal(A, L.peek(list));

L.append(list, D);
// list -> A -> listB -> C -> D
assert.equal(A, L.peek(list));

var x = L.shift(list);
assert.equal(A, x);
// list -> listB -> C -> D
assert.equal(listB, L.peek(list));

x = L.shift(list);
assert.equal(listB, x);
// list -> C -> D
assert.equal(C, L.peek(list));

// listB is already removed, so removing it again shouldn't hurt.
L.remove(listB, list);
// list -> C -> D
assert.equal(C, L.peek(list));

// Put listB back on the list
L.append(list, listB);
// list -> C -> D -> listB
assert.equal(C, L.peek(list));

L.remove(C, list);
// list -> D -> listB
assert.equal(D, L.peek(list));

L.remove(listB, list);
// list -> D
assert.equal(D, L.peek(list));

L.remove(D, list);
// list
assert.equal(null, L.peek(list));


assert.ok(L.isEmpty(list));


L.append(list, D);
// list -> D
assert.equal(D, L.peek(list));

L.append(list, C);
L.append(list, listB);
L.append(list, A);
// list -> D -> C -> listB -> A

// Append should REMOVE C from the list and append it to the end.
L.append(list, C);

// list -> D -> listB -> A -> C
assert.equal(D, L.shift(list));
// list -> listB -> A -> C
assert.equal(listB, L.peek(list));
assert.equal(listB, L.shift(list));
// list -> A -> C
assert.equal(A, L.peek(list));
assert.equal(A, L.shift(list));
// list -> C
assert.equal(C, L.peek(list));
assert.equal(C, L.shift(list));
// list
assert.ok(L.isEmpty(list));

