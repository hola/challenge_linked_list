var _linklist = require('./../_linklist');
var __linklist = require('./../__linklist');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var iteration = 100000;

function _append() {
	var list = {};
	_linklist.init(list);

	// append and remove test
	var value = 0;
	for(var i=0; i<iteration; i++) {
		_linklist.append(list, {value: ++value});
	}
}

function __append() {
	var _list = __linklist.init();

	// append and remove test
	var _value = 0;
	for(var i=0; i<iteration; i++) {
		_list.append({value: ++_value});
	}
}

suite
	.add('_linkList append', function() {
		_append();
	})
	.add('__linkList append', function() {
		__append();
	})
	.on('cycle', function(event) {
		console.log(String(event.target));
	})
	.on('complete', function() {
		console.log('Fastest is %s', this.filter('fastest').pluck('name'));
	})
	.run({ 'async': true});