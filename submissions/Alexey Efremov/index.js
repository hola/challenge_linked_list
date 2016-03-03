"use strict";

// @author Efremov Alexey lexich121@gmail.com

function init(list) {
  list._idleNext = list;
  list._idlePrev = list;
}
exports.init = init;

// show the most idle item
function peek(list) {
  if (list._idlePrev === list) return null;
  return list._idlePrev;
}
exports.peek = peek;

// remove a item from its list
function remove(item) {
  var cursor;
  if (cursor = item._idleCursor) {
    var len = cursor.length;
    var prevKey, nextKey;
    var key, i = 0;
    for (; i <= len; i++) {
      key = cursor[i];
      prevKey = "_idlePrev" + key;
      nextKey = "_idleNext" + key;
      item[prevKey] && (item[prevKey][nextKey] = item[nextKey]);
      item[nextKey] && (item[nextKey][prevKey] = item[prevKey]);
      item[prevKey] = null;
      item[nextKey] = null;
    }
    item._idleCursor = null;
  }

  if (item._idleNext) {
    item._idleNext._idlePrev = item._idlePrev;
  }

  if (item._idlePrev) {
    item._idlePrev._idleNext = item._idleNext;
  }

  item._idleNext = null;
  item._idlePrev = null;
}
exports.remove = remove;

// remove the most idle item from the list
function shift(list) {
  var first = list._idlePrev;
  remove(first);
  return first;
}
exports.shift = shift;

var KEY_INDEX = 0;

// remove a item from its list and place at the end.
function append(list, item) {
  if (!item._idleNext || item._idleNext === item) {
    item._idleNext = list._idleNext;
    list._idleNext._idlePrev = item;
    item._idlePrev = list;
    list._idleNext = item;
    if (list._idleCursor) {
      var k = 0;
      var next1, prev1, key1;
      for (; k < list._idleCursor.length; k++) {
        key1 = list._idleCursor[k];
        next1 = "_idleNext" + key1;
        prev1 = "_idlePrev" + key1;
        item[next1] = list[next1] || (list[next1] = list);
        list[next1][prev1] = item;
        item[prev1] = list;
        list[next1] = item;
      }
    }
  } else if (list._idlePrev === item || list._idleNext === item) {
    return;
  } else {
    KEY_INDEX++;
    var listLastIndex = list._idleCursor ? list._idleCursor.length : 0;
    if (listLastIndex) {
      list._idleCursor[listLastIndex] = KEY_INDEX;
    } else {
      list._idleCursor = [KEY_INDEX];
    }
    if (item._idleCursor) {
      item._idleCursor[item._idleCursor.length] = KEY_INDEX;
    } else {
      item._idleCursor = [KEY_INDEX];
    }
    var i = 0;
    var next, prev, key;
    for (; i <= listLastIndex; i++) {
      key = list._idleCursor[i];
      next = "_idleNext" + key;
      prev = "_idlePrev" + key;
      item[next] = list[next] || (list[next] = list);
      list[next][prev] = item;
      item[prev] = list;
      list[next] = item;
    }
  }
}
exports.append = append;

function isEmpty(list) {
  if (list._idleNext === list) {
    if (list._idleCursor) {
      var i = 0,
        cursor = list._idleCursor,
        len = cursor.length;
      for (; i < len; i++) {
        if (list["_idleNext" + cursor[i]] !== list) {
          return false;
        }
      }
    }
  } else {
    return false;
  }
  return true;
}
exports.isEmpty = isEmpty;
