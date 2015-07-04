var Benchmark = require('benchmark');
var assert = require('assert');

// allow compiled code to see this variables
global.original = require('./original');
global.mine = require('./mine');

global.prefilledOriginal = {};
global.prefilledMine = {};

var defaultSuiteOptions =
{
    'onCycle': function (event)
    {
        console.log(String(event.target));
    },
    'onError': function (event)
    {
        console.log('Error: ' + event.target.error);
    }
};


global.original.init(global.prefilledOriginal);
// isEmpty/peek has O(1), so we can use any N (volume of input)
global.original.append(global.prefilledOriginal, {data: 0});

// i know that we receive handle === 0, so i use it just as constant
global.mine.init(global.prefilledMine);
global.mine.append(global.prefilledMine, 0, {data: 0});

var suite = new Benchmark.Suite('suite', defaultSuiteOptions);

/**
 * === ISEMPTY ===
 */
// setup() / teardown() can be skipped between test iteration, so to make clear results, it's better to use prefilled lists
suite.add('isempty_original', function()
{
    for (var i = 0; i < 1000; ++i)
        original.isEmpty(prefilledOriginal);
});

suite.add('isempty_mine', function()
{
    for (var i = 0; i < 1000; ++i)
        mine.isEmpty(prefilledMine, 0);
});

/**
 * === PEEK ===
 */

// setup() / teardown() can be skipped between test iteration, so to make clear results, it's better to use prefilled lists
suite.add('peek_original', function()
{
    for (var i = 0; i < 1000; ++i)
        original.peek(prefilledOriginal);
});

suite.add('peek_mine', function()
{
    for (var i = 0; i < 1000; ++i)
        mine.peek(prefilledMine, 0);
});

/**
 * === SHIFT ===
 */

// if test function finishes too early, Benchmark.js try to execute it several times w/o setup()/teardown()
// but we definitely need setup() function, coz shift() spoils test data, so we should choose number of iteration wisely
// in this case, it's simple - if test would be too fast, error occures
suite.add('shift_original', function()
{
    for (i = 0; i < 10000000; ++i)
        original.shift(list);
},
{
    // to improve accuracy
    minSamples: 10,
    'setup': function ()
    {
        var list = {};
        original.init(list);
        for (var i = 0; i < 10000000; ++i)
            original.append(list, {data: i});
    },
    'teardown': function ()
    {
        // release list, cyclic references can be evil!
        while (!original.isEmpty(list))
            original.shift(list);

        list._idlePrev = null;
        list._idleNext = null;
    }
});

suite.add('shift_mine', function()
{
    for (i = 0; i < 10000000; ++i)
        mine.shift(list, handle);
},
{
    // to improve accuracy
    minSamples: 10,
    'setup': function ()
    {
        var list = {};
        var handle = mine.init(list);
        for (var i = 0; i < 10000000; ++i)
            mine.append(list, handle, {data: i});
    },
    'teardown': function ()
    {
        // release list, cyclic references can be evil!
        mine.free(list, handle);
    }
});

/**
 * === REMOVE ===
 */
// similar situation
suite.add('remove_original', function()
{
    // shift works with list._idlePrev, so we go reverse order to test this function correctly
    for (i = 0; i < 10000000; ++i)
        original.remove(list._idleNext);
},
{
    // to improve accuracy
    minSamples: 10,
    'setup': function ()
    {
        var list = {};
        original.init(list);
        for (var i = 0; i < 10000000; ++i)
            original.append(list, {data: i});
    },
    'teardown': function ()
    {
        // release list, cyclic references can be evil!
        while (!original.isEmpty(list))
            original.shift(list);

        list._idlePrev = null;
        list._idleNext = null;
    }
});

suite.add('remove_mine', function()
{
    // shift works with list._prev, so we go reverse order to test this function correctly
    for (i = 0; i < 10000000; ++i)
        mine.remove(list.__lists[0][1]);
},
{
    // to improve accuracy
    minSamples: 10,
    'setup': function ()
    {
        var list = {};
        var handle = mine.init(list);
        for (var i = 0; i < 10000000; ++i)
            mine.append(list, handle, {data: i});
    },
    'teardown': function ()
    {
        // release list, cyclic references can be evil!
        mine.free(list, handle);
    }
});

/**
 * === APPEND ===
 */
// if framework would skip setup()/teardown(), it does not matter for this operation
suite.add('append_original', function()
{
    for (var i = 0; i < 100; ++i)
        original.append(list, {data: i});
},
{
    'setup': function ()
    {
        var list = {};
        original.init(list);
    },
    'teardown': function ()
    {
        // release list, cyclic references can be evil!
        while (!original.isEmpty(list))
            original.shift(list);

        list._idlePrev = null;
        list._idleNext = null;
    }
});

suite.add('append_mine', function()
{
    for (var i = 0; i < 100; ++i)
        mine.append(list, handle, {data: i});
},
{
    'setup': function ()
    {
        var list = {};
        var handle = mine.init(list);
    },
    'teardown': function ()
    {
        // release list, cyclic references can be evil!
        mine.free(list, handle);
    }
});

if (require.main === module)
    suite.run({async: false});