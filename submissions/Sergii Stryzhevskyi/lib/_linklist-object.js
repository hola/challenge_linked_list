'use strict';
var seq = 0;
function init(list) {
    list._id = seq++;
    list._links = {};
    list._links[list._id] = {
        prev: list,
        next: list
    };
}
exports.init = init;


// show the most idle item
function peek(list) {
    var prev = list._links[list._id].prev;
    if (prev == list) return null;
    return prev;
}
exports.peek = peek;


// remove the most idle item from the list
function shift(list) {
    var first = list._links[list._id].prev;
    remove(first, list);
    return first;
}
exports.shift = shift;


// remove a item from its list
function remove(item, list) {
    var links = list._links,
        iLinks = links[item._id];
    if (iLinks) {
        if (iLinks.next) {
            links[iLinks.next._id].prev = iLinks.prev;
        }

        if (iLinks.prev) {
            links[iLinks.prev._id].next = iLinks.next;
        }
    }
    links[item._id] = {
        prev: null,
        next: null
    };
}
exports.remove = remove;


// remove a item from its list and place at the end.
function append(list, item) {
    remove(item, list);
    var links = list._links,
        iLinks = links[item._id],
        lLinks = links[list._id];
    iLinks.next = lLinks.next;
    links[lLinks.next._id].prev = item;
    iLinks.prev = list;
    lLinks.next = item;
    //item._idleNext = list._idleNext;
    //list._idleNext._idlePrev = item;
    //item._idlePrev = list;
    //list._idleNext = item;
}
exports.append = append;


function isEmpty(list) {
    return list._links[list._id].next === list;
}
exports.isEmpty = isEmpty;
