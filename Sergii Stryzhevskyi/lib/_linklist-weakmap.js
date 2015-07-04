'use strict';
function init(list) {
    var map = new WeakMap();
    map.set(list, {
        next: list,
        prev: list
    });
    list._ = map;
}
exports.init = init;


// show the most idle item
function peek(list) {
    var prev = list._.get(list).prev;
    if (prev == list) return null;
    return prev;
}
exports.peek = peek;


// remove the most idle item from the list
function shift(list) {
    var first = list._.get(list).prev;
    remove(first, list);
    return first;
}
exports.shift = shift;


// remove a item from its list
function remove(item, list) {
    var links = list._;
    if (links.has(item)) {
        var cLink = links.get(item);
        if (cLink.next) {
            links.get(cLink.next).prev = cLink.prev;
        }

        if (cLink.prev) {
            links.get(cLink.prev).next = cLink.next;
        }

        cLink.next = null;
        cLink.prev = null;
        links.delete(item);
    }
}
exports.remove = remove;


// remove a item from its list and place at the end.
function append(list, item) {
    remove(item, list);
    var links = list._;
    var lLink = links.get(list);
    var iLink = {};
    links.set(item, iLink);
    iLink.next = lLink.next;
    links.get(lLink.next).prev = item;
    iLink.prev = list;
    lLink.next = item;
}
exports.append = append;


function isEmpty(list) {
    return list._.get(list).next === list;
}
exports.isEmpty = isEmpty;
