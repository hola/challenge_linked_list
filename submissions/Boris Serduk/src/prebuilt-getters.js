var counter = 0;
function List() {
    counter++;
    this.prev = '$prev' + counter;
    this.next = '$next' + counter;
    this.getPrev = new Function("item", "return item." + this.prev);
    this.setPrev = new Function("item", "value", "item." + this.prev + "=value;");
    this.getNext = new Function("item", "return item." + this.next);
    this.setNext = new Function("item", "value", "item." + this.next + "=value;");
}
List.prototype.init = function(item) {
    this.setPrev(item, item);
    this.setNext(item, item);
};

List.prototype.peek = function(item) {
    var previousItem = this.getPrev(item);
    return previousItem == item ? null : previousItem;
};

List.prototype.shift = function(item) {
    var first = this.getPrev(item);
    this.remove(first);
    return first;
};

List.prototype.remove = function(item) {
    var nextItem = this.getNext(item),
        previousItem = this.getPrev(item);
    if(nextItem && previousItem) {
        this.setNext(previousItem, nextItem);
        this.setPrev(nextItem, previousItem);

        this.setPrev(item, null);
        this.setNext(item, null);
    }
};

List.prototype.append = function(before, item) {
    this.remove(item);
    var nextItem = this.getNext(before);
    this.setNext(item, nextItem);
    this.setPrev(item, before);
    this.setNext(before, item);
    this.setPrev(nextItem, item);
};
List.prototype.isEmpty = function(item) {
    return this.getPrev(item) === item;
};

module.exports = List;
