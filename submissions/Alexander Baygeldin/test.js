'use strict';

var List = require('_linklist');
var QList = require('./linklist').List;

var i, start;
var AMOUNT = 1000000;

var obj = {};
List.init(obj);

var parent = {};
parent.firstList = new QList();

/* TEST 1 (custom linklist is ~30% faster) */

start = Date.now();

for (i = 0; i < AMOUNT; i++) {
    List.append(obj, { id: i });
}

console.log("Standard linklist append: %d", Date.now() - start);

start = Date.now();

for (i = 0; i < AMOUNT; i++) {
    parent.firstList.append({ id: i });
}

console.log("Custom linklist append: %d", Date.now() - start);

/* TEST 2 (custom linklist is ~20% faster) */

start = Date.now();

while (!List.isEmpty(obj)) {
    List.shift(obj);
}

console.log("Standard linklist shift: %d", Date.now() - start);

start = Date.now();

while (!parent.firstList.isEmpty()) {
    parent.firstList.shift();
}

console.log("Custom linklist shift: %d", Date.now() - start);

/* TEST 3 (custom linklist is ~30% faster) */

for (i = 0; i < AMOUNT; i++) {
    List.append(obj, { id: i });
}

start = Date.now();

var node = obj._idleNext;

while (node != obj) {
    (function(elem) {})(node._idleNext); // doing something with data
    node = node._idleNext;
}

console.log("Standard linklist bypass: %d", Date.now() - start);

for (i = 0; i < AMOUNT; i++) {
    parent.firstList.append({ id: i });
}

start = Date.now();

parent.firstList.forEach(function(elem) {  /* doing something with data */ });

console.log("Custom linklist bypass: %d", Date.now() - start);

/* REMOVING SPECIFIC ELEMENT */

var myObject = "remove me!";

// standard linklist extends object with _idleNext and _idlePrev,
// so it's easy to remove it from its list
List.append(obj, myObject);
List.remove(obj, myObject);

// custom linklist can do it this way
var elem = parent.firstList.append(myObject);
parent.firstList.remove(elem);
