/*
	Running benches:
		saw-bench      (benches/sawBench.js)
		index-bench    (benches/indexBench.js)
		simple-bench   (benches/simpleBench.js)
		nodes-in-lists (benches/manyListsBench.js)
*/

var engine = require("./benchengine.js");

var sources = [ "./../lldef.js", "./../ll.js"];
var names = ["Std (default)", "Our impl"];
var tests = [
	function (f) {
		//100 append, 50 remove, 100 append...
		engine.bench(
			"saw-bench",            // name of bench
			"benches/sawBench.js",  // bench file
			sources, 				// implementations
			[10000000],				// count of nodes
			true,                   // debug off
			f 						// callback
		);
	},
	//get value by index in list
	function (f) {
		engine.bench(
			"index-bench",        
			"benches/indexBench.js", 
			sources,
			[10000000, 9999999],    // 1 - count of nodes, 2 - index
			true,
			f
		);
	},
	// append, shift, remove and so on.
	function (f) {
		engine.bench(
			"simple-bench",
			"benches/simpleBench.js", 
			sources,
			[10000000],             // count of nodes
			true,
			f
		);
	},
	//like simpleBench, but with many parent lists
	function (f) {
		engine.bench(
			"nodes-in-lists",
			"benches/manyListsBench.js", 
			["./../ll.js"],
			[1000, 5000],           // 1 - count of lists, 2 - count of nodes
			true,
			f
		);
	}
];

//-----Function for start benches-------

var bench_results = [];
function recursiveBench(arr, i, finish) {
	if (i != arr.length) {
		arr[i](function (result) {
			bench_results.push(result);
			recursiveBench(arr, i+1, finish);
		});
	} else {
		finish(bench_results);
	}
};
//------Functions for draw table---------
function addSpaces(str, len) {
	var spaces = len - str.length;
	while (spaces) {
		str = str + " ";
		spaces--;
	}
	return str;
}

function newColumn(arr, arrlen) {
	var column = "";
	for (var i = 0; i < arr.length; i++) {
		if (arr[i])
			column += addSpaces(arr[i]+"", arrlen[i]);
		column += " ";
	}
	return column;
}

//-----Start------
var lens = [13,15,15,15];
recursiveBench(tests, 0, function (results) {

	//header
	console.log("\n"+newColumn([
		"Name of Impl",
		results[0].name,
		results[1].name,
		results[2].name,
		results[3].name
		], lens));

	for (var i = 0; i < names.length; i++) {
		var name = names[i];
		var source = sources[i];
		if (source.file)
			source = source.file;
		var res = [];
		for (var j = 0; j < results.length; j++) {
			var r = searchResultByFile(results[j], source);
			if (r == null) {
				res[res.length] = "---";
				continue;
			}

			var r_str = r.t+"s";
			res[res.length] = r_str;
		}

		console.log(newColumn([
			name,
			res[0],
			res[1],
			res[2],
			res[3]
			], lens))
	}
});

function searchResultByFile(bench, file) {
	for (var i = 0; i < bench.results.length; i++) {
		if (bench.results[i].file == file)
			return bench.results[i];
	}
	return null;
}