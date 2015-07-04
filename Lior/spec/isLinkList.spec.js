var _linklist = require('./../__linklist');

describe('Check linkList "isLinkList" method: ', function () {

	var list = _linklist.init();
	it('basic', function () {
		expect(list.isLinkList()).toBe(true);
	});

	it('other way to check', function () {
		expect(_linklist.isLinkList(list)).toBe(true);
	});

	it('not linkList', function () {
		expect(_linklist.isLinkList()).toBe(false);
	});
});

