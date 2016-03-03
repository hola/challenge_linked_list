
var L = require(process.argv[2]);

var list = {name: "list"};
L.init(list);

var COUNT =  	process.argv[3];
var INDEX =  	process.argv[4];

var startTime = new Date().getTime();

//append COUNT nodes to list
for (var i = 0; i < COUNT; i++)
	L.append(list, {num: i});

//get INDEX node from list
var n = list._idlePrev;
for (var i = 0; i < INDEX; i++)
     n = n._idlePrev;

var endTime = new Date().getTime();
console.log( ( (endTime-startTime)/1000) );