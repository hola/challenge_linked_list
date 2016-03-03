// Copyright Essoudry Avraham

define(function(require, exports, module) {
	'use strict';
	function testRegular(Ilinklist) {
		var iterations = 1000000;
		
		var objects = [];
		for(var i=0; i<iterations; i++)
			objects.push({index: i});
		
		var start = performance.now();
		var list = {};
		Ilinklist.init(list);
		objects.forEach(function(o){
			Ilinklist.append(list, o);
		});
		var first = Ilinklist.peek(list);
		while(!Ilinklist.isEmpty(list)) {
			Ilinklist.shift(list);
		}
		
		var end = performance.now();
		return end - start;
	}
	exports.testRegular = testRegular;
	
	function testGeneric(Ilinklist) {
		var iterations = 200000, sub_lists = 5;
		var objects_arr = [];
		for(var i=0; i<sub_lists; i++) {
			var sub = [];
			for(var j=0; j<iterations; j++) {
				sub.push({inner_list: i, item: j});
			}
			objects_arr.push(sub);
		}
		
		var start = performance.now();
		var list_of_lists = {};
		Ilinklist.init(list_of_lists);
		
		objects_arr.forEach(function(a){
			var inner_list = {};
			Ilinklist.init(inner_list);
			a.forEach(function(o){
				Ilinklist.append(inner_list, o);
			});
			Ilinklist.append(list_of_lists, inner_list);
		});
		
		while(!Ilinklist.isEmpty(list_of_lists)) {
			var inner_list = Ilinklist.shift(list_of_lists);
			while(!Ilinklist.isEmpty(inner_list)) {
				Ilinklist.shift(inner_list);
			}
		}
		
		var end = performance.now();
		return end - start;
	}
	exports.testGeneric = testGeneric;
});