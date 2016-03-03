var _linklist = require('./../__linklist');

describe('Check multiple linkList ability: ', function () {
	var array = [],
		valueList = [],
		listNum = 10,
		valueNum = 100;

	function fillList(list, index) {
		var value = String;
		for (var i=0; i<valueNum; i++) {
			value = index + ':' + i;
			valueList.push(value);
			list.append({value: value})

		}
		return list;
	}

	function emptyList(list) {
		var item, index;
		while(!list.isEmpty()) {
			item = list.shift();
			if (list.isLinkList(item)) {
				emptyList(item);
				continue;
			}

			index = valueList.indexOf(item.value);
			if (index > -1) {
				valueList.splice(index, 1);
			}
		}
	}

	for (var i=0; i<listNum; i++) {
		array.push(fillList(_linklist.init(), i));
	}

	array.map(function (list, index) {
		if (index > 0) {
			list.append(array[index-1]);
		}
	});

	emptyList(array[array.length-1]);

	it('is all values found', function() {
		expect(valueList.length).toEqual(0);
	});
});