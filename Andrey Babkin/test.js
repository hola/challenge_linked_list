'use strict';

(function () {

    var _linklist = require('_linklist'),
        linklist = require('./lib/linklist');

    var
        ITERATIONS = 1000000,
        startTime,
        listObject,
        i,
        obj;


    startTime = Date.now();
    console.log("START ORIGINAL TEST AT", startTime);

    listObject = {};
    _linklist.init(listObject);

    for (i = 0; i < ITERATIONS; i++) {
        _linklist.append(listObject, {
            idx: i
        });
    }

    while (!_linklist.isEmpty(listObject)) {
        obj = _linklist.shift(listObject);
        //console.log(obj);
    }

    console.log("PROCESS TIME IS %d milliseconds", Date.now() - startTime);

    console.log("");

    startTime = Date.now();
    console.log("START CHALLENGED TEST AT", startTime);

    listObject = {};
    listObject.firstList = new linklist.LinkList();
    for (i = 0; i < ITERATIONS; i++) {
        listObject.firstList.append({
            idx: i
        });
    }
    while (!listObject.firstList.isEmpty()) {
        obj = listObject.firstList.shift();
        //console.log(obj);
    }

    // iterator test
    /*listObject.firstList.forEach(function (item) {
        listObject.firstList.remove(item);
    });*/

    // map test
    /*console.log(listObject.firstList.map(function (item) {
        return item;
    }));*/

    console.log("PROCESS TIME IS %d milliseconds", Date.now() - startTime);

}());
