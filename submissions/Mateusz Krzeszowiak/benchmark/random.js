/**
 * This benchmark tests random access to elements in containers with 100, 10000 and 1000000 elements.
 */

/**
 * Lets require dependencies. Some of them have to be assigned to global namespace because of the way
 * benchmark.js works.
 */
var Benchmark = require('benchmark');
global.LinkList = require('_linklist');
global.BlinkedList = require('../BlinkedList.js');
global.Utils = require('./utils.js');

var randomAccessSuite = new Benchmark.Suite()
    .add('LinkList random element access', {
        'setup': function () {
            var list = {};
            LinkList.init(list);
            Utils.fillLinkList(list, Utils.testLength);
        },
        'fn': function () {
            Utils.randomAccessNodeList(list, Math.floor(Math.random() * Utils.testLength));
        }
    })

    .add('Array random element access', {
        'setup': function () {
            var array = [];
            Utils.fillArray(array, Utils.testLength);
        },
        'fn': function () {
            Utils.randomAccessArray(array, Math.floor(Math.random() * Utils.testLength));
        }
    })

    .add('BlinkedList random element access', {
        'setup': function () {
            var array = new BlinkedList(Utils.testLength);
            Utils.fillArray(array, Utils.testLength);
        },
        'fn': function () {
            Utils.randomAccessBlinkedList(array, Math.floor(Math.random() * Utils.testLength));
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log();
    });

console.log("Random access benchmark.");
Utils.testLength = 100;
console.log("Benchmarking for " + Utils.testLength + " elements.");
randomAccessSuite.run();

Utils.testLength = 10000;
console.log("Benchmarking for " + Utils.testLength + " elements.");
randomAccessSuite.run();

Utils.testLength = 1000000;
console.log("Benchmarking for " + Utils.testLength + " elements.");
randomAccessSuite.run();