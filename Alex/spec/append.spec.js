var _linklist = require('./../__linklist');

describe('Check linkList "Append" method: ', function () {
	var list = _linklist.init();
	var newItem = {value: 1};
	var item = list.append(newItem);

	it('check new item next link', function () {
		expect(newItem._idleNext).toEqual(item);
	});
	it('check new item prev link', function () {
		expect(newItem._idlePrev).toEqual(item);
	});
	it('check item next link', function () {
		expect(item._idleNext).toEqual(newItem);
	});
	it('check item prev link', function () {
		expect(item._idlePrev).toEqual(newItem);
	});
});

describe('Check backward compatibility "Append" method: ', function () {
	var list = _linklist.init();
	var newItem = {value: 1};
	var item = _linklist.append(list, newItem);

	it('check new item next link', function () {
		expect(newItem._idleNext).toEqual(item);
	});
	it('check new item prev link', function () {
		expect(newItem._idlePrev).toEqual(item);
	});
	it('check item next link', function () {
		expect(item._idleNext).toEqual(newItem);
	});
	it('check item prev link', function () {
		expect(item._idlePrev).toEqual(newItem);
	});
});