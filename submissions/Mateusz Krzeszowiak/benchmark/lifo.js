/**
 * This benchmark shows BlinkedList capabilities to mimic LIFO(stack) behaviour.
 * Node's LinkList doesn't implement required methods so it's not included in this test.
 *
 * 1. Fill container with elements.
 * 2. Pop half of the elements.
 * 3. Fill container back.
 */

/**
 * Lets require dependencies. Some of them have to be assigned to global namespace because of the way
 * benchmark.js works.
 */
var Benchmark = require('benchmark');
global.BlinkedList = require('../BlinkedList.js');
global.Utils = require('./utils.js');

var lifoSuite = new Benchmark.Suite()
    .add('Array LIFO using push() and pop()', {
        'setup': function () {
            var array = [];
            Utils.fillArray(array, Utils.testLength);
        },
        'fn': function () {
            Utils.popArray(array, Math.floor(Utils.testLength / 2));
            Utils.fillArray(array, Math.floor(Utils.testLength / 2));
        }
    })

    .add('BlinkedList LIFO push() and pop()', {
        'setup': function () {
            var list = new BlinkedList(Utils.testLength);
            Utils.fillArray(list, Utils.testLength);
        },
        'fn': function () {
            Utils.popArray(list, Math.floor(Utils.testLength / 2));
            Utils.fillArray(list, Math.floor(Utils.testLength / 2));
        }
    })

    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log();
    });

console.log("Container as LIFO benchmark.");
Utils.testLength = 100;
console.log("Benchmarking for " + Utils.testLength + " elements.");
lifoSuite.run();

Utils.testLength = 1000;
console.log("Benchmarking for " + Utils.testLength + " elements.");
lifoSuite.run();

Utils.testLength = 10000;
console.log("Benchmarking for " + Utils.testLength + " elements.");
lifoSuite.run();