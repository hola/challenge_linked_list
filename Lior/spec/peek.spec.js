var _linklist = require('./../__linklist');

describe('Check linkList "Peek" method: ', function () {
	var list = _linklist.init(),
		i, item, iteration = 10;

	function checkPeekedItem(item, value) {
		it('check peeked item "' + value + '"', function () {
			expect(item.value).toEqual(value);
		});
	}

	for(i=0; i<iteration; i++) {
		list.append({value: i});
	}
	item = list;
	for(i=0; i<iteration; i++) {
		item = list.peek(item);
		checkPeekedItem(item, i);
	}
});