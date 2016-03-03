'use strict';
var seq = 0, items = Object.create(null);
function init(list) {
  list._ = new Int8Array;
  list._id = seq++;
  items[list._id] = list;
}
exports.init = init;


// show the most idle item
function peek(list) {
  if(list._.length){
    return items[list._[0]];
  }
  return null;
}
exports.peek = peek;


// remove the most idle item from the list
function shift(list) {
  var first = items[list._[0]];
  remove(first, list);
  return first;
}
exports.shift = shift;


// remove a item from its list
function remove(item, list) {
  var i = 0, index = -1, len = list._.length, id= item._id;
  for (; i < len; i++) {
    if (list._[i] === id) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    var a = new Array, i = 0;
    for(i;i<len;i++){
      if(i!==index){
        a.push(list._[i]);
      }
    }
    list._ = a;
  }
}
exports.remove = remove;


// remove a item from its list and place at the end.
function append(list, item) {
  remove(item, list);
  list._.push(item._id);
}
exports.append = append;


function isEmpty(list) {
  return list._.length === 0;
}
exports.isEmpty = isEmpty;
