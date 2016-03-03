
var L = require(process.argv[2]);
var list = { name: 'list' };
L.init(list);

var COUNT = process.argv[3];

var nodes = [];

for (var i = 0; i < COUNT; i++) {
	nodes[i] = { number: i };
};

var sawStep = Math.round(COUNT/100);

var i = 0, k = 0;

var startTime = new Date().getTime();

while(i < COUNT) {
	k = 0;
	while (k < sawStep) {
		L.append(list, nodes[i]);
		k++;
		i++;
	};
	k = 0;
	i-=sawStep;
	while (k < sawStep) {
		L.remove(nodes[i]);
		k+=2;
		i+=2;
	};
}

var endTime = new Date().getTime();
console.log(((endTime-startTime)/1000))