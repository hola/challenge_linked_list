/*******************************************************************************
The MIT License (MIT)

Copyright (c) 2015 sompylasar <babak.john@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*******************************************************************************/

'use strict';

// Based on https://github.com/joyent/node/blob/master/lib/_linklist.js
// Reimplemented for the contest: http://hola.org/challenge_js?l
// Extended the API in a backwards-compatible way to allow list parent to hold two or more different lists in the parent list object.
// Example of the extended API usage:
//    var L = require('./linklist');
//
//    var list = { name: 'list' };
//    var A = { name: 'A' };
//
//    var key1 = L.init(list);
//    var key2 = L.init(list);
//    L.init(A);
//
//    L.append(list, A, key1);
//    L.append(list, A, key2);
//    var x = L.shift(list, key2);
//    assert.equal(A, x);
//    assert.equal(true, L.isEmpty(list, key2));
//    assert.equal(false, L.isEmpty(list, key1));
//    assert.equal(A, L.peek(list, key1));
//


// The list links are stored as an array at a randomly generated property
// that should not clash with the hardcoded properties on user-defined objects.
// Previous item links are stored at odd indexes, next item links are stored
// at even indexes of the array.
var _LINKS = String(Math.random());


function printItem(prefix, item, key) {
  key = key || 0;
  var itemLinks = item[_LINKS];
  
  console.log(prefix, '"' + item.name + '"',
    '_prev: ' + (itemLinks[key] ? '"' + itemLinks[key].name + '"' : 'null'),
    '_next: ' + (itemLinks[key+1] ? '"' + itemLinks[key+1].name + '"' : 'null')
  );
  
  var first = item;
  while (itemLinks[key] && itemLinks[key] !== first) {
    item = itemLinks[key];
    itemLinks = item[_LINKS];
    console.log(' -> "' + item.name + '"',
      '_prev: ' + (itemLinks[key] ? '"' + itemLinks[key].name + '"' : 'null'),
      '_next: ' + (itemLinks[key+1] ? '"' + itemLinks[key+1].name + '"' : 'null')
    );
  }
}

function printNewLine() {
  console.log('');
}


function init(head) {
  var key = 0;
  
  if (head[_LINKS]) {
    key = head[_LINKS].length;
  }
  else {
    Object.defineProperty(head, _LINKS, {
      value: [],
      enumerable: false,
      writable: false
    });
  }
  
  head[_LINKS][key]   = head;
  head[_LINKS][key+1] = head;
  
  //printItem('init', head, key);
  //printNewLine();
  
  return key;
}
exports.init = init;


// show the front item
function peek(head, key) {
  key = key || 0;
  
  //printItem('peek', head, key);
  //printNewLine();
  
  if (head[_LINKS][key] == head) return null;
  
  return head[_LINKS][key];
}
exports.peek = peek;


// remove the front item from the list
function shift(head, key) {
  key = key || 0;
  
  //printItem('shift: before head ===', head, key);
  
  var first = head[_LINKS][key];
  remove(first, key);
  
  //printItem('shift: after head ===', head, key);
  //printNewLine();
  
  return first;
}
exports.shift = shift;


// remove an item from its list
function remove(item, key) {
  key = key || 0;
  var itemLinks = item[_LINKS];
  var itemPrev = itemLinks[key];
  var itemNext = itemLinks[key+1];
  
  //printItem('remove: before item ===', item, key);
  
  if (itemNext) {
    itemNext[_LINKS][key] = itemPrev;
  }
  
  if (itemPrev) {
    itemPrev[_LINKS][key+1] = itemNext;
  }
  
  itemLinks[key]   = null;
  itemLinks[key+1] = null;
  
  //printItem('remove: after item ===', item, key);
  //printNewLine();
}
exports.remove = remove;


// remove an item from its list and place at the end.
function append(head, item, key) {
  key = key || 0;
  var headLinks = head[_LINKS];
  var itemLinks = item[_LINKS];
  
  //printItem('append: before head ===', head, key);
  //printItem('append: before item ===', item, key);
  
  remove(item, key);
  itemLinks[key+1] = headLinks[key+1];
  headLinks[key+1][_LINKS][key] = item;
  itemLinks[key] = head;
  headLinks[key+1] = item;
  
  //printItem('append: after head ===', head, key);
  //printItem('append: after item ===', item, key);
  //printNewLine();
  
  return item;
}
exports.append = append;


function isEmpty(head, key) {
  key = key || 0;
  
  //printItem('isEmpty', head, key);
  //printNewLine();
  
  return head[_LINKS][key+1] === head;
}
exports.isEmpty = isEmpty;
