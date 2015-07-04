// Alexander Baygeldin (c) 2015
// Linked list

'use strict';

// depending on our needs we can change size of list node thus changing the performance
var SIZE = 15;

function moveRight(array) {
    for (var i=SIZE-1; i>0; i--) {
        if (array[i] == null) {
            for (i; i>0; i--) {
                array[i] = array[i-1];
            }

            array[i] = 0;
        }
    }
}

function moveLeft(array) {
    for (var i=0; i<SIZE-1; i++) {
        if (array[i] == null) {
            for (i; i<SIZE-1; i++) {
                array[i] = array[i+1];
            }

            array[i] = 0;
        }
    }
}

// every node in list contains small array of list elements
// since elements themselves don't have any pointers the memory overhead is low
function Node() {
    this._data = new Array(SIZE);
    this._length = 0;
    this._next = null;
    this._prev = null;
}

function List() {
    var self = this;

    this._first = null; // node with first added elements
    this._last = null; // node with last added elements

    this._removeNode = function (node) {
        if (node._next) {
            node._next._prev = node._prev;
        } else {
            self._last = node._prev;
        }

        if (node._prev) {
            node._prev._next = node._next;
        } else {
            self._first = node._next;
            if (self._first != null && self._first._length != SIZE) {
                moveRight(self._first);
            }
        }
    };

    // remove specific element from the list
    this.remove = function (elemInfo) {
        if (elemInfo.node._length == 1) {
            self._removeNode(elemInfo.node);
        } else {
            if (elemInfo.node == self._first) {
                elemInfo.node._data[SIZE - self._first.length + elemInfo.offset] = null;
                moveRight(self._first);
            }

            elemInfo.node._data[elemInfo.offset] = null;
            moveLeft(elemInfo.node._data);
            elemInfo.node._length--;
        }
    };

    // place item at the end (i.e. at the last added node).
    this.append = function (data) {
        if (self._last && ++self._last._length != SIZE) {
            self._last._data[self._last._length] = data;
        } else {
            var node = new Node();
            node._data[0] = data;
            node._length++;

            if (self._last) {
                node._prev = self._last;
                self._last._next = node;
                self._last = node;
            } else {
                self._first = node;
                self._last = node;
            }
        }

        // helps to remove specific object fast from list
        return { node: self._last, offset: self._last._length - 1 };
    };

    // show the most idle item
    this.peek = function () {
        return self._first._data[SIZE - self._first._length];
    };

    // remove the most idle item from the list
    this.shift = function () {
        var first = self._first._data[SIZE - self._first._length];
        self._first._data[SIZE - self._first._length] = null;
        self._first._length--;

        if (self._first._length == 0) {
            self._removeNode(self._first);
        }

        return first;
    };

    this.isEmpty = function () {
        return !self._first;
    };

    this.forEach = function (callback) {
        if (self._first) {
            var currentNode = self._first;

            do {
                for (var offset=0; offset<SIZE-1; offset++) {
                    callback(currentNode._data[offset]);
                }

                currentNode = currentNode._next;
            } while (currentNode != self._last);
        }
    }
}

exports.List = List;