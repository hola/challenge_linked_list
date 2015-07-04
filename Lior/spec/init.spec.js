var _linklist = require('./../__linklist');

describe('Check linkList initiation: ', function () {
	var list = _linklist.init();

	it('list must be object', function () {
		expect(list).toEqual(jasmine.any(Object));
	});
	it('list must have _linkList', function () {
		expect(list._linkList).toEqual(jasmine.any(Object));
	});
	it('_linkList._idleNext must be equal _linkList', function () {
		expect(list._linkList._idleNext).toEqual(list._linkList);
	});
	it('_linkList._idlePrev must be equal _linkList', function () {
		expect(list._linkList._idlePrev).toEqual(list._linkList);
	});

	['peek', 'shift', 'append', 'remove', 'isEmpty', 'isLinkList'].forEach( function (functionName) {
		it('linkList must have "' + functionName + '" function', function () {
			expect(list[functionName]).toEqual(jasmine.any(Function));
		});
	});
});