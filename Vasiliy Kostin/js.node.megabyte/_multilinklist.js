// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


//modified for multi-listing by Megabyte

'use strict';

var listsNamesCounter=0;

function init(list) {
	
	list.id=listsNamesCounter;
	listsNamesCounter++;

	
	list._idleNext = list;
	list._idlePrev = list;
}
exports.init = init;


// show the most idle item
function peek(list) {
	if (list._idlePrev == list) return null;
	return list._idlePrev.value;
}
exports.peek = peek;


// remove the most idle item from the list
function shift(list) {
	var first = list._idlePrev;
	_remove_raw(list, first);
	
	return first.value;
	
}
exports.shift = shift;


// remove a item from its list
function remove(list,item) {
	var raw_item=item._lists[list.id];
	if(raw_item)
	{
		_remove_raw(list,raw_item);
	}
}
exports.remove = remove;


function _remove_raw(list,raw_item) {
	
	if (raw_item._idleNext) {
		raw_item._idleNext._idlePrev = raw_item._idlePrev;
	}

	if (raw_item._idlePrev) {
		raw_item._idlePrev._idleNext = raw_item._idleNext;
	}

	raw_item._idleNext = null;
	raw_item._idlePrev = null;
}


// remove a item from its list and place at the end.
function append(list, item) {
	if(item._lists)
	{
		//prevent twice adding in to one list
		var raw_item=item._lists[list.id];
		if(raw_item)
		{
			_remove_raw(list,raw_item);
		}
	}
	else
	{
		item._lists=[];
	}
	
	if(!raw_item)
	{
	
		//low performance here
		
		raw_item = {value:item, _idleNext: list._idleNext,_idlePrev:list};
		
		item._lists[list.id]=raw_item;
	}
	else
	{
		raw_item._idleNext=list._idleNext;
		raw_item._idlePrev=list;
	}
	
	list._idleNext._idlePrev = raw_item;

	list._idleNext = raw_item;
}
exports.append = append;


function isEmpty(list) {
	return list._idleNext === list;
}
exports.isEmpty = isEmpty;