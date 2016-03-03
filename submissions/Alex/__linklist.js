'use strict';

function init(list) {
  list = list || {};
  list._linkList = {};
  list._linkList._idleNext = list._linkList;
  list._linkList._idlePrev = list._linkList;
  list.peek = peek;
  list.shift = shift;
  list.append = append;
  list.remove = remove;
  list.isEmpty = isEmpty;
  list.isLinkList = isLinkList;
  return list;
}
exports.init = init;

// show the most idle item
function peekItem(list) {
  if (list._idlePrev == list) return null;
  return list._idlePrev;
}

function peek(list) {
  if ('undefined' === typeof list) {
    list = this;
    return peekItem(list._linkList);
  }
  if ('undefined' !== typeof list._idlePrev) {
    return peekItem(list);
  }
  return peekItem(list._linkList);
}
exports.peek = peek;


// remove the most idle item from the list
var first = null;
function shift(list) {
  if ('undefined' === typeof list) {
    first = this._linkList._idlePrev;
    remove(first);
    return first;
  }
  if ('undefined' !== typeof list._idlePrev) {
    first = list._idlePrev;
    remove(first);
    return first;
  }
  if ('undefined' !== typeof list._linkList) {
    return shift(list._linkList);
  }
}
exports.shift = shift;


// remove a item from its list
function remove(item) {
  if ('undefined' !== typeof item._idleNext) {
    item._idleNext._idlePrev = item._idlePrev;
  }
  if ('undefined' !== typeof item._idlePrev) {
    item._idlePrev._idleNext = item._idleNext;
  }

  item._idleNext = null;
  item._idlePrev = null;
}
exports.remove = remove;


function appendToItem(appendTo, item) {
  remove(item);
  item._idleNext = appendTo._idleNext;
  appendTo._idleNext._idlePrev = item;
  item._idlePrev = appendTo;
  appendTo._idleNext = item;
  return appendTo;
}

// remove a item from its list and place at the end.
function append(list, item) {
  if ('undefined' === typeof item) {
    item = list;
    list = this;
    return appendToItem(list._linkList, item);
  }
  if ('undefined' === typeof list._idleNext) {
    return appendToItem(list._linkList, item);
  }
  return appendToItem(list, item);
}
exports.append = append;


function isEmpty(list) {
  if ('undefined' === typeof list) {
    return this._linkList._idleNext === this._linkList;
  }
  if ('undefined' !== typeof list._idleNext) {
    return list._idleNext === list;
  }
  if ('undefined' !== typeof list._linkList) {
    return list._linkList._idleNext === list._linkList;
  }
}
exports.isEmpty = isEmpty;


function isLinkList(list) {
  if ('undefined' === typeof list) {
    list = this;
  }
  return 'object' === typeof list._linkList;
}
exports.isLinkList = isLinkList;