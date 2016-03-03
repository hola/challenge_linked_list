/*
Author: kobi( kobi@napuzba.com )

This is generic implementation of linked list.
It try to follow _linklist module semantics but not its api :-).
*/

'use strict';

// Item in the list
function Item(value) {
    this.value = value ;
    this.prev  = null  ;
    this.next  = null  ;

    this.remove = function() {
        if ( this.prev != null ) {
            this.prev.next = this.next;
        }
        if ( this.next != null ) {
            this.next.prev = this.prev;
        }
        this.next = this.prev = null;
        return this;
    }

    this.addBefore = function(root) {
        this.prev = root.prev;
        this.next = root;
        root.prev.next = this;
        root.prev = this;
        return this;
    }
}

// The link list
function List() {
    this.root = new Item(null);
    this.root.prev = this.root;
    this.root.next = this.root;

    // Whether the list is empty
    this.isEmpty = function() {
        return this.root.next == this.root;
    }

    // return the first value in the list, or null if the list is empty.
    this.peek = function() {
        return this.root.next.value;
    }

    // append value to the list. return an handle to the value.
    //   The handle can be used to:
    //     - using remove()  - fast removal of the item from its current list
    //     - using moveEnd() - move the value from its current list and append it to the current list
    this.append = function(value) {
        return (new Item(value)).addBefore(this.root);
    }

    // Remove the first value from the list and return it. if empty - return null
    this.shift = function() {
        var item = this.root.next;
        if ( item == this.root ) {
            return null;
        }
        return item.remove().value;
    }

    this.remove = function(item) {
        item.remove().value;
    }

    // Remove the item from its list and append it the current list
    this.moveEnd = function(item) {
        item.remove().addBefore(this.root);
    }

    // return string representation of the list
    this.dump = function() {
        var ss = '';
        var item = this.root.next;
        while ( item != this.root ) {
            if (ss != '') {
                ss += ' -> ';
            }
            ss += item.value;
            item = item.next;
        }
        return ss;
    }
}

exports.List = List;