'use strict';

function init(list) {
    list._next = list;
    list._prev = list;
    list._tail = list;
}
exports.init = init;


// show the most idle item
function peek(list) {
    if (list._tail == list)
        return null;
    return list._next;
}
exports.peek = peek;


// remove the most idle item from the list
function shift(list) {
    var first = list._next;
    remove(first, list);
    return first;
}
exports.shift = shift;


// remove a item from its list
function remove(item, list) {
    var itemTail = getItemTail(item);
    if (itemTail._next) {
        itemTail._next._prev = item._prev;
    }

    if (item._prev) {
        item._prev._next = itemTail._next;
    }

    if (list._tail == itemTail) {
        list._tail = item._prev;
    }

    if (item._tail) {
        itemTail._next = item;
        item._prev = itemTail;
    }
    else {
        item._next = null;
        item._prev = null;
    }

}
exports.remove = remove;


// remove a item from its list and place at the end.
function append(list, item) {
    remove(item, list);
    var itemTail = getItemTail(item);
    itemTail._next = list;
    item._prev = list._prev;
    list._prev._next = item;
    list._prev = itemTail
    list._tail = itemTail;
}
exports.append = append;


function isEmpty(list) {
    return list._tail == list;
}
exports.isEmpty = isEmpty;


function isList(item) {
    return item._tail != undefined;
}
exports.isList = isList;


function getItemTail(item) {
    if (item._tail)
        return item._tail;
    return item;
}

