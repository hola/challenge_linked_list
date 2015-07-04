var exec = require('child_process').exec;

function bench_worker(name, index, file, source, params, debug, end) {
	if (debug)
    	log("Benchmarking ["+index+"] of {"+name+"}. Source: "+source);

	var p = "";
	for (var i = 0; i < params.length; i++)
		p += params[i] + " ";

 	exec('node '+file+" "+source+" "+p, function(error, stdout, stderr) {
	    if (error !== null) {
	        console.log('exec error: ' + error);
	    }
	    end(parseFloat(stdout))
	}); 
}

var bench_stats = [];
function bench(name, file, sources, params, debug, end) {
    log("Benchmarking {"+name+"} ..."); 
 	
 	var result = {"results": []};
    recursive(0, sources.length, function (i, callback) {

    	var source = sources[i];
    	var param = params;
    	if (source.file) {
    		param.push(source.param);
    		source = source.file;
    	}

		result.results[i] = {"file": source};
    	bench_worker(name, i, file, source, param, debug, function (t) {
    		result.results[i].t = Math.round(t * 100) / 100;
    		callback();
    	});

    }, function () { //finish
    	if (result.results.length > 0) {
    		var first = result.results[0];
    		for (var i = 1; i < result.results.length; i++) {
    			var r = result.results[i];
    			r.percent = ~~((r.t - first.t)*1000)/100;
    		}
    	}

    	result.end = "success";
    	result.name = name;
    	if (end)
    		end(result);
    });
    
}
exports.bench = bench;

function recursive(i, len, f, finish) {
	if (i != len) {
		f(i, function () {recursive(i+1, len, f, finish)});
	} else {
		finish();
	}
}

function log(msg) {
	console.log(msg)
}