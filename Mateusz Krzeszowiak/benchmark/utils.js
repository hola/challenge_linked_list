var LinkList = require('_linklist');
var Utils = {};

/**
 * Fills array or any collection capable with push() with given number of elements.
 *
 * @param array Array to fill.
 * @param numOfElements Number of elements.
 */
Utils.fillArray = function(array, numOfElements) {
    for(var i = 0; i < numOfElements; i++) {
        array.push({val : i});
    }
};

/**
 * Fills array or any collection capable with [] access with given number of elements.
 *
 * @param array Array to fill.
 * @param numOfElements Number of elements.
 */
Utils.fillArraySet = function(array, numOfElements) {
    for(var i = 0; i < numOfElements; i++) {
        array[array.length] = {val : i};
    }
};

/**
 * Fills node's LinkList using append() with given number of elements.
 *
 * @param list List to fill.
 * @param numOfElements Number of elements.
 */
Utils.fillLinkList = function(list, numOfElements) {
    for(var i = 0; i < numOfElements; i++) {
        LinkList.append(list, {val : i});
    }
};

/**
 * Iterates over array or any collection capable with [] access.
 *
 * @param array Array to iterate over.
 */
Utils.iterateArray = function(array) {
    for(var i = 0, arraySize = array.length; i < arraySize; i++) {
        array[i];
    }
};

/**
 * Iterates node's LinkList using private properties.
 * I had to use private properties because node's implementation doesn't allow iteration without
 * removing elements.
 *
 * @param list Node's LinkList to iterate over.
 */
Utils.iterateNodeList = function(list) {
    var curr = list._idlePrev;
    while(curr !== list) {
        curr = curr._idlePrev;
    }
};
/**
 * Iterates BlinkedList using iterator next() and current() interface.
 *
 * @param {BlinkedList} list BlinkedList to iterate over.
 */
Utils.iterateBlinkedList = function(list) {
    list.reset();
    while(list.next() !== undefined) {
        list.current();
    }
};

/**
 * Iterates BlinkedList using get() method which works similar to [].
 *
 * @param {BlinkedList} list BlinkedList to iterate over.
 */
Utils.iterateBlinkedArray = function(list) {
    for(var i = 0, length = list.length; i < length; i++) {
        list.get(i);
    }
};

/**
 * Accesses element under given index inside array or any collection that implements [] access.
 *
 * @param array Array with elements.
 * @param index Element index.
 * @returns {*} Found element.
 */
Utils.randomAccessArray = function(array, index) {
    return array[index];
};

/**
 * Accesses element under given index inside Node's LinkList.
 * This method basically iterates over list until given index is reached.
 *
 * @param list Node's LinkList with elements.
 * @param index Element index.
 * @returns {*} Found element.
 */
Utils.randomAccessNodeList = function(list, index) {
    var i = 0, curr = list._idlePrev;
    while(i <= index) {
        curr = curr._idlePrev;
        i++;
    }

    return curr;
};

/**
 * Accesses element under given index inside BlinkedList using get() method.
 *
 * @param {BlinkedList} list BlinkedList with elements.
 * @param index Element index.
 * @returns {*} Found element.
 */
Utils.randomAccessBlinkedList = function(list, index) {
    return list.get(index);
};

/**
 * Removes given number of elements from the beginning of Node's LinkList.
 *
 * @param list Node's LinkList .
 * @param numOfElements Number of elements to shift.
 */
Utils.shiftLinkList = function(list, numOfElements) {
    for(var i = 0; i < numOfElements; i++) {
        LinkList.shift(list);
    }
};

/**
 * Removes given number of elements from the beginning of array or any container that implements shift() method.
 *
 * @param array Array or container with elements.
 * @param numOfElements Number of elements to shift.
 */
Utils.shiftArray = function(array, numOfElements) {
    for(var i = 0; i < numOfElements; i++) {
        array.shift();
    }
};

/**
 * Removes given number of elements from the end of array or any container that implements pop() method.
 *
 * @param array Array or container with elements.
 * @param numOfElements Number of elements to shift.
 */
Utils.popArray = function(array, numOfElements) {
    for(var i = 0; i < numOfElements; i++) {
        array.pop();
    }
};

module.exports = Utils;