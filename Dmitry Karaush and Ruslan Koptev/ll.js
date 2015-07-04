'use strict';
var gId = 0;

function init(list) {
  //Simple version
  list._idleNext = list;
  list._idlePrev = list;
  //With multiple parent lists
  list._links = [];
  list._links[gId] = {prev: list, next: list};
  return gId++;
}
exports.init = init;


// show the most idle item
function peek(list,id) {
  // If list has multiple parents
  if(id) {
    var prev = list._links[id].prev;
    if (prev == list)
      return null;
    return prev;
  }

  // Simple version
  var prev = list._idlePrev;
  if (prev == list)
    return null;
  return prev;
}
exports.peek = peek;


// remove the most idle item from the list
function shift(list,id) {
  if (id) {
    var first = list._links[id].prev;
    remove(first, id);
  } else {
    var first = list._idlePrev;
    remove(first);
  }
  return first;
}
exports.shift = shift;


// remove a item from its list
function remove(item,id) {
  if (id) {
    var cItem = item._links[id];
    if (cItem) {
      var cItemNext = cItem.next; 
      var cItemPrev = cItem.prev;
      if (cItemNext) {
        cItemNext._links[id].prev = cItemPrev;
      }

      if (cItemPrev) {
        cItemPrev._links[id].next = cItemNext;
      }

      cItem.next = null;
      cItem.prev = null;
    };
  } else {
    if (item._idleNext) {
      item._idleNext._idlePrev = item._idlePrev;
    }

    if (item._idlePrev) {
      item._idlePrev._idleNext = item._idleNext;
    }

    item._idleNext = null;
    item._idlePrev = null;
  }
}
exports.remove = remove;


// remove a item from its list and place at the end.
function append(list, item, id) {
  if (id) {
    if(item._links) {
      remove(item,id);  //destroy links in this list
    } else {
      item._links = [];
    }
    var cItem = item._links[id] = [];
    var cList = list._links[id];
    var cListNext = cList.next;
    cItem.next = cListNext;
    cListNext._links[id].prev = item;
    cItem.prev = list;
    cList.next = item;
  } else {
    if(item._idleNext) {
      remove(item);
    }
    var cListNext = list._idleNext;
    item._idleNext = cListNext;
    cListNext._idlePrev = item;
    item._idlePrev = list;
    list._idleNext = item;
  }
}
exports.append = append;


function isEmpty(list,id) {
  if(id)
    return list._links[id].next === list;

  return list._idleNext === list;
}
exports.isEmpty = isEmpty;