
var L = require(process.argv[2]);
var list = { name: 'list' };
L.init(list);

var COUNT = process.argv[3];

var nodes = [];
for (var i = 0; i < COUNT; i++) {
	nodes[i] = { number: i };
}

var startTime = new Date().getTime();

for (var i = 0; i < COUNT; i++) {
	L.append(list, nodes[i]);
}	
// Peek all items from list
for (var i = 0; i < COUNT; i++) {
	L.peek(list);
};

// Shift all items from list
for (var i = 0; i < COUNT; i++) {
	L.shift(list);
};

// Append nodes to list
for (var i = 0; i < COUNT; i++) {
	L.append(list, nodes[i]);
}

// Remove items from list
for (var i = 0; i < COUNT; i++) {
	L.remove(nodes[i]);
}

var endTime = new Date().getTime();
console.log(((endTime - startTime)/1000))