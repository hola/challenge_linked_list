if(typeof Symbol === 'undefined') {
    var id = 0;
    var Symbol = function(name) {
        id++;
        return '$$symbol$$'+id+name;
    }
}

function List() {
    this.prev = Symbol('prev');
    this.next = Symbol('next');
}
List.prototype.init = function(item) {
    item[this.prev] = item[this.next] = item;
};

List.prototype.peek = function(item) {
    var previousItem = item[this.prev];
    return previousItem == item ? null : previousItem;
};

List.prototype.shift = function(item) {
    var first = item[this.prev];
    this.remove(first);
    return first;
};

List.prototype.remove = function(item) {
    var nextItem = item[this.next],
        previousItem = item[this.prev];
    if(nextItem && previousItem) {
        previousItem[this.next] = nextItem;
        nextItem[this.prev] = previousItem;

        item[this.prev] = null;
        item[this.next] = null;
    }
};

List.prototype.append = function(before, item) {
    this.remove(item);
    var nextItem = before[this.next];
    item[this.next] = nextItem;
    item[this.prev] = before;
    before[this.next] = item;
    nextItem[this.prev] = item;
};
List.prototype.isEmpty = function(item) {
    return item[this.prev] === item;
};

module.exports = List;
