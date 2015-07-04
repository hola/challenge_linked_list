/**
 * This benchmark shows BlinkedList capabilities to mimic FIFO(queue) behaviour.
 *
 * 1. Fill container with elements.
 * 2. Shift half of the elements.
 * 3. Fill container back.
 */

/**
 * Lets require dependencies. Some of them have to be assigned to global namespace because of the way
 * benchmark.js works.
 */
var Benchmark = require('benchmark');
global.LinkList = require('_linklist');
global.BlinkedList = require('../BlinkedList.js');
global.Utils = require('./utils.js');

var fifoSuite = new Benchmark.Suite()

    .add('LinkList FIFO using append() and shift()', {
        'setup': function () {
            var list = {};
            LinkList.init(list);
            Utils.fillLinkList(list, Utils.testLength);
        },
        'fn': function () {
            Utils.shiftLinkList(list, Math.floor(Utils.testLength / 2));
            Utils.fillLinkList(list, Math.floor(Utils.testLength / 2));
        }
    })

    .add('Array FIFO using push() and shift()', {
        'setup': function () {
            var array = [];
            Utils.fillArray(array, Utils.testLength);
        },
        'fn': function () {
            Utils.shiftArray(array, Math.floor(Utils.testLength / 2));
            Utils.fillArray(array, Math.floor(Utils.testLength / 2));
        }
    })

    .add('BlinkedList FIFO push() and shift()', {
        'setup': function () {
            var list = new BlinkedList(Utils.testLength);
            Utils.fillArray(list, Utils.testLength);
        },
        'fn': function () {
            Utils.shiftArray(list, Math.floor(Utils.testLength / 2));
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

console.log("Container as FIFO benchmark.");
Utils.testLength = 100;
console.log("Benchmarking for " + Utils.testLength + " elements.");
fifoSuite.run();

Utils.testLength = 1000;
console.log("Benchmarking for " + Utils.testLength + " elements.");
fifoSuite.run();

Utils.testLength = 10000;
console.log("Benchmarking for " + Utils.testLength + " elements.");
fifoSuite.run();


