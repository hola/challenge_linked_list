
var common = require('../common');
var assert = require('assert');
var L = require('_generic_linklist');

var q1 = { name: 'innerList1' };
var q1item1 = { name: 'q1item1' };
var q1item2 = { name: 'q1item2' };
var q1item3 = { name: 'q1item3' };

var q2 = { name: 'innerList2' };
var q2item1 = { name: 'q2item1' };
var q2item2 = { name: 'q2item2' };

var emptyQ = { name: 'emptyQ' };

var q3 = { name: 'innerList3' };
var q3item1 = { name: 'q3item1' };
var q3item2 = { name: 'q3item2' };
var q3item3 = { name: 'q3item3' };

var list = { name: 'list' };

L.init(q1);
L.init(q2);
L.init(emptyQ);
L.init(q3);
L.init(list);

L.append(q1, q1item1);
L.append(q1, q1item2);
L.append(q1, q1item3);

// qi -> q1item1 -> q1item2 -> q1item3
assert.ok(L.isList(q1));
assert.ok(!L.isEmpty(q1));
assert.equal(q1item1, L.peek(q1));

L.append(q2, q2item1);
L.append(q2, q2item2);

// q2 -> q2item1 -> q2item2
assert.ok(L.isList(q2));
assert.ok(!L.isEmpty(q2));
assert.equal(q2item1, L.peek(q2));

assert.ok(L.isList(emptyQ));
assert.ok(L.isEmpty(emptyQ));

L.append(q3, q3item1);
L.append(q3, q3item2);
L.append(q3, q3item3);

// q3 -> q3item1 -> q3item2 -> q3item3
assert.ok(L.isList(q3));
assert.ok(!L.isEmpty(q3));
assert.equal(q3item1, L.peek(q3));

assert.ok(L.isList(list));
assert.ok(L.isEmpty(list));
assert.equal(null, L.peek(list));


L.append(list, q1);
// list -> q1 = {q1item1 -> q1item2 -> q1item3}
assert.equal(q1, L.peek(list));

L.append(list, q2);
// list -> q1  = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2 -> q2item3}
assert.equal(q1, L.peek(list));

L.append(list, emptyQ);
// list -> q1  = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2 -> q2item3} -> emptyQ = {}
assert.equal(q1, L.peek(list));

L.append(list, q3);
// list -> q1  = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2 -> q2item3} -> emptyQ = {} -> q3  = {q3item1 -> q3item2 -> q3item3}
assert.equal(q1, L.peek(list));

//removing
L.remove(q2, list);
// list -> q1  = {q1item1 -> q1item2 -> q1item3} -> emptyQ = {} -> q3  = {q3item1 -> q3item2 -> q3item3}
assert.equal(q1, L.peek(list));

L.remove(q1, list);
// list -> emptyQ = {} -> q3  = {q3item1 -> q3item2 -> q3item3}
assert.equal(emptyQ, L.peek(list));

L.remove(q3, list);
// list -> emptyQ = {}
assert.equal(emptyQ, L.peek(list));

L.remove(emptyQ, list);
// list 
assert.equal(null, L.peek(list));

L.append(list, q1);
// list -> q1 = {q1item1 -> q1item2 -> q1item3}
L.append(list, q2);
// list -> q1  = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2 -> q2item3}
L.append(list, emptyQ);
// list -> q1  = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2 -> q2item3} -> emptyQ = {}
L.append(list, q3);
// list -> q1  = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2 -> q2item3} -> emptyQ = {} -> q3  = {q3item1 -> q3item2 -> q3item3}

var x = L.shift(list);
assert.equal(q1, x);
var q1item4 = { name: 'q1item4' };
L.append(x, q1item4);
// x = q1 -> q1item1 -> q1item2 -> q1item3 -> q1item4
assert.equal(q1item1, L.shift(x));
// x = q1 -> q1item2 -> q1item3 -> q1item4
assert.equal(q1item2, L.shift(x));
// x = q1 -> q1item3 -> q1item4
assert.equal(q1item3, L.shift(x));
// x = q1 -> q1item4
assert.equal(q1item4, L.shift(x));
// x = q1
assert.equal(q1, L.shift(x));
assert.equal(null, L.peek(x));
assert.ok(L.isEmpty(x));

// list -> q2 = {q2item1 -> q2item2 -> q2item3} -> emptyQ = {} -> q3  = {q3item1 -> q3item2 -> q3item3}
assert.equal(q2, L.peek(list));
// q1 is already removed, so removing it again shouldn't hurt.
L.remove(q1, list);

// Put emptyQ on the end of the list
L.append(list, emptyQ);

// list -> q2 = {q2item1 -> q2item2 -> q2item3} -> q3  = {q3item1 -> q3item2 -> q3item3} -> emptyQ = {}  
assert.equal(q2, L.peek(list));

L.remove(q2, list);
// list -> q3  = {q3item1 -> q3item2 -> q3item3} -> emptyQ = {}  
assert.equal(q3, L.peek(list));

assert.equal(q3, L.shift(list));
// list -> emptyQ = {}  
assert.equal(emptyQ, L.peek(list));

x = L.shift(list);
// list
assert.equal(null, L.peek(list));
assert.ok(L.isEmpty(list));

// x = emptyQ
assert.equal(null, L.peek(x));
assert.ok(L.isList(x));
assert.ok(L.isEmpty(x));
