// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function init() {
  this._idleNext␞ = this;
  this._idlePrev␞ = this;
}
module.exports.init = init;


// show the most idle item
function peek() {
  if (this._idlePrev␞ == this) return null;
  return this._idlePrev␞;
}
module.exports.peek = peek;


// remove the most idle item from the list
function shift() {
  var first = this._idlePrev␞;
  remove(first);
  return first;
}
module.exports.shift = shift;


// remove a item from its list
function remove(item) {
  if (item._idleNext␞) {
    item._idleNext␞._idlePrev␞ = item._idlePrev␞;
  }

  if (item._idlePrev␞) {
    item._idlePrev␞._idleNext␞ = item._idleNext␞;
  }

  item._idleNext␞ = null;
  item._idlePrev␞ = null;
}
module.exports.remove = remove;


// remove a item from its list and place at the end.
function append(item) {
  remove(item);
  item._idleNext␞ = this._idleNext␞;
  this._idleNext␞._idlePrev␞ = item;
  item._idlePrev␞ = this;
  this._idleNext␞ = item;
}
module.exports.append = append;


function isEmpty() {
  return this._idleNext␞ === this;
}
module.exports.isEmpty = isEmpty;