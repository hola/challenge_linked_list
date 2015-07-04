var BlinkedList = require('./BlinkedList.js');

var list = new BlinkedList();
var assert = require("assert");
var length = 30;

for (var i = 0; i < length; i++) {
    list.push(i*2);
}
////////////////////////////////////////////////////////////////
console.log('Iterator next(), current(), reset() test.');
var iterateArray = [], iterateArrayExpected = [];
i = 0;
while (list.next()) {
    iterateArrayExpected.push(i++*2);
    iterateArray.push(list.current()*2);
}
assert.deepEqual(iterateArray, iterateArrayExpected);
iterateArray = []; iterateArrayExpected = [];
i = 0;
list.reset();
while (list.next()) {
    iterateArrayExpected.push(i++*2);
    iterateArray.push(list.current()*2);
}
assert.deepEqual(iterateArray, iterateArrayExpected);
////////////////////////////////////////////////////////////////
console.log('List get() test.');
iterateArray = []; iterateArrayExpected = [];
for (i = 0; i < length; i++) {
    iterateArrayExpected.push(i*2);
    iterateArray.push(list.get(i));
}
assert.deepEqual(iterateArray, iterateArrayExpected);
////////////////////////////////////////////////////////////////
console.log('Random access get() test.');
var random, randomArray = [], randomArrayExpected = [];
for (i = 0; i < length; i++) {
    random = Math.floor(Math.random() * length);
    randomArrayExpected.push(random*2);
    randomArray.push(list.get(random));
}
assert.deepEqual(randomArray, randomArrayExpected);
////////////////////////////////////////////////////////////////
console.log('List remove() test.');
list = new BlinkedList();
for ( i = 0; i < 10; i++) {
    list.push(i);
}
list.remove(5);
assert.deepEqual(list.toArray(), [0, 1, 2, 3, 4, 6, 7, 8, 9]);
////////////////////////////////////////////////////////////////
console.log('List removeIndex() test.');
list = new BlinkedList();
for ( i = 0; i < 10; i++) {
    list.push(i);
}
list.removeIndex(5);
assert.deepEqual(list.toArray(), [0, 1, 2, 3, 4, 6, 7, 8, 9]);
////////////////////////////////////////////////////////////////
console.log('List clear() test.');
list = new BlinkedList();
for ( i = 0; i < length; i++) {
    list.push(i);
}
list.clear();
assert.strictEqual(list.length, 0);
////////////////////////////////////////////////////////////////
console.log('List clear() test.');
list = new BlinkedList();
for ( i = 0; i < length; i++) {
    list.push(i);
}
list.clear();
assert.strictEqual(list.length, 0);
////////////////////////////////////////////////////////////////
console.log('List pop() test.');
list = new BlinkedList();
var popArray = [], popArrayExpected = [];
for ( i = 0; i < length; i++) {
    list.push(i);
}
for ( i = 0; i < length; i++) {
    popArray.push(list.pop());
    popArrayExpected.push(i);
}
assert.deepEqual(popArray, popArrayExpected.reverse());
////////////////////////////////////////////////////////////////
console.log('List shift() test.');
list = new BlinkedList();
var shiftArray = [], shiftArrayExpected = [];
for ( i = 0; i < length; i++) {
    list.push(i);
}
for ( i = 0; i < length; i++) {
    shiftArray.push(list.shift());
    shiftArrayExpected.push(i);
}
assert.deepEqual(shiftArray, shiftArrayExpected);
////////////////////////////////////////////////////////////////
console.log('List unshift() test.');
list = new BlinkedList();
var unshiftArray = [], unshiftArrayExpected = [];
for ( i = 0; i < length; i++) {
    list.unshift(i);
    unshiftArrayExpected.push(i);
}

assert.deepEqual(list.toArray(), unshiftArrayExpected.reverse());
////////////////////////////////////////////////////////////////
console.log('Miltiple operations test.');
list = new BlinkedList();
var multipleArrayExpected = [8, 0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10, 12] ;
for ( i = 0; i < 7; i++) {
    list.push(i*2);
}
//list.pop();

for ( i = 0; i < 7; i++) {
    list.push(i*2);
}

list.unshift(8);
list.unshift(7);
list.remove(12);
list.shift();

assert.deepEqual(list.toArray(), multipleArrayExpected);
////////////////////////////////////////////////////////////////