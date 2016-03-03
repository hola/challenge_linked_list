/**
 * Created by Sergii Stryzhevskyi on 6/20/15.
 */
var LinkedListDefault = require('./lib/_linklist.js');
var LinkedListArray = require('./lib/_linklist-array.js');
var LinkedListArrayAdaptive = require('./lib/_linklist-array-adaptive.js');
var LinkedListMap = require('./lib/_linklist-map.js');
var LinkedListWeakMap = require('./lib/_linklist-weakmap.js');
var LinkedListArrayId = require('./lib/_linklist-arrayid.js');
var LinkedListObject = require('./lib/_linklist-object.js');
var assert = require('assert');
/**
 * Run one cycle of test
 * @param L linked list module
 * @param isMoreThenOneListParentListSupported I hope I understood what you mean in task description :)
 * @param assert
 */
function runTest(L, isMoreThenOneListParentListSupported, assert) {
    var list = {name: 'list'};
    var list2 = {name: 'list2'};

    var A = {name: 'A'};
    var B = {name: 'B'};
    var C = {name: 'C'};
    var D = {name: 'D'};


    L.init(list);
    L.init(list2);
    L.init(A);
    L.init(B);
    L.init(C);
    L.init(D);

    assert.ok(L.isEmpty(list));
    assert.equal(null, L.peek(list));

    L.append(list, A);
// list -> A
    assert.equal(A, L.peek(list));

    L.append(list, B);
// list -> A -> B
    assert.equal(A, L.peek(list));

    L.append(list, C);
// list -> A -> B -> C
    assert.equal(A, L.peek(list));

    L.append(list, D);
// list -> A -> B -> C -> D
    assert.equal(A, L.peek(list));

    var x = L.shift(list);
    assert.equal(A, x);
// list -> B -> C -> D
    assert.equal(B, L.peek(list));

    x = L.shift(list);
    assert.equal(B, x);
// list -> C -> D
    assert.equal(C, L.peek(list));

// B is already removed, so removing it again shouldn't hurt.
    L.remove(B, list);
// list -> C -> D
    assert.equal(C, L.peek(list));

// Put B back on the list
    L.append(list, B);
// list -> C -> D -> B
    assert.equal(C, L.peek(list));

    L.remove(C, list);
// list -> D -> B
    assert.equal(D, L.peek(list));

    L.remove(B, list);
// list -> D
    assert.equal(D, L.peek(list));

    L.remove(D, list);
// list
    assert.equal(null, L.peek(list));


    assert.ok(L.isEmpty(list));


    L.append(list, D);
// list -> D
    assert.equal(D, L.peek(list));

    L.append(list, C);
    L.append(list, B);
    L.append(list, A);
// list -> D -> C -> B -> A

// Append should REMOVE C from the list and append it to the end.
    L.append(list, C);

// list -> D -> B -> A -> C
    assert.equal(D, L.shift(list));
// list -> B -> A -> C
    assert.equal(B, L.peek(list));
    assert.equal(B, L.shift(list));
// list -> A -> C
    assert.equal(A, L.peek(list));
    assert.equal(A, L.shift(list));
// list -> C
    assert.equal(C, L.peek(list));
    assert.equal(C, L.shift(list));
// list
    assert.ok(L.isEmpty(list));

    /* check new features*/

    L.append(list, A);
    L.append(list, B);
    // list -> A -> B

    L.append(list2, A);
    L.append(list2, C);
    // list2 -> A -> C
    if (isMoreThenOneListParentListSupported) {
        assert.ok(L.peek(list) === A);
        assert.ok(L.peek(list2) === A);
    }else{
        assert.ok(L.peek(list) === B);
        assert.ok(L.peek(list2) === A);
    }

}

exports.runTest = runTest;

runTest(LinkedListDefault, false, assert);
runTest(LinkedListArray, true, assert);
runTest(LinkedListArrayAdaptive, true, assert);
runTest(LinkedListMap, true, assert);
runTest(LinkedListWeakMap, true, assert);
runTest(LinkedListArrayId, true, assert);
runTest(LinkedListObject, true, assert);
