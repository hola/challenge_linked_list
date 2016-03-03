/***********************************************************
 * The challenge: generalize NodeJS's linklist
 * Description and Rules, http://hola.org/challenge_js?l
 * Copyright 2015 Sergii Shpak <sergii.shpak.web@gmail.com>
 * MIT License, http://shps.mit-license.org
 ************************************************************/

/* Challenge Dependencies */

var heapdump = require('heapdump'),
    suite = require('benchmark').Suite('performance');

/* Challenge Solutions */

var // Original solution
    LinkListOriginal = require('./lib/_linklistoriginal'),
    // Generic Solution #1
    LinkListGeneric1 = require('./lib/_linklistgeneric-1'),
    // Generic Solution #2
    LinkListGeneric2 = require('./lib/_linklistgeneric-2');

/* Define List Parents & Default Lists Initialization (idle) */

var listOriginal,
    listGeneric1,
    listGeneric2,
    defaultListInitialization = function () {

        // Lists Parents
        listOriginal = {};
        listGeneric1 = {};
        listGeneric2 = {};

        // Init/Create original list
        LinkListOriginal.init(listOriginal);

        // Init/Create generic list with solution #1
        // Pass 'listName' to constructor if you want to use cached version of List constructor,
        // listGeneric1.idle = new LinkListGeneric1('idle'), otherwise list name will be generated dynamically.
        // If you want to have possibility of creation list items manually ({ 'listName': {prev:..., next:...} })
        // You can get 'listName' key by calling listGeneric1.idle.getKey()
        listGeneric1.idle = new LinkListGeneric1();

        // Init/Create generic list with solution #2
        listGeneric2.idle = new LinkListGeneric2();
    };


/* Performance Suite */

suite
    .on('start complete', function (ev) {

        // Init Lists with defaults, creates listOriginal, listGeneric1.idle, listGeneric2.idle as lists
        defaultListInitialization();

        console.log("\r\n\Performance test has been " +
            (ev.type == 'start' ? "started ... please wait" : "successfully completed!"));
    })
    .on('cycle', function (ev) {
        console.log(String(ev.target));
    })
    // Original solution
    .add('ORIGINAL   ', function () {
        var item = {};
        LinkListOriginal.append(listOriginal, item);
        LinkListOriginal.remove(item);
    })
    // Generic solution (1)
    .add('GENERIC #1 ', function () {
        var item = {};
        listGeneric1.idle.append(item);
        listGeneric1.idle.remove(item);
    })
    // Generic solution (2)
    .add('GENERIC #2 ', function () {
        var item = {},
            listItem = listGeneric2.idle.append(item);
        // Pay attention, remove list item, not item
        listGeneric2.idle.remove(listItem);
    })
    .on('complete', function () {
        console.log('Solution #1 faster than original in ' + Math.round(this[1].hz / this[0].hz * 100) / 100 + ' times');
        console.log('Solution #2 faster than original in ' + Math.round(this[2].hz / this[0].hz * 100) / 100 + ' times');
    })
    .run({async: false});


/* Memory Test */

(function () {

    console.log('\r\nMemory test has been started ... please wait');

    // Init Lists with defaults, creates listOriginal, listGeneric1.idle, listGeneric2.idle as lists
    defaultListInitialization();

    // Creates unique test item constructors,
    // to simplify future memory comparison located for each lists item in heap snapshot
    var OriginalItemConstructor = function () {},
        GenericItemConstructor1 = function () {},
        GenericItemConstructor2 = function () {};

    // Creates 10,000 items of each list
    var polyfillListItems = function () {
        for (var i = 0; i < 10000; i++) {

            // Use 'OriginalItemConstructor' constructor name to find amount memory located for Original list items
            LinkListOriginal.append(listOriginal, new OriginalItemConstructor());

            // Use 'GenericItemConstructor1' constructor name to find amount memory located for Generic1(1) list items
            listGeneric1.idle.append(new GenericItemConstructor1());

            // As Solution #2 uses different approach and does not change 'GenericItemTestConstructor2' instances,
            // it is wrong to analyze memory amount located for objects created with 'GenericItemTestConstructor2' constructor,
            // For proper comparison in heap snapshot please look memory amount located for objects which created with 'ItemGeneric'
            // constructor. 'ItemGeneric' instances have references to 'GenericItemTestConstructor2' as 'data' property.

            // Use 'ItemGeneric' constructor name to find amount memory located for Generic1(2) list items
            listGeneric2.idle.append(new GenericItemConstructor2());
        }
    };

    // Creates Memory Leak
    var memoryLeak = setInterval(polyfillListItems, 1000);

    // Creates Snapshot and resolves Memory Leak after 1 second
    setTimeout(function () {
        heapdump.writeSnapshot('./snapshots/snapshot.heapsnapshot');
        clearInterval(memoryLeak);
        console.log('Memory test has been successfully completed!');
        console.log('Heap Dump Snapshot has been successfully created and can be profiled '+
            '[./snapshots/snapshot.heapsnapshot]\r\n');
    }, 1000);
})();