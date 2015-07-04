var _linklist = require('./../__linklist');

describe('Check linkList "isEmpty" method: ', function () {
	var list = _linklist.init();

	it('basic', function () {
		expect(list.isEmpty()).toBe(true);
	});

	it('backward compatibility', function () {
		expect(_linklist.isEmpty(list)).toBe(true);
	});

	it('is not empty ', function () {
		list._linkList._idleNext = {};
		list._linkList._idlePrev = {};
		expect(list.isEmpty()).toBe(false);
	});
});