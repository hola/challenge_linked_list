var _linklist = require('./../__linklist');
var microtime = require('microtime');

var iteration = 10000000;

console.log('- __linkList -');

// link list initiation
var _list = _linklist.init();

// append and remove test
var startTime = microtime.now();
var _value = 0;
for(var i=0; i<iteration; i++) {
	_list.append({value: ++_value});
}
console.log('Append: ', microtime.now() - startTime);
startTime = microtime.now();

// peek test
var _item = _list;
for(i=0; i<iteration; i++) {
	_item = _list.peek(_item);
}
console.log('Peek: ', microtime.now() - startTime);
startTime = microtime.now();

// shift test
for(i=0; i<iteration; i++) {
	_list.shift();
}
console.log('Shift: ', microtime.now() - startTime);