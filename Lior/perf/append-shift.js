var _linklist = require('./../_linklist');
var __linklist = require('./../__linklist');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var iteration = 100;

function _appendShift() {
	var list = {};
	_linklist.init(list);
	var value = 0;
	for(var i=0; i<iteration; i++) {
		_linklist.append(list, {value: ++value});
	}
	for(i=0; i<iteration; i++) {
		_linklist.shift(list);
	}
}

function __appendShift() {
	var _list = __linklist.init();
	var _value = 0;
	for(i=0; i<iteration; i++) {
		_list.append({value: ++_value});
	}
	for(i=0; i<iteration; i++) {
		_list.shift();
	}
}

suite
	.add('_linkList append/shift', function() {
		_appendShift();
	})
	.add('__linkList append/shift', function() {
		__appendShift();
	})
	.on('cycle', function(event) {
		console.log(String(event.target));
	})
	.on('complete', function() {
		console.log('Fastest is: %s', this.filter('fastest').pluck('name'));
	})
	.run({ 'async': true});