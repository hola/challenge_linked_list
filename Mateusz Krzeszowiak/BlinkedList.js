/**
 * BlinkedList
 * Circular buffer based linked list implementation for NodeJS.
 * @author Mateusz Krzeszowiak
 */

"use strict";

/**
 * Creates new list object. Optional parameter allows you to set initial capacity if you know
 * how many elements will this list contain.
 *
 * @param capacity Initial list capacity.
 * @constructor
 */
function BlinkedList(capacity) {
    this._capacity = capacity ? this._calcCapacity(capacity) : 16;
    this._length = 0;
    this._front = 0;
    this._current = undefined;
}

/**
 * Returns list contents as array preserving order.
 *
 * @returns {Array} List contents.
 */
BlinkedList.prototype.toArray = function() {
    var length = this._length;
    var array = new Array(length);
    var front = this._front;
    for (var i = 0; i < length; ++i) {
        array[i] = this[(front + i) & (this._capacity - 1)];
    }

    return array;
};

/**
 * Adds given item at the end of the list.
 *
 * @param item Item to add at the end.
 * @returns {number} New list length.
 */
BlinkedList.prototype.push = function(item) {
    var length = this.length;
    this._increaseCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = item;
    length++;
    this._length = length;

    return length;
};

/**
 * Removes and returns last element of the list.
 *
 * @returns {*} Last element of the list.
 */
BlinkedList.prototype.pop = function() {
    var length = this._length;
    if (length === 0) {
        return undefined;
    }
    length--;
    var i = (this._front + length) & (this._capacity - 1);
    var item = this[i];
    this[i] = undefined;
    this._length = length;

    return item;
};

/**
 * Removes and returns first element of the list.
 *
 * @returns {*} First element of the list.
 */
BlinkedList.prototype.shift = function() {
    var length = this._length;
    if (length === 0) {
        return undefined;
    }
    var front = this._front;
    var item = this[front];
    this[front] = undefined;
    length--;
    this._front = (front + 1) & (this._capacity - 1);
    this._length = length;

    return item;
};

/**
 * Adds given element at the beggining of the list.
 *
 * @param item Item to add at the beggining.
 * @returns {number} New list length.
 */
BlinkedList.prototype.unshift = function(item) {
    var length = this._length;

    if (item === undefined) {
        return length;
    }
    length++;
    this._increaseCapacity(length);
    var capacity = this._capacity;
    var index = (this._front - 1) & (capacity - 1);
    this[index] = item;
    this._length = length;
    this._front = index;

    return length;
};

/**
 * Returns but doesn't remove first element of the list.
 *
 * @returns {*} First element of the list.
 */
BlinkedList.prototype.peek = function() {
    if (this._length === 0) {
        return undefined;
    }

    return this[this._front];
};

/**
 * Returns but doesn't remove last element of the list.
 *
 * @returns {*} Last element of the list.
 */
BlinkedList.prototype.peekLast = function() {
    if (this._length === 0) {
        return undefined;
    }

    return this[this._front + this._length - 1];
};

/**
 * Tells if list is empty.
 *
 * @returns {boolean} True if list is empty, False otherwise.
 */
BlinkedList.prototype.isEmpty = function() {
    return this._length === 0;
};

/**
 * Clears the content of the list.
 */
BlinkedList.prototype.clear = function() {
    var length = this._length;
    var front = this._front;
    var capacity = this._capacity;
    for (var i = 0; i < length; ++i) {
        this[(front + i) & (capacity - 1)] = undefined;
    }
    this._length = 0;
    this._front = 0;
};

/**
 * Returns n-th element from the beginning of the list.
 * You can pass negative index to make this method count from the end of the list.
 *
 * @param index Index of the element.
 * @returns {*} N-th element of the array or undefined if index is invalid.
 */
BlinkedList.prototype.get = function(index) {
    /**
     * If index is not an integer.
     */
    if ((index !== (index | 0))) {
        return undefined;
    }

    var length = this._length;
    /**
     * If index is negative, return n-th element counting from end.
     */
    if (index < 0) {
        index = index + length;
    }
    /**
     * Index out of bounds.
     */
    if (index < 0 || index >= length) {
        return undefined;
    }

    return this[(this._front + index) & (this._capacity - 1)];
};

/**
 * Sets n-th element from the beginning of the list.
 *
 * @param index Index of the element.
 * @param item Item to set inside list.
 * @returns {*} N-th element of the array or undefined if index is invalid.
 */
BlinkedList.prototype.set = function(index, item) {
    /**
     * If index is not an integer.
     */
    if ((index !== (index | 0))) {
        return undefined;
    }

    var length = this._length;

    /**
     * Index out of bounds.
     */
    if (index < 0 || index >= length) {
        return undefined;
    }

    return this[(this._front + index) & (this._capacity - 1)] = item;
};


/**
 * Removes first occurrence of given item from the list.
 *
 * @param item Item to set inside list.
 * @returns {*} N-th element of the array or undefined if index is invalid.
 */
BlinkedList.prototype.remove = function(item) {
    var front = this._front;
    var length = front + this._length;

    for(var index = front;  index < length; index++) {
        if(this[index & (this._capacity - 1)] === item) {
            this._moveContents(this, (index & (this._capacity - 1)) + 1, this, index & (this._capacity - 1), length - index - 1);
            this._length--;

            return true;
        }

    }

    return false;
};

/**
 * Removes n-th element from the beginning of the list.
 *
 * @param index Index of the element.
 * @returns {*} N-th element of the array or undefined if index is invalid.
 */
BlinkedList.prototype.removeIndex = function(index) {
    /**
     * If index is not an integer.
     */
    if ((index !== (index | 0))) {
        return undefined;
    }

    var length = this._length;

    /**
     * Index out of bounds.
     */
    if (index < 0 || index >= length) {
        return undefined;
    }

    var item = this[(this._front + index) & (this._capacity - 1)];
    this._moveContents(this, index + 1, this, index, length - index - 1);
    this._length--;

    return item;
};

/**
 * Returns current element from list's iterator.
 *
 * @returns {*} Current element.
 */
BlinkedList.prototype.current = function() {
    return this.get(this._current);
};

/**
 * Resets list's iterator position to the beginning of the list.
 */
BlinkedList.prototype.reset = function() {
    this._current = undefined;
};

/**
 * Pushes list's iterator position to the next element of the list and returns it.
 *
 * @returns {*} Next element of the list.
 */
BlinkedList.prototype.next = function() {
    if(this._current === undefined) {
        return this._current = 0;
    }

    return this.get(++this._current);
};

/**
 * Increases capacity of the list.
 *
 * @param size Minimum capacity to increase to.
 * @private
 */
BlinkedList.prototype._increaseCapacity = function(size) {
    if (this._capacity < size) {
        this._resizeTo(this._calcCapacity(size));
    }
};

/**
 * Resizes list to cope with higher capacity.
 *
 * @param capacity New list capacity.
 * @private
 */
BlinkedList.prototype._resizeTo = function(capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    if (front + length > oldCapacity) {
        var moveItemsCount = (front + length) % oldCapacity;
        this._moveContents(this, 0, this, oldCapacity, moveItemsCount);
    }
};

/**
 * Calculates new capacity based on given minimum.
 * BlinkedList uses powers of 2 when increasing capacity. This approach allows to use faster
 * bitwise methods during calculations.
 *
 * @param minimum Minimum new capacity.
 * @returns {number} New capacity as a power of 2 greater then given minimum.
 * @private
 */
BlinkedList.prototype._calcCapacity = function(minimum) {
    var capacity = 16;
    while(capacity < minimum) {
        capacity = capacity << 1;
    }

    return capacity;
};

/**
 * Moves given number of elements from one array to another.
 *
 * @param src Source array.
 * @param srcIndex Index inside source array from which the copying should start.
 * @param dst Destination array.
 * @param dstIndex Index inside destination array from which the copying should start.
 * @param length Number of elements to copy.
 * @private
 */
BlinkedList.prototype._moveContents = function(src, srcIndex, dst, dstIndex, length) {
    for (var j = 0; j < length; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = undefined;
    }
};

/**
 * Defines getter lenght property to mimic behaviour of generic array.
 */
BlinkedList.prototype.__defineGetter__('length', function () {
    return this._length;
});

module.exports = BlinkedList;