var _linklist = require('./../__linklist');

describe('Check linkList "Remove" method: ', function () {

	it('basic', function () {
		var list = _linklist.init(),
			i, item, iteration = 10;

		for(i=0; i<iteration; i++) {
			list.append({value: i});
		}
		item = list.peek();
		while(item) {
			list.remove(item);
			item = list.peek();
		}

		expect(list.isEmpty()).toBe(true);
	});

	it('backward compatibility', function () {
		var list = _linklist.init(),
			i, item, iteration = 10;

		for(i=0; i<iteration; i++) {
			list.append({value: i});
		}
		item = _linklist.peek(list);
		while(item) {
			_linklist.remove(item);
			item = _linklist.peek(list);
		}

		expect(_linklist.isEmpty(list)).toBe(true);
	});
});
