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

var suite = new Benchmark.Suite;
/**
 * Change this 1..10000
 * @type {number}
 */
var count = 100;
var results = ['\nTest with "append" and "remove" for list with ' + count + ' elements'];
var benchmarks = [];

function runBunch(L) {
    var lists = [], list;
    var root = {name : 'root'};
    L.init(root);
    for(var i =0;i<count;i++){
        list = {name: i};
        L.init(list);
        lists.push(list);
    }
    return function(){
        lists.forEach(function(list){
            L.append(root, list);
        });
        lists.forEach(function(list){
            L.remove(list, root);
        });
    }
}
benchmarks.push(runBunch(LinkedListDefault));
benchmarks.push(runBunch(LinkedListArray));
benchmarks.push(runBunch(LinkedListArrayAdaptive));
benchmarks.push(runBunch(LinkedListArrayId));
benchmarks.push(runBunch(LinkedListObject));
benchmarks.push(runBunch(LinkedListMap));
benchmarks.push(runBunch(LinkedListWeakMap));
// add tests
suite
    .add('Default (Joyent\'s) linked list\t', function () {
        benchmarks[0]();
    })
    .add('Array (splice) linked list\t', function () {
        benchmarks[1]();
    })
    .add('Array (adaptive) linked list\t', function () {
        benchmarks[2]();
    })
    .add('Array of IDs linked list\t', function () {
        benchmarks[3]();
    })
    .add('Object linked list\t\t', function () {
        benchmarks[4]();
    })
    .add('Map linked list\t\t\t', function () {
        benchmarks[5]();
    })
    .add('WeakMap linked list\t\t', function () {
        benchmarks[6]();
    })
    .on('cycle', function (event) {
        results.push(String(event.target));
    })
    .on('complete', function () {
        results.push('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log(results.join('\n'));
    })
    .run({'async': false});