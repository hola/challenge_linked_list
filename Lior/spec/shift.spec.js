var _linklist = require('./../__linklist');

describe('Check linkList "Shift" method: ', function () {

	var list = _linklist.init(),
		i, iteration = 10;

	function checkShiftedItem(item, value) {
		it('check shifted item "' + value + '"', function () {
			expect(item.value).toEqual(value);
		});
	}

	for(i=0; i<iteration; i++) {
		list.append({value: i});
	}

	for(i=0; i<iteration; i++) {
		checkShiftedItem(list.shift(), i);
	}

	it('is empty', function () {
		expect(list.isEmpty()).toBe(true);
	});
});

describe('Check backward compatibility "Shift" method: ', function () {

	var list = _linklist.init(),
		i, iteration = 10;

	function checkShiftedItem(item, value) {
		it('check shifted item "' + value + '"', function () {
			expect(item.value).toEqual(value);
		});
	}

	for(i=0; i<iteration; i++) {
		_linklist.append(list, {value: i});
	}

	for(i=0; i<iteration; i++) {
		checkShiftedItem(_linklist.shift(list), i);
	}

	it('is empty', function () {
		expect(_linklist.isEmpty(list)).toBe(true);
	});
});