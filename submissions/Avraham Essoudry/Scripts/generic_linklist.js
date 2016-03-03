// Copyright Essoudry Avraham

define(function(require, exports, module) {
	'use strict';

	function init(list) {
		list._itemsNext = list;
		list._itemsPrev = list;
	}
	exports.init = init;

	// show the most idle item
	function peek(list) {
		return list._itemsPrev === list ? null : list._itemsPrev;
	}
	exports.peek = peek;

	// remove the most idle item from the list
	function shift(list) {
		return remove(list._itemsPrev);
	}
	exports.shift = shift;

	// remove a item from its list
	function remove(item) {
		if (item._idleNext) {
			if(item._idleNext._idlePrev === item) {
				item._idleNext._idlePrev = item._idlePrev;
			}
			else {
				item._idleNext._itemsPrev = item._idlePrev;
			}
		 }
	 
		if (item._idlePrev) {
			if(item._idlePrev._idleNext === item) {
				item._idlePrev._idleNext = item._idleNext;
			}
			else {
				item._idlePrev._itemsNext = item._idleNext;
			}
		}
	
		item._idleNext = null;
		item._idlePrev = null;
		return item;
	}
	exports.remove = remove;

	// remove a item from its list and place at the end.
	function append(list, item) {
		remove(item);
		item._idleNext = list._itemsNext;
		if(list._itemsNext === list) {
			list._itemsPrev = item;
		}
		else {
			list._itemsNext._idlePrev = item;
		}
		item._idlePrev = list;
		list._itemsNext = item;
	}
	exports.append = append;

	function isEmpty(list) {
		return list._itemsNext === list;
	}
	exports.isEmpty = isEmpty;
});