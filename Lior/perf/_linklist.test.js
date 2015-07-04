var linklist = require('./../_linklist');
var microtime = require('microtime');

var iteration = 10000000;

console.log('- _linkList -');

var list = {};
linklist.init(list);

// append and remove test
var startTime = microtime.now();
var value = 0;
for(var i=0; i<iteration; i++) {
	linklist.append(list, {value: ++value});
}
console.log('Append: ', microtime.now() - startTime);
startTime = microtime.now();

// peek test
var item = list;
for(i=0; i<iteration; i++) {
	item = linklist.peek(item);
}
console.log('Peek: ', microtime.now() - startTime);
startTime = microtime.now();

// shift test
for(i=0; i<iteration; i++) {
	linklist.shift(list);
}
console.log('Shift: ', microtime.now() - startTime);