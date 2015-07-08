var _linklist = require('./../_linklist');
var __linklist = require('./../__linklist');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var iteration = 100000;
// create _linkList
var list = {};
_linklist.init(list);
var value = 0;
for(var i=0; i<iteration; i++) {
	_linklist.append(list, {value: ++value});
}

function _peek() {
	var item = list;
	for(i=0; i<iteration; i++) {
		item = _linklist.peek(item);
	}
}

// create __linkList
var _list = __linklist.init();
var _value = 0;
for(i=0; i<iteration; i++) {
	_list.append({value: ++_value});
}

function __peek() {
	var _item = _list;
	for(i=0; i<iteration; i++) {
		_item = _list.peek(_item);
	}
}

suite
	.add('_linkList peek', function() {
		_peek();
	})
	.add('__linkList peek', function() {
		__peek();
	})
	.on('cycle', function(event) {
		console.log(String(event.target));
	})
	.on('complete', function() {
		console.log('Fastest is: %s', this.filter('fastest').pluck('name'));
	})
	.run({ 'async': true});