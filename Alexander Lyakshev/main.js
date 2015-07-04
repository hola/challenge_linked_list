var ll = require('_linklist');

const MAX_COUNT = 1000000;
const REPEATS = 30;


if(!module.parent) {
    console.log('Starting tests [%s items, %d repeats]',
        String(MAX_COUNT).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u2009'),
        REPEATS);

    // Initialize lists
    var list = {};
    ll.init(list);
    var xnlist1 = require("./xnlinklist").createList();
    var xnlist2 = require("./xnlinklist").createList();
    var xnlist3 = require("./xnlinklist").createList();
    var xnlist4 = require("./xnlinklist").createList();

    // Start benchmark
    var results = [], start, elapsed;
    results[0] = [0];
    results[1] = [0];
    for(var repeatNumb = 1; repeatNumb <= REPEATS; ++repeatNumb) {
        //_linklist
        var items = initItems();
        start = process.hrtime();
        testLinklist(list, items);
        elapsed = process.hrtime(start);

        console.log("  |  #%d _linklist time: %d sec %d \u03bcsec",
            repeatNumb, elapsed[0], Math.floor(elapsed[1] / 1000));
        results[0][repeatNumb] = elapsed[0] * 1e9 + elapsed[1];

        ll.isEmpty(list);

        //xnlist
        items = initItems();
        start = process.hrtime();
        testXnLinklist(xnlist1, xnlist2, xnlist3, xnlist4, items);
        elapsed = process.hrtime(start);

        console.log("  |  #%d xnlist time:    %d sec %d \u03bcsec",
            repeatNumb, elapsed[0], Math.floor(elapsed[1] / 1000));
        results[1][repeatNumb] = elapsed[0] * 1e9 + elapsed[1];

        console.assert(xnlist1.isEmpty());
        console.assert(xnlist2.isEmpty());
        console.assert(xnlist3.isEmpty());
        console.assert(xnlist4.isEmpty());
    }
    // Calculate average and best time
    var best0 = Number.MAX_VALUE, best1 = Number.MAX_VALUE;
    for(repeatNumb = 1; repeatNumb <= REPEATS; ++repeatNumb) {
        results[0][0] += results[0][repeatNumb];
        results[1][0] += results[1][repeatNumb];
        if(results[0][repeatNumb] < best0) {
            best0 = results[0][repeatNumb];
        }
        if(results[1][repeatNumb] < best1) {
            best1 = results[1][repeatNumb];
        }
    }
    results[0][0] /= REPEATS;
    results[1][0] /= REPEATS;

    // Display average and best time
    if(REPEATS > 1) {
        var sec = Math.floor(results[0][0] / 1e9);
        var usec = Math.floor((results[0][0] % 1e9) / 1000);
        var bestSec = Math.floor(best0 / 1e9);
        var bestUsec = Math.floor((best0 % 1e9) / 1000);
        console.log('  | avg _linklist time: %d sec %d \u03bcsec; Best time: %d sec %d \u03bcsec',
            sec, usec, bestSec, bestUsec);
        sec = Math.floor(results[1][0] / 1e9);
        usec = Math.floor((results[1][0] % 1e9) / 1000);
        bestSec = Math.floor(best1 / 1e9);
        bestUsec = Math.floor((best1 % 1e9) / 1000);
        console.log('  |_avg xnlist time:    %d sec %d \u03bcsec; Best time: %d sec %d \u03bcsec',
            sec, usec, bestSec, bestUsec);
    }
}

function testLinklist(list, items) {
    // push items to the list
    for(var iC = 0; iC < MAX_COUNT; ++iC) {
        ll.append(list, items[iC]);
    }
    //console.assert(!ll.isEmpty(list));

    // pop items from the list
    for(iC = 0; iC < MAX_COUNT; ++iC) {
        ll.shift(list);
    }
    //console.assert(ll.isEmpty(list));
}

function testXnLinklist(list1, list2, list3, list4, items) {
    // push items to the lists
    for(var iC = 0; iC < MAX_COUNT;) {
        list1.append(items[iC]);
        ++iC;
        list2.append(items[iC]);
        ++iC;
        list3.append(items[iC]);
        ++iC;
        list4.append(items[iC]);
        ++iC;
    }
    //console.assert(!list1.isEmpty());
    //console.assert(!list2.isEmpty());
    //console.assert(!list3.isEmpty());
    //console.assert(!list4.isEmpty());

    // pop items from the lists
    for(iC = 0; iC < MAX_COUNT;) {
        list1.shift();
        ++iC;
        list2.shift();
        ++iC;
        list3.shift();
        ++iC;
        list4.shift();
        ++iC;
    }
    //console.assert(list1.isEmpty());
    //console.assert(list2.isEmpty());
    //console.assert(list3.isEmpty());
    //console.assert(list4.isEmpty());
}

function initItems() {
    var items = new Array(MAX_COUNT);
    for(var iC = 0; iC < MAX_COUNT; ++iC) {
        items[iC] = { value: iC };
    }
    return items;
}
