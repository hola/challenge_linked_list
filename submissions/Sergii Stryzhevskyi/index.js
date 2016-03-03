/**
 * Created by Sergii Stryzhevskyi on 6/20/15.
 */
var Benchmark = require('benchmark');
var LinkedListDefault = require('./lib/_linklist.js');
var LinkedListArray = require('./lib/_linklist-array.js');
var LinkedListArrayAdaptive = require('./lib/_linklist-array-adaptive.js');
var LinkedListMap = require('./lib/_linklist-map.js');
var LinkedListWeakMap = require('./lib/_linklist-weakmap.js');
var LinkedListArrayId = require('./lib/_linklist-arrayid.js');
var LinkedListObject = require('./lib/_linklist-object.js');
var test = require('./test.js');

var assert = {
    equal: function () {
    },
    ok: function () {
    }
};
var suite = new Benchmark.Suite;
var results = ['\nTest similar to default but with new feature'];

function runBunch(L, customList) {
    test.runTest(L, customList, assert);

}
// add tests
suite
    .add('Default (Joyent\'s) linked list\t', function () {
        runBunch(LinkedListDefault, false);
    })
    .add('Array (splice) linked list\t', function () {
        runBunch(LinkedListArray, true)
    })
    .add('Array (adaptive) linked list\t', function () {
        runBunch(LinkedListArrayAdaptive, true)
    })
    .add('Array of IDs linked list\t', function () {
        runBunch(LinkedListArrayId, true)
    })
    .add('Object linked list\t\t', function () {
        runBunch(LinkedListObject, true)
    })
    .add('Map linked list\t\t\t', function () {
        runBunch(LinkedListMap, true)
    })
    .add('WeakMap linked list\t\t', function () {
        runBunch(LinkedListWeakMap, true)
    })
    .on('cycle', function (event) {
        results.push(String(event.target));
    })
    .on('complete', function () {
        results.push('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log(results.join('\n'));
    })
    .run({'async': true});