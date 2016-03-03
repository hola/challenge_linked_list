function Node(data) {
    this.data = data;
    this.prev = this;
    this.next = this;
}


function List() {}
List.prototype.init = function(data) {
    return new Node(data);
};

List.prototype.peek = function(item) {
    var previousItem = item.prev;
    return previousItem == item ? null : previousItem;
};

List.prototype.shift = function(item) {
    var first = item.prev;
    this.remove(first);
    return first;
};

List.prototype.remove = function(item) {
    var nextItem = item.next,
        previousItem = item.prev;
    if(nextItem && previousItem) {
        previousItem.next = nextItem;
        nextItem.prev = previousItem;

        item.prev = null;
        item.next = null;
    }
};

List.prototype.append = function(before, item) {
    this.remove(item);
    var nextItem = before.next;
    item.next = nextItem;
    item.prev = before;
    before.next = item;
    nextItem.prev = item;
};
List.prototype.isEmpty = function(item) {
    return item.prev === item;
};

List.Node = Node;
module.exports = List;
