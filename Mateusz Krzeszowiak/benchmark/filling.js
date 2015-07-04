/**
 * This benchmark tests filling containers with 100, 10000 and 1000000 elements.
 */

/**
 * Lets require dependencies. Some of them have to be assigned to global namespace because of the way
 * benchmark.js works.
 */
var Benchmark = require('benchmark');
global.LinkList = require('_linklist');
global.BlinkedList = require('../BlinkedList.js');
global.Utils = require('./utils.js');

var fillingSuite = new Benchmark.Suite()
    .add('LinkList filling with push()', {
        'setup': function () {
            var list = {};
        },
        'fn': function () {
            list = {};
            LinkList.init(list);
            Utils.fillLinkList(list, Utils.testLength);
        }
    })

    .add('Array filling with push()', {
        'setup': function () {
            var array;
        },
        'fn': function () {
            array = [];
            Utils.fillArray(array, Utils.testLength);
        }
    })

    .add('Array filling with []', {
        'setup': function () {
            var array;
        },
        'fn': function () {
            array = [];
            Utils.fillArraySet(array, Utils.testLength);
        }
    })

    .add('BlinkedList filling with push()', {
        'setup': function () {
            var list;
        },
        'fn': function () {
            list = new BlinkedList(Utils.testLength);
            Utils.fillArray(list, Utils.testLength);
        }
    })

    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log();
    });

console.log("Container filling benchmark.");
Utils.testLength = 100;
console.log("Benchmarking for " + Utils.testLength + " elements.");
fillingSuite.run();

Utils.testLength = 10000;
console.log("Benchmarking for " + Utils.testLength + " elements.");
fillingSuite.run();

Utils.testLength = 1000000;
console.log("Benchmarking for " + Utils.testLength + " elements.");
fillingSuite.run();