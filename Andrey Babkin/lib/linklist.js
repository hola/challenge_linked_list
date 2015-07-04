'use strict';

// List item class
function ListItem() {
    this._next = null;
    this._prev = null;
}
ListItem.prototype = Object.create(null);
module.exports.ListItem = ListItem;

// Linked list class
function LinkList() {
    var self = this;

    this._first = null;
    this._last = null;

    // append new ListItem object with initial data field filled
    this.append = function (data) {
        var obj = new ListItem();
        obj.data = data;

        if (!self._last) {
            self._first = obj;
            self._last = obj;
        } else {
            obj._prev = self._last;
            self._last._next = obj;
            self._last = obj;
        }
    };

    // get last item
    this.peek = function () {
        return self._last;
    };

    // remove item from list and return it
    this.remove = function (item) {
        if (!!item) {
            if (item._prev) {
                item._prev._next = item._next;
            }
            if (item._next) {
                item._next._prev = item._prev;
            }
            item._prev = null;
            item._next = null;
        }
        return item;
    };

    // returns first ListItem object and remove it from list
    this.shift = function () {
        var result;

        if (!!self._first) {
            result = self._first;
            self._first = self._first._next;
        }
        return self.remove(result);
    };

    // iterator
    this.forEach = function (callback) {
        var current = self._first,
            idx = 0;
        if (typeof callback === 'function') {
            while (!!current) {
                callback(current, idx, self);
                idx++;
                current = current._next;
            }
        }
    };

    // map
    this.map = function (callback) {
        var current = self._first,
            result = [];
        if (typeof callback !== 'function') {
            callback = function (item) {
                return item.data;
            };
        }
        while (!!current) {
            result.push(callback(current));
            current = current._next;
        }
        return result;
    };

    // test if the list is empty
    this.isEmpty = function () {
        return !self._first;
    };
}
LinkList.prototype = Object.create(null);
module.exports.LinkList = LinkList;