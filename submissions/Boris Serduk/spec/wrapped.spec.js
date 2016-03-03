var List = require('../src/wrapped-items');

function Item(id) {
    this.id = id;
}

describe('wrapped items list', function() {
    describe("single item", function() {
        it("create wrapped list item", function() {
            var list = new List(),
                first = list.init(new Item(1));

            expect(first.data).toEqual(new Item(1));
            expect(first.prev).toEqual(first);
            expect(first.next).toEqual(first);
        });

        it("should remove", function() {
            var list = new List(),
                first = list.init(new Item(1));

            list.remove(first);

            expect(first.next).toBeNull();
            expect(first.prev).toBeNull();
        });
    });

    describe("two items", function() {
        var list, first, second;
        beforeEach(function() {
            list = new List();
            first = list.init(new Item(1));
            second = list.init(new Item(2));

            list.append(first, second);
        });

        it("should link second appended item", function() {
            expect(first.next).toEqual(second);
            expect(second.prev).toEqual(first);

            expect(first.prev).toEqual(second);
            expect(second.prev).toEqual(first);
        });

        it("should can append item in the middle", function() {
            var middle = new Item(3);
            list.append(first, middle);

            expect(first.next).toEqual(middle);
            expect(second.prev).toEqual(middle);
        });


        it("should remove second item", function() {
            list.remove(second);

            expect(first.next).toEqual(first);
            expect(first.prev).toEqual(first);
        });
    });

    describe("many items", function() {
        var list, first;

        beforeEach(function() {
            list = new List();
            first = list.init(new Item(1));

            list.append(first, list.init(new Item(2)));
            list.append(first, list.init(new Item(3)));
            list.append(first, list.init(new Item(4)));
        });

        it("should shift all items from the list", function() {
            var i = 0;
            while(!list.isEmpty(first) && list.shift(first)) {
                i++;
            }
            expect(i).toBe(3);
        });

        it("should can iterate over items via peek", function() {
            var item = first,
                i = 1;
            while((item = list.peek(item)) !== first) {
                i++;
            }
            expect(i).toBe(4);
        });
    });

    describe("two lists", function() {
        var listA = new List(),
            listB = new List();

        it("should allow to keep one item in several lists", function() {
            var first = new Item(1),
                second = new Item(2);

            var firstA = listA.init(first),
                secondA = listA.init(second);
            listA.append(firstA, secondA);

            var firstB = listB.init(first);
            listA.remove(firstA);

            expect(firstA.data).toEqual(firstB.data);
            expect(firstB.prev).toEqual(firstB);
            expect(firstB.next).toEqual(firstB);
            expect(secondA.prev).toEqual(secondA);
            expect(secondA.next).toEqual(secondA);
        });
    });
});
