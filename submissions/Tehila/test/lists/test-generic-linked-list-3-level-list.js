
var common = require('../common');
var assert = require('assert');
var L = require('_generic_linklist');

var idleItem = { name: 'idleItem' };
var q1 = { name: 'innerList1' };
var q1item1 = { name: 'q1item1' };
var q1item2 = { name: 'q1item2' };

var q2 = { name: 'innerList2' };
var q2item1 = { name: 'q2item1' };
var q2item2 = { name: 'q2item2' };

var q3 = { name: 'innerList3' };
var q31 = { name: 'innerInnerList1' };
var q31item1 = { name: 'q31item1' };
var q31item2 = { name: 'q31item2' };
var q32 = { name: 'innerInnerList2' };
var q32item1 = { name: 'q32item1' };
var q32item2 = { name: 'q32item2' };
var q3IdleItem = { name: 'q3IdleItem' };
var list = { name: 'list' };

L.init(q1);
L.init(q2);
L.init(q31);
L.init(q32);
L.init(q3);
L.init(list);

L.append(q1, q1item1);
L.append(q1, q1item2);

// qi -> q1item1 -> q1item2
assert.ok(L.isList(q1));
assert.ok(!L.isEmpty(q1));
assert.equal(q1item1, L.peek(q1));

L.append(q2, q2item1);
L.append(q2, q2item2);

// q2 -> q2item1 -> q2item2
assert.ok(L.isList(q2));
assert.ok(!L.isEmpty(q2));
assert.equal(q2item1, L.peek(q2));

L.append(q31, q31item1);
L.append(q31, q31item2);

// q31 -> q31item1 -> q31item2
assert.ok(L.isList(q31));
assert.ok(!L.isEmpty(q31));
assert.equal(q31item1, L.peek(q31));

L.append(q32, q32item1);
L.append(q32, q32item2);

// q32 -> q32item1 -> q32item2
assert.ok(L.isList(q32));
assert.ok(!L.isEmpty(q32));
assert.equal(q32item1, L.peek(q32));

L.append(q3, q31);
L.append(q3, q3IdleItem);
L.append(q3, q32);

// q3 -> q31 = {q31item1 -> q31item2} -> q3IdleItem -> q32 = {q32item1 -> q32item2}
assert.ok(L.isList(q31));
assert.ok(!L.isEmpty(q31));
assert.equal(q31item1, L.peek(q31));

assert.ok(L.isList(list));
assert.ok(L.isEmpty(list));
assert.equal(null, L.peek(list));


L.append(list, q1);
// list -> q1 = {q1item1 -> q1item2}
assert.equal(q1, L.peek(list));

L.append(list, q2);
// list -> q1  = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2}
assert.equal(q1, L.peek(list));

L.append(list, q3);
// list -> q1  = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2} -> q3 = {q31 = {q31item1 -> q31item2} -> q3IdleItem -> q32 = {q32item1 -> q32item2}}
assert.equal(q1, L.peek(list));

L.append(list, idleItem);
// list -> q1  = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2} -> q3 = {q31 = {q31item1 -> q31item2} -> q3IdleItem -> q32 = {q32item1 -> q32item2}} -> idleItem
assert.equal(q1, L.peek(list));

L.append(list, q1);
// list -> q2 = {q2item1 -> q2item2} -> q3 = {q31 = {q31item1 -> q31item2} -> q3IdleItem -> q32 = {q32item1 -> q32item2}} -> idleItem ->q1 = {q1item1 -> q1item2 -> q1item3}
assert.equal(q2, L.peek(list));

L.append(list, q2);
// list -> q3 = {q31 = {q31item1 -> q31item2} -> q3IdleItem -> q32 = {q32item1 -> q32item2}} -> idleItem ->q1 = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2}
assert.equal(q3, L.peek(list));

var x = L.shift(list);
// list -> idleItem ->q1 = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2}
assert.equal(idleItem, L.peek(list));

assert.equal(q3, x);

// x = q3 = {q31 = {q31item1 -> q31item2} -> q3IdleItem -> q32 = {q32item1 -> q32item2}}
var y = L.shift(x)

// y = q31 -> q31item1 -> q31item2
assert.equal(q31item1, L.shift(y));
// y = q31 -> q31item1
assert.equal(q31item2, L.shift(y));
// y = q31
assert.equal(q31, L.shift(y));
assert.equal(null, L.peek(y));
assert.ok(L.isEmpty(y));

// x = q3 -> q3IdleItem -> q32 = {q32item1 -> q32item2}}
assert.equal(q3IdleItem, L.shift(x));

// x = q3 -> q32 = {q32item1 -> q32item2}}

var z = L.shift(x)

assert.equal(q32, z);
// y = q32 -> q32item1 -> q32item2
//assert.equal(q32item1, L.peek(z));
// y = q32 -> q32item2
//assert.equal(q32item2, L.shift(z));

//assert.equal(q32, L.shift(z));
//assert.equal(null, L.peek(z));
//assert.ok(L.isEmpty(z));

assert.equal(q3, L.shift(x));
assert.equal(null, L.peek(x));
assert.ok(L.isEmpty(x));

assert.equal(idleItem, L.shift(list));

// list -> q1  = {q1item1 -> q1item2 -> q1item3} -> q2 = {q2item1 -> q2item2}
assert.equal(q1, L.peek(list));

x = L.shift(list);
// list -> q2 = {q2item1 -> q2item2}
assert.equal(q2, L.peek(list));

assert.equal(q1, x);

// q1 -> q1item1 -> q1item2
assert.equal(q1item1, L.peek(x));

L.remove(q2, list)
// list
assert.equal(null, L.peek(list));
assert.ok(L.isEmpty(list));
