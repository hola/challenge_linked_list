'use strict';
/*
 * DRY violation is OK, less functions call -> higher performance
 * indexOf, splice sucks
 */

/**
 * Magic variable, it depends on your environment, maybe.
 * If amount of items in list less than spartans in their army - better use JS operations with Array,
 * otherwise native indexOf and splice will be better.
 * @type {number}
 */
var SPARTAN_MAGIC_SIZE = 301;

function init(list) {
    list._ = new Array;
}
exports.init = init;


// show the most idle item
function peek(list) {
    if (list._.length) {
        return list._[0];
    }
    return null;
}
exports.peek = peek;


// remove the most idle item from the list
function shift(list) {
    var a,
        item = list._[0],
        i = 0,
        index = -1,
        len = list._.length;
    if (len < SPARTAN_MAGIC_SIZE) {
        for (; i < len; i++) {
            if (list._[i] === item) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            if (index === 0) {
                list._.shift();
            } else if (index === len - 1) {
                list._.pop()
            } else {
                a = new Array;
                i = 0;
                for (; i < len; i++) {
                    if (i !== index) {
                        a.push(list._[i]);
                    }
                }
                list._ = a;
            }
        }
    } else {
        index = list._.indexOf(item);
        if (index !== -1) {
            list._.splice(index, 1);
        }
    }

    return item;
}
exports.shift = shift;


// remove a item from its list
function remove(item, list) {
    var a, i = 0, index = -1, len = list._.length;
    if (len < SPARTAN_MAGIC_SIZE) {
        for (; i < len; i++) {
            if (list._[i] === item) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            if (index === 0) {
                list._.shift();
            } else if (index === len - 1) {
                list._.pop()
            } else {
                a = new Array;
                i = 0;
                for (; i < len; i++) {
                    if (i !== index) {
                        a.push(list._[i]);
                    }
                }
                list._ = a;
            }
        }
    } else {
        index = list._.indexOf(item);
        if (index !== -1) {
            list._.splice(index, 1);
        }
    }
}
exports.remove = remove;


// remove a item from its list and place at the end.
function append(list, item) {
    var a, i = 0, index = -1, len = list._.length;
    if (len < SPARTAN_MAGIC_SIZE) {
        for (; i < len; i++) {
            if (list._[i] === item) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            if (index === 0) {
                list._.shift();
            } else if (index === len - 1) {
                list._.pop()
            } else {
                a = new Array;
                i = 0;
                for (; i < len; i++) {
                    if (i !== index) {
                        a.push(list._[i]);
                    }
                }
                list._ = a;
            }
        }
    } else {
        index = list._.indexOf(item);
        if (index !== -1) {
            list._.splice(index, 1);
        }
    }
    //list._[len-1] = item;
    list._.push(item);
}
exports.append = append;


function isEmpty(list) {
    return list._.length === 0;
}
exports.isEmpty = isEmpty;
