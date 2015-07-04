"use strict";
var Benchmark = require("benchmark");
global.nodeList = require('./src/nodejs-linklist');
global.GettersList = require('./src/prebuilt-getters');
global.SymbolList = require('./src/symbol-based');
global.WrappedList = require('./src/wrapped-items');

function printPlatform() {
    console.log("\nPlatform info:");
    var os = require("os");
    var v8 = process.versions.v8;
    var node = process.versions.node;
    var plat = os.type() + " " + os.release() + " " + os.arch() + "\nNode.JS " + node + "\nV8 " + v8;
    var cpus = os.cpus().map(function(cpu) {
        return cpu.model;
    }).reduce(function(o, model) {
        if(!o[model]) o[model] = 0;
        o[model]++;
        return o;
    }, {});
    cpus = Object.keys(cpus).map(function(key) {
        return key + " \u00d7 " + cpus[key];
    }).join("\n");
    console.log(plat + "\n" + cpus + "\n");
}

global.listLength = 10000;

function appendAndShift() {
    var previous = {}, item;
    this.list.init(previous);
    for(var i = 0; i < listLength; i++) {
        item = {};
        this.list.append(previous, item);
        previous = item;
    }
    while(!this.list.isEmpty(item)) {
        this.list.shift(item);
    }
}

var shiftSuite = new Benchmark.Suite()
    .add("nodejs-linklist", {
        setup: function() {
            this.list = nodeList;
        },
        fn: appendAndShift
    })
    .add('symbol-based', {
        setup: function() {
            this.list = new SymbolList();
        },
        fn: appendAndShift
    })
    .add("prebuilt-getters", {
        setup: function() {
            this.list = new GettersList();
        },
        fn: appendAndShift
    })
    .add('wrapped-items', {
        setup: function() {
            this.list = new WrappedList();
        },
        fn: function() {
            var previous = this.list.init({}), item;
            for(var i = 0; i < listLength; i++) {
                item = this.list.init({});
                this.list.append(previous, item);
                previous = item;
            }
            while(!this.list.isEmpty(item)) {
                this.list.shift(item);
            }
        }
    })
    .on("cycle", function(e) {
        console.log("" + e.target);
    })
    .on("error", function(e) {
        console.log(e.target.error.stack);
    });

function findTotal() {
    var first = {index: 0},
        previous = first,
        item;
    this.list.init(previous);
    for(var i = 1; i < listLength; i++) {
        item = {index: i};
        this.list.append(previous, item);
        previous = item;
    }
    var total = 0;
    while((item = this.list.peek(item)) !== first) {
        total += item.index;
    }
}

var iterationSuite = new Benchmark.Suite()
    .add("nodejs-linklist", {
        setup: function() {
            this.list = nodeList;
        },
        fn: findTotal
    })
    .add('symbol-based', {
        setup: function() {
            this.list = new SymbolList();
        },
        fn: findTotal
    })
    .add("prebuilt-getters", {
        setup: function() {
            this.list = new GettersList();
        },
        fn: findTotal
    })
    .add('wrapped-items', {
        setup: function() {
            this.list = new WrappedList();
        },
        fn: function() {
            var first = this.list.init({index: 0}),
                previous = first,
                item;
            for(var i = 1; i < listLength; i++) {
                item = this.list.init({index: i});
                this.list.append(previous, item);
                previous = item;
            }
            var total = 0;
            while((item = this.list.peek(item)) !== first) {
                total += item.data.index;
            }
        }
    })
    .on("cycle", function(e) {
        console.log("" + e.target);
    })
    .on("error", function(e) {
        console.log(e.target.error.stack);
    });

printPlatform();
console.log('--- Shift tests ---');
shiftSuite.run();

console.log('--- Peek tests ---');
iterationSuite.run();
