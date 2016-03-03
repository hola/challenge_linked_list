/**
 * This benchmark tests iterating containers with 100, 10000 and 1000000 elements.
 */

/**
 * Lets require dependencies. Some of them have to be assigned to global namespace because of the way
 * benchmark.js works.
 */
var Benchmark = require('benchmark');
global.LinkList = require('_linklist');
global.BlinkedList = require('../BlinkedList.js');
global.Utils = require('./utils.js');

var iteratingSuite = new Benchmark.Suite()
    .add('LinkList iteration', {
        'setup': function () {
            var list = {};
            LinkList.init(list);
            Utils.fillLinkList(list, Utils.testLength);
        },
        'fn': function () {
            Utils.iterateNodeList(list);
        }
    })

    .add('Array iteration', {
        'setup': function () {
            var array = [];
            Utils.fillArray(array, Utils.testLength);
        },
        'fn': function () {
            Utils.iterateArray(array);
        }
    })

    .add('BlinkedList iteration with next(), current()', {
        'setup': function () {
            var array = new BlinkedList(Utils.testLength);
            Utils.fillArray(array, Utils.testLength);
        },
        'fn': function () {
            Utils.iterateBlinkedList(array);
        }
    })

    .add('BlinkedList iteration with []', {
        'setup': function () {
            var array = new BlinkedList(Utils.testLength);
            Utils.fillArray(array, Utils.testLength);
        },
        'fn': function () {
            Utils.iterateBlinkedArray(array);
        }
    })

    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log();
    });

console.log("Container iterating.");
Utils.testLength = 1000;
console.log("Benchmarking for " + Utils.testLength + " elements.");
iteratingSuite.run();

Utils.testLength = 10000;
console.log("Benchmarking for " + Utils.testLength + " elements.");
iteratingSuite.run();

Utils.testLength = 100000;
console.log("Benchmarking for " + Utils.testLength + " elements.");
iteratingSuite.run();