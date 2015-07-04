
function init(list) {
    list._idleNext = list;
    list._idlePrev = list;
    list._next = null; //this is a new field that holds an item whose _idleNext is the same as the _idleNext of this list 
}
exports.init = init;

// show the most idle item
function peek(list) {
    if (list._idlePrev == list) return null;
    return list._idlePrev;
}
exports.peek = peek;

// remove the most idle item from the list
function shift(list) {
    if(list._idlePrev == list)
        return null;
    var first = lastNext(list._idlePrev);
    remove(first);
    return first;
}
exports.shift = shift;

// returns the last item in the next list
function lastNext(list){
    if(list._next==null)
        return list;
    if(list._next._next==null){
        var ret = list._next._next;
        list._next = null;
        return ret;
    }
    return lastNext(list._next);
}

// remove a item from its list
function remove(item) {
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

// remove a item from its list and place at the end.
function append(list, item) {
    remove(item);
    item._idleNext = list._idleNext;
    list._idleNext._idlePrev = item;
    item._idlePrev = list;
    list._idleNext = item;
}
exports.append = append;

//binds an item to the next of the list but not appending the list to the item
function bind(list, item) {
    if(item._idlePrev != item._idlePrev)
        list._next = item._idlePrev;
    item._idlePrev = list;
    list._idleNext._idlePrev = list._idleNext._idlePrev._next;
    list._idleNext = item;
}

function isEmpty(list) {
    return list._idleNext === list;
}
exports.isEmpty = isEmpty;
