
var common = require('../common');
var assert = require('assert');
var L = require('_generic_linklist');
var list = { name: 'list' };
var q1 = { name: 'q1' };
var q2 = { name: 'q2' };
var q11 = { name: 'q11' };
var q12 = { name: 'q12' };
var q21 = { name: 'q21' };
var q22 = { name: 'q22' };
var q111 = { name: 'q111' };
var q112 = { name: 'q112' };
var q121 = { name: 'q121' };
var q122 = { name: 'q122' };
var q211 = { name: 'q211' };
var q212 = { name: 'q212' };
var q221 = { name: 'q221' };
var q222 = { name: 'q222' };
var q111I1 = { name: 'q111I1' };
var q111I2 = { name: 'q111I2' };
var q112I1 = { name: 'q112I1' };
var q112I2 = { name: 'q112I2' };
var q121I1 = { name: 'q121I1' };
var q121I2 = { name: 'q121I2' };
var q122I1 = { name: 'q122I1' };
var q122I2 = { name: 'q122I2' };
var q211I1 = { name: 'q211I1' };
var q211I2 = { name: 'q211I2' };
var q212I1 = { name: 'q212I1' };
var q212I2 = { name: 'q212I2' };
var q221I1 = { name: 'q221I1' };
var q221I2 = { name: 'q221I2' };
var q222I1 = { name: 'q222I1' };
var q222I2 = { name: 'q222I2' };

L.init(q1);
L.init(q2);
L.init(q11);
L.init(q12);
L.init(q21);
L.init(q22);
L.init(q111);
L.init(q112);
L.init(q121);
L.init(q122);
L.init(q211);
L.init(q212);
L.init(q221);
L.init(q222);
L.init(list);

L.append(q111, q111I1);
L.append(q111, q111I2);
L.append(q112, q112I1);
L.append(q112, q112I2);
L.append(q121, q121I1);
L.append(q121, q121I2);
L.append(q122, q122I1);
L.append(q122, q122I2);
L.append(q211, q211I1);
L.append(q211, q211I2);
L.append(q212, q212I1);
L.append(q212, q212I2);
L.append(q221, q221I1);
L.append(q221, q221I2);
L.append(q222, q222I1);
L.append(q222, q222I2);

L.append(q11, q111);
L.append(q11, q112);

L.append(q12, q121);
L.append(q12, q122);

L.append(q21, q211);
L.append(q21, q212);

L.append(q22, q221);
L.append(q22, q222);

L.append(q1, q11);
L.append(q1, q12);

L.append(q2, q21);
L.append(q2, q22);

L.append(list, q1);
L.append(list, q2);

assert.equal(q1, L.peek(list));
assert.equal(q11, L.peek(q1));
assert.equal(q21, L.peek(q2));
assert.equal(q111, L.peek(q11));
assert.equal(q121, L.peek(q12));
assert.equal(q211, L.peek(q21));
assert.equal(q221, L.peek(q22));

assert.equal(q111I1, L.peek(q111));
assert.equal(q112I1, L.peek(q112));
assert.equal(q121I1, L.peek(q121));
assert.equal(q122I1, L.peek(q122));
assert.equal(q211I1, L.peek(q211));
assert.equal(q212I1, L.peek(q212));
assert.equal(q221I1, L.peek(q221));
assert.equal(q222I1, L.peek(q222));

L.remove(q112, q11);
L.remove(q12, q1);
L.append(list, q112);
assert.equal(q112I1, L.peek(q112));
assert.equal(q111, L.peek(q11));
assert.equal(q1, L.peek(list));
assert.equal(q1, L.shift(list));
assert.equal(q2, L.shift(list));
assert.equal(q112, L.peek(list));
assert.equal(q11, L.shift(q1));
assert.equal(null, L.peek(q1));