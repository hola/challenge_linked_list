
var TotalCycle = 1;
var TotalObjects = 500000;

// for testing. When flag=0 it prints TotalObjects*2/3 item
var FlagTest1 = 0;
var FlagTest2 = 0;
var FlagTest3 = 0;
var FlagTest4 = 0;



/* *********** Start Original Code *********** */
function init(list) {
    //console.log('init');
    
    list._idleNext = list;
    list._idlePrev = list;

}
exports.init = init;

// show the most idle item
function peek(list) {
    if (list._idlePrev == list) return null;
    return list._idlePrev;
}
exports.peek = peek;

// remove the most idle item from the list
function shift(list) {
    var first = list._idlePrev;
    remove(first);
    return first;
}
exports.shift = shift;

// remove a item from its list
function remove(item) {
    if (item._idleNext) {
        item._idleNext._idlePrev = item._idlePrev;
    }
    if (item._idlePrev) {
        item._idlePrev._idleNext = item._idleNext;
    }
    item._idleNext = null;
    item._idlePrev = null;
}
exports.remove = remove;

// remove a item from its list and place at the end.
function append(list, item) {
    
    remove(item);
    item._idleNext = list._idleNext;
    list._idleNext._idlePrev = item;
    item._idlePrev = list;
    list._idleNext = item;
}
exports.append = append;

function isEmpty(list) {
    return list._idleNext === list;
}
exports.isEmpty = isEmpty;

/* *********** END Original Code *********** */




/* *********** Start DataType Original Code *********** */

function LLItem(data) {
    this._idleNext ;
    this._idlePrev ;
    this._data = data;
}


function LLList() {
    this._idleNext = null ;
    this._idlePrev = null;

}

/* *********** End DataType Original Code *********** */



/* *********** Start New Class *********** */

function LLItemNew(data) {
    this._idleNextNew;
    this._idlePrevNew;
    this._data = data;
}


function LL() {
    
}

LL.prototype = {
    _idleNextNew: null,
    _idlePrevNew: null
};


LL.prototype.initNew = function initNew() {
    this._idleNextNew = this;
    this._idlePrevNew = this;

}

LL.prototype.removeNew = function removeNew(item) {

    if (item._idleNextNew) {
        item._idleNextNew._idlePrevNew = item._idlePrevNew;
    }
    if (item._idlePrevNew) {
        item._idlePrevNew._idleNextNew = item._idleNextNew;
    }

    item._idleNextNew = null;
    item._idlePrevNew = null;
}


LL.prototype.appendNew = function appendNew(item) {

   this.removeNew(item);

    item._idleNextNew = this._idleNextNew;
    this._idleNextNew._idlePrevNew = item;
    item._idlePrevNew = this;
    this._idleNextNew = item;

}

LL.prototype.peekNew = function peekNew() {
    if (this._idlePrevNew == this) return null;
    return this._idlePrevNew;
}

LL.prototype.shiftNew = function shiftNew() {
    var first = this._idlePrevNew;
    this.removeNew(first);
    return first;
}


LL.prototype.isEmptyNew = function isEmpty() {
    return this._idleNextNew === this;
}

/* *********** End New Class *********** */



/* *********** Start New Class3 *********** */

function LLItemNew3(data) {
    this._idleNextNew3;
    this._idlePrevNew3;
    this._data = data;
}


function LL3() {

}

LL3.prototype = {
    _idleNextNew3: null,
    _idlePrevNew3: null
};


LL3.initNew3 = function initNew3(list3) {
    list3._idleNextNew3 = list3;
    list3._idlePrevNew3 = list3;

}



LL3.removeNew3 = function removeNew3(item) {

    if (item._idleNextNew3) {
        item._idleNextNew3._idlePrevNew3 = item._idlePrevNew3;
    }
    if (item._idlePrevNew3) {
        item._idlePrevNew3._idleNextNew3 = item._idleNextNew3;
    }

    item._idleNextNew3 = null;
    item._idlePrevNew3 = null;
}


LL3.appendNew3 = function appendNew3(list3,item) {

    LL3.removeNew3(item);

    item._idleNextNew3 = list3._idleNextNew3;
    list3._idleNextNew3._idlePrevNew3 = item;
    item._idlePrevNew3 = list3;
    list3._idleNextNew3 = item;

}

LL3.peekNew3 = function peekNew3(list3) {
    if (list3._idlePrevNew3 == list3) return null;
    return list3._idlePrevNew3;
}


LL3.shiftNew3 = function shiftNew3(list3) {
    var first3 = list3._idlePrevNew3;
    LL3.removeNew3(first3);
    return first3;
}


LL3.isEmptyNew3 = function isEmpty3(list3) {
    return list3._idleNextNew3 === list3;
}




/* *********** End New Class3 *********** */





/* *********** Start New Class4 *********** */

function LLItemNew4(data) {
    this._idleNextNew4;
    this._idlePrevNew4;
    this._data = data;
}


function LLList4() {
    this._idleNextNew4 = null;
    this._idlePrevNew4 = null;
}


var LL4= {

    _idleNextNew4: _idleNextNew4 = null,
    _idlePrevNew4: _idlePrevNew4 = null,


initNew4: function (list4) {
    list4._idleNextNew4 = list4;
    list4._idlePrevNew4 = list4;


},



removeNew4 : function (item) {

    //console.log('remove next: ' + item._idleNextNew4._data + ' Remove prev: ' + item._idlePrevNew4._data);


    if (item._idleNextNew4) {

        item._idleNextNew4._idlePrevNew4 = item._idlePrevNew4;
    }
    if (item._idlePrevNew4) {
        item._idlePrevNew4._idleNextNew4 = item._idleNextNew4;

    }

    item._idleNextNew4 = null;
    item._idlePrevNew4 = null;
},


appendNew4 : function (list4, item) {

    this.removeNew4(item);

    item._idleNextNew4 = list4._idleNextNew4;
    list4._idleNextNew4._idlePrevNew4 = item;
    item._idlePrevNew4 = list4;
    list4._idleNextNew4 = item;

},

peekNew4 : function (list4) {
    if (list4._idlePrevNew4 == list4) return null;
    return list4._idlePrevNew4;
},

shiftNew4: function (list4) {


    var first4 = list4._idlePrevNew4;
    this.removeNew4(first4);
  
    return first4;
},


isEmptyNew4 : function (list4) {
    return list4._idleNextNew4 === list4;
}

}


/* *********** End New Class4 *********** */



/* *********** Start Testing *********** */

var util = require('util');

var memStart = process.memoryUsage();

var start = +new Date();  // log start timestamp
for (var i = 0; i < TotalCycle; i++) {
    function1();
}
var end = +new Date();  // log end timestamp
var diff = end - start;

var memEnd = process.memoryUsage();

console.log('Type 1 : TotalTime: ' + diff + ' rss: ' + (memEnd.rss - memStart.rss) + ' heapTotal: ' + (memEnd.heapTotal - memStart.heapTotal) + ' heapUsed: ' + (memEnd.heapUsed - memStart.heapUsed));


memStart = process.memoryUsage();
start = +new Date();  // log start timestamp
for (var i = 0; i < TotalCycle; i++) {
    function2();
}

end = +new Date();  // log end timestamp
diff = end - start;

memEnd = process.memoryUsage();
console.log('Type 2 : TotalTime: ' + diff + ' rss: ' + (memEnd.rss - memStart.rss) + ' heapTotal: ' + (memEnd.heapTotal - memStart.heapTotal) + ' heapUsed: ' + (memEnd.heapUsed - memStart.heapUsed));




memStart = process.memoryUsage();
start = +new Date();  // log start timestamp
for (var i = 0; i < TotalCycle; i++) {
    function3();
}

end = +new Date();  // log end timestamp
diff = end - start;

memEnd = process.memoryUsage();
console.log('Type 3 : TotalTime: ' + diff + ' rss: ' + (memEnd.rss - memStart.rss) + ' heapTotal: ' + (memEnd.heapTotal - memStart.heapTotal) + ' heapUsed: ' + (memEnd.heapUsed - memStart.heapUsed));



memStart = process.memoryUsage();
start = +new Date();  // log start timestamp
for (var i = 0; i < TotalCycle; i++) {
    function4();
}

end = +new Date();  // log end timestamp
diff = end - start;

memEnd = process.memoryUsage();
console.log('Type 4 : TotalTime: ' + diff + ' rss: ' + (memEnd.rss - memStart.rss) + ' heapTotal: ' + (memEnd.heapTotal - memStart.heapTotal) + ' heapUsed: ' + (memEnd.heapUsed - memStart.heapUsed));



function function1() {

    var testList = new LLList();
    
    // INIT
    exports.init(testList);

    //APPENED
    for (var i = 0; i < TotalObjects; i++) {
        var testItem = new LLItem(i);
        exports.append(testList, testItem);
        //console.log('peek: ' + peek(testList)._data);
          
    }

    // REMOVE
    for (var i = 0; i < TotalObjects/3; i++) {
        exports.remove(testList._idlePrev);
    }

    // Shift
    for (var i = 0; i < TotalObjects/3; i++) {
        exports.shift(testList);
    }

    // Print middle
    if (FlagTest1 == 0) {
        console.log('peek: ' + peek(testList)._data);
        FlagTest1 = 1;
    }

    // IsEmpty
    while (isEmpty(testList)==false) {
        exports.shift(testList);
    } 

}


function function2() {

    var p = new LL();

    // INIT
    p.initNew();
     
    // APPENED
    for (var i = 0; i < TotalObjects; i++) {
        var testItemNew = new LLItemNew(i);
        p.appendNew(testItemNew);
    }

    // REMOVE
    for (var i = 0; i < TotalObjects/3; i++) {
        p.removeNew(p._idlePrevNew);
    }


    // Shift
    for (var i = 0; i < TotalObjects/3; i++) {
        p.shiftNew();
    }

    // Print middle
    if (FlagTest2 == 0) {
        console.log('peek: ' + p.peekNew()._data);
        FlagTest2 = 1;
    }

   

    // IsEmpty
    while (p.isEmptyNew()==false) {
        p.shiftNew();
    }
}



function function3() {

    var p = new LL3();

    // INIT
    LL3.initNew3(p);

    // APPENED
    for (var i = 0; i < TotalObjects; i++) {
        var testItemNew = new LLItemNew3(i);
        LL3.appendNew3(p,testItemNew);

        // console.log('peek: ' + p.peekNew()._data);

    }

    //  REMOVE
    for (var i = 0; i < TotalObjects /3; i++) {
        LL3.removeNew3(p._idlePrevNew3);
    }


    // Shift
    for (var i = 0; i < TotalObjects / 3; i++) {
        LL3.shiftNew3(p);
    }

    // peek + Print middle
    if (FlagTest3 == 0) {
        console.log('peek: ' + LL3.peekNew3(p)._data);
        FlagTest3 = 1;
    }

    // IsEmpty
    while (LL3.isEmptyNew3(p) == false) {
        LL3.shiftNew3(p);
    }
}



function function4() {

    var testList4 = new LLList4();

    var p = LL4;

    // INIT
    p.initNew4(testList4);

    // APPENED
    for (var i = 0; i < TotalObjects; i++) {
        var testItemNew4 = new LLItemNew4(i);
        p.appendNew4(testList4, testItemNew4);
    }

    // REMOVE
    for (var i = 0; i < TotalObjects / 3; i++) {
            p.removeNew4(testList4._idlePrevNew4);
    }

    // Shift
    for (var i = 0; i < TotalObjects / 3; i++) {
        p.shiftNew4(testList4);
    }

    // peek + Print middle
    if (FlagTest4 == 0) {
        console.log('peek: ' + p.peekNew4(testList4)._data);
        FlagTest4 = 1;
    }
    
    // IsEmpty
    while (p.isEmptyNew4(testList4) == false) {
        p.shiftNew4(testList4);
    }
    }


    
    /* *********** End Testing *********** */

