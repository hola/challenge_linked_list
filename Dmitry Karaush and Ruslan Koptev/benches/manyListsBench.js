var L = require(process.argv[2]);

var lists = [];
var nodes = [];

var LISTS_COUNT = process.argv[3];
var NODES_COUNT = process.argv[4];

for (var i = 0; i < LISTS_COUNT; i++) {
	lists[i] = {listNum: i};
	lists[i].id = L.init(lists[i]);	
}

for (var i = 0; i < NODES_COUNT; i++) {
	nodes[i] = {nodeNum: i};
}

var startTime = new Date().getTime();

//append
for (var i = 0; i < LISTS_COUNT; i++) {
	for (var j = 0; j < NODES_COUNT; j++) {
		L.append(lists[i], nodes[j], lists[i].id);
	}
}

//peek
for (var i = 0; i < LISTS_COUNT; i++) {
	L.peek(lists[i], lists[i].id);
}

//shift
for (var i = 0; i < LISTS_COUNT; i++) {
	L.shift(lists[i], lists[i].id);
}
//append
for (var i = 0; i < LISTS_COUNT; i++) {
	for (var j = 0; j < NODES_COUNT; j++) {
		L.append(lists[i], nodes[j], lists[i].id);
	}
}

//remove
for (var i = 0; i < LISTS_COUNT; i++) {
	for (var j = 0; j < NODES_COUNT; j++) {
		L.remove(nodes[j], lists[i].id);
	}
}

var endTime = new Date().getTime();

console.log( ( (endTime-startTime)/1000) );