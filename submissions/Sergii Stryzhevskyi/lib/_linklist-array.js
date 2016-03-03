'use strict';

function init(list) {
    list._ = []
}
exports.init = init;


// show the most idle item
function peek(list) {
    if(list._.length){
        return list._[0];
    }
    return null;
}
exports.peek = peek;


// remove the most idle item from the list
function shift(list) {
    var first = list._[0];
    remove(first, list);
    return first;
}
exports.shift = shift;


// remove a item from its list
function remove(item, list) {
    var index = list._.indexOf(item);
    if (index > -1) {
        list._.splice(index, 1);
    }
}
exports.remove = remove;


// remove a item from its list and place at the end.
function append(list, item) {
    remove(item, list);
    list._.push(item);
}
exports.append = append;


function isEmpty(list) {
    return list._.length === 0;
}
exports.isEmpty = isEmpty;
