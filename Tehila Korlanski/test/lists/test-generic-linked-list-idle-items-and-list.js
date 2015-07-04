
var common = require('../common');
var assert = require('assert');
var L = require('_generic_linklist');

var innerList = { name: 'innerList' };
var innerListItemA = { name: 'innerListA' };
var innerListItemB = { name: 'innerListB' };
var innerListItemC = { name: 'innerListC' };

var list = { name: 'list' };
var A = { name: 'A' };
var C = { name: 'C' };
var D = { name: 'D' };

L.init(list);
L.init(innerList);

assert.ok(L.isList(list));
assert.ok(L.isEmpty(list));
assert.equal(null, L.peek(list));

assert.ok(L.isList(innerList));
assert.ok(L.isEmpty(innerList));
assert.equal(null, L.peek(innerList));

assert.ok(!L.isEmpty(A));

L.append(innerList, innerListItemA);
// innerList -> innerListItemA
assert.equal(innerListItemA, L.peek(innerList));

L.append(innerList, innerListItemB);
// innerList -> innerListItemA -> innerListItemB
assert.equal(innerListItemA, L.peek(innerList));

L.append(innerList, innerListItemC);
// innerList -> innerListItemA -> innerListItemB -> innerListItemC
assert.equal(innerListItemA, L.peek(innerList));


L.append(list, A);
// list -> A
assert.equal(A, L.peek(list));

L.append(list, innerList);
// list -> A -> innerList
assert.equal(A, L.peek(list));

L.append(list, C);
// list -> A -> innerList = {innerListItemA -> innerListItemB -> innerListItemC} -> C
assert.equal(A, L.peek(list));

L.append(list, D);
// list -> A -> innerList = {innerListItemA -> innerListItemB -> innerListItemC} -> C -> D
assert.equal(A, L.peek(list));

var x = L.shift(list);
assert.equal(A, x);
// list -> innerList = {innerListItemA -> innerListItemB -> innerListItemC} -> C -> D
assert.equal(innerList, L.peek(list));

x = L.shift(list);
assert.equal(innerList, x);
// list -> C -> D
assert.equal(C, L.peek(list));

// innerList is already removed, so removing it again shouldn't hurt.
L.remove(innerList, list);
// list -> C -> D
assert.equal(C, L.peek(list));

// Put innerList back on the list
L.append(list, innerList);
// list -> C -> D -> innerList = {innerListItemA -> innerListItemB -> innerListItemC} 
assert.equal(C, L.peek(list));

L.remove(C, list);
// list -> D -> innerList = {innerListItemA -> innerListItemB -> innerListItemC} 
assert.equal(D, L.peek(list));

L.remove(innerList, list);
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

L.remove(innerListItemB, innerList);
// innerList -> innerListItemA -> innerListItemC
L.append(innerList, innerListItemA);
// innerList -> innerListItemC -> innerListItemA

L.append(list, innerList);
L.append(list, A);
// list -> D -> C -> innerList = {innerListItemC -> innerListItemA} -> A

// Append should REMOVE C from the list and append it to the end.
L.append(list, C);

// list -> D -> innerList = {innerListItemC -> innerListItemA} -> A -> C
// Append should REMOVE innerList from the list and append it to the end.
L.append(list, innerList);

// list -> D -> A -> C -> innerList = {innerListItemA -> innerListItemC} 
assert.equal(D, L.shift(list));
// list -> A -> C -> innerList
assert.equal(A, L.peek(list));
assert.equal(A, L.shift(list));
// list -> C -> innerList
assert.equal(C, L.peek(list));
assert.equal(C, L.shift(list));
// list -> innerList
assert.equal(innerList, L.peek(list));
x = L.shift(list);
assert.equal(innerList, x);
// list
assert.ok(L.isList(list));
assert.ok(L.isEmpty(list));

assert.equal(innerListItemC, L.shift(x));
// innerList -> innerListItemA 
assert.equal(innerListItemA, L.peek(x));
assert.equal(innerListItemA, L.shift(x));
// innerList
assert.equal(null, L.peek(x));
assert.ok(L.isList(x));
assert.ok(L.isEmpty(x));


