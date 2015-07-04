var Benchmark = require("benchmark");
//benches
var benches = [
	{
		name: "append-remove",
		setup: function (source) {
			var L = require(source);
			var list = {name: "superList"};
			L.init(list);

			return {L: L, list: list};
		},
		run: function(pre, th) {
			var node = {name: "node"};
			var L = pre.L;
			var list = pre.list;

			L.append(list, node);
			L.remove(node);

		}
	},
	{
		name: "get-value",
		setup: function (source) {
			var L = require(source);
			var list = {name: "superList"};
			L.init(list);

			var count = 10;
			for (var i = 0; i < count; i++)
				L.append(list, {node:"node"});

			return {L: L, list: list, count: count};
		},
		run: function(pre) {
			var c = pre.count-1;
			var n = pre.list;
			for (var i = 0; i < c; i++)
				n = n._idleNext;
		}
	},
	{
		name: "append-in-lists",
		no_add: ["lldef.js"],
		setup: function (source) {
			var L = require(source);
			
			var lists = [];
			var lists_count = 10;
			for (var i = 0; i < lists_count.length; i++) {
				var l = {list: "lists["+i+"]"};
				l.id = L.init(l);
				lists.push(l);
			}

		
			return {L: L, lists: lists, count: lists_count};
		},
		run: function(pre) {
			var lists = pre.lists;
			var node = {name: "node"}

			for (var i = 0; i < lists.length; i++)
				pre.L.append(lists[i], node, lists[i].id);

			for (var i = 0; i < lists.length; i++)
				pre.L.remove(node, lists[i].id);
		
		}
	}
];
var sources = [
	"lldef.js", "ll.js"
];

//Functions for drawing table (column)
var columnLens = [15, 15, 15, 14]; 
function addSpaces(str, len) {
	var spaces = len - str.length;
	while (spaces--)
		str = str + " ";
	return str;
}
function newColumn(arr, arrlen) {
	var column = "";
	for (var i = 0; i < arr.length; i++) {
		var a = arr[i];
		column += addSpaces((a ? a : "---")+"", arrlen[i]) + " ";
	}
	console.log(column);
}

//Draw head of table
var headtable = Object.create(sources);
headtable.unshift(" ");
headtable.push("Fastest");
newColumn(headtable, columnLens);

//Add benchmarks
var prepared = {};
var results = {};
benches.forEach(function (code) {
	var suite = new Benchmark.Suite;
	
	var no_add = code.no_add;
	for (var j = 0; j < sources.length; j++) {
		if (no_add && no_add.indexOf(sources[j]) != -1 )
			continue;

		var name = sources[j]+"-"+code.name;
		prepared[name] = code.setup("./"+sources[j]);

		var fx = getFn(code, name);
		suite.add(name, fx);
	}

	suite.on("complete", function () {
		
		//get fastest
		var fastestStr = "";
		var fastest = this.filter('fastest');
		
		var nameOfSource;
		for (var h = 0; h < fastest.length; h++) {
			nameOfSource = (fastest[h].name.split("-")[0]);
			fastestStr += nameOfSource + ((h == fastest.length-1) ? "": ", ");
		}

		//get results
		var regex_bench = /[-](.+)$/;
		var bench_name = fastest[0].name.match(regex_bench)[1];
		var res = [];
		for (var g = 0; g < sources.length; g++) {
			var a = false;
			for (var r in results) {
				if (r.split("-")[0] == sources[g] &&
					r.match(regex_bench)[1] == bench_name) {
					res.push(results[r]);
					a = true;
					break;
				}
			}
			if (!a)
				res.push(undefined);
		}

		//write column
		newColumn([
			bench_name,
			res[0],
			res[1],
			fastestStr
			], columnLens);

	}).on("cycle", function(event) {
		//push result to results
		var t = event.target;
	 	delete prepared[t.name];
	 	results[t.name] = String(t).split(" ")[2];
	}).run();
});	
function getFn(code, name) {
	return function () {
		code.run(prepared[name], this);
	};
}