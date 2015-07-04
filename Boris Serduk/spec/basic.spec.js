function NodejsList() {
    var list = require('../src/nodejs-linklist');
    list.prev = '_idlePrev';
    list.next = '_idleNext';
    return list;
}

function Item(id) {
    this.id = id;
}

[{
    name: 'nodejs-linklist',
    List: NodejsList
}, {
    name: 'symbol-based',
    List: require('../src/symbol-based')
}, {
    name: 'prebuilt-getters',
    List: require('../src/prebuilt-getters')
}].forEach(createTestPack);


function createTestPack(data) {
    describe(data.name, function() {
        describe("single item", function() {
            it("should remove", function() {
                var list = new data.List(),
                    first = new Item(1);

                list.init(first);
                list.remove(first);

                expect(first[list.next]).toBeNull();
                expect(first[list.prev]).toBeNull();
            });
        });

        describe("two items", function() {
            var list, first, second;
            beforeEach(function() {
                list = new data.List();
                first = new Item(1);
                second = new Item(2);

                list.init(first);
                list.append(first, second);
            });

            it("should link second appended item", function() {
                expect(first[list.next]).toEqual(second);
                expect(second[list.next]).toEqual(first);

                expect(first[list.prev]).toEqual(second);
                expect(second[list.prev]).toEqual(first);
            });

            it("should can append item in the middle", function() {
                var middle = new Item(3);
                list.append(first, middle);

                expect(first[list.next]).toEqual(middle);
                expect(second[list.prev]).toEqual(middle);
            });


            it("should remove second item", function() {
                list.remove(second);

                expect(first[list.next]).toEqual(first);
                expect(first[list.prev]).toEqual(first);
            });
        });

        describe("many items", function() {
            var list, first;

            beforeEach(function() {
                list = new data.List();
                first = new Item(1);

                list.init(first);
                list.append(first, new Item(2));
                list.append(first, new Item(3));
                list.append(first, new Item(4));
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

        if(data.name !== 'nodejs-linklist') {
            describe("two lists", function() {
                var listA = new data.List(),
                    listB = new data.List();

                it("should allow to keep one item in several lists", function() {
                    var first = new Item(1),
                        second = new Item(2);

                    listA.init(first);
                    listA.append(first, second);

                    listB.init(first);
                    listA.remove(first);

                    expect(first[listB.prev]).toEqual(first);
                    expect(first[listB.next]).toEqual(first);
                    expect(second[listA.prev]).toEqual(second);
                    expect(second[listA.next]).toEqual(second);
                });
            });
        }
    });
}
