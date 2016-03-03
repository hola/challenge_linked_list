"use strict";
/*global expect, describe, it, console, xit */

// @author Efremov Alexey lexich121@gmail.com

var expect = require("chai").expect;
var isLibMode = !process.env.ORIGINAL;
var lib = isLibMode ? require("./") : require("./lib/_linklist");

console.log("  " + (isLibMode ? "lib mode" : "original mode"));

describe("Unit test lib", function() {
  it("check init", function() {
    var obj = {};
    expect(lib.init(obj)).to.not.exist;
    expect(obj._idleNext === obj).to.be.true;
    expect(obj._idlePrev === obj).to.be.true;
  });

  it("check append", function() {
    var lst = {id: 0};
    lib.init(lst);

    expect(lst._idlePrev === lst, "lst empty has prev lst").to.be.true;
    expect(lst._idleNext === lst, "lst empty has next lst").to.be.true;
    var item = {id: 1};
    lib.append(lst, item);
    var item2 = {id: 2};
    lib.append(item, item2);

    expect(lst._idleNext === item, "lst has next item").to.be.true;
    expect(lst._idlePrev === item2, "lst has prev item2").to.be.true;
    expect(item._idleNext === item2, "item has prev item2").to.be.true;
    expect(item._idlePrev === lst, "item has next lst").to.be.true;
    expect(item2._idleNext === lst, "item2 has prev lst").to.be.true;
    expect(item2._idlePrev === item, "item2 has next item").to.be.true;
  });

  it("check isEmpty", function() {
    var obj = {};
    lib.init(obj);
    expect(lib.isEmpty(obj), "1").to.be.true;
    lib.append(obj, {});
    expect(lib.isEmpty(obj), "2").to.be.false;
  });

  it("check remove", function() {
    var lst = {id: 0};
    lib.init(lst);
    var item = {id: 1};
    lib.append(lst, item);
    expect(lib.isEmpty(lst)).to.be.false;
    expect(item._idleNext).to.exist;
    expect(item._idlePrev).to.exist;
    expect(lib.remove(item)).to.be.undefined;
    expect(lib.isEmpty(lst)).to.be.true;
    expect(item._idleNext).to.not.exist;
    expect(item._idlePrev).to.not.exist;
  });

  it("check peek", function() {
    var lst = {id: 0};
    expect(lib.peek(lst)).to.be.undefined;
    lib.init(lst);
    expect(lib.peek(lst)).to.be.null;
    var item = {id: 1};
    lib.append(lst, item);
    expect(lib.peek(lst) === item).to.be.true;
    var item2 = {id: 2};
    lib.append(item, item2);
    expect(lib.peek(lst) === item2).to.be.true;
  });

  it("check shift", function() {
    var lst = {id: 0};
    lib.init(lst);
    expect(lst._idleNext === lst).to.be.true;
    expect(lst._idlePrev === lst).to.be.true;
    lib.shift(lst);
    expect(lst._idleNext).to.be.null;
    expect(lst._idlePrev).to.be.null;

    lib.init(lst);

    var item = {id: 1};
    lib.append(lst, item);
    expect(lst._idleNext === item).to.be.true;
    expect(lst._idlePrev === item).to.be.true;
    expect(lib.shift(item) === lst).to.be.true;
    expect(item._idleNext === item).to.be.true;
    expect(item._idlePrev === item).to.be.true;
    expect(lst._idleNext).to.be.null;
    expect(lst._idlePrev).to.be.null;
  });

  isLibMode && it("check tree append", function() {
    var item0 = {id: 0};
    lib.init(item0);
    var item1 = {id: 1};
    lib.append(item0, item1);
    var item2 = {id: 2};
    lib.append(item1, item2);

    var item3 = {id: 3};
    lib.init(item3);
    var item4 = {id: 4};
    lib.append(item3, item4);

    // before tree modify
    expect(item0._idleNext === item1).to.be.true;
    expect(item0._idlePrev === item2).to.be.true;

    // tree append
    lib.append(item0, item3);
    expect(item3._idleCursor).to.eql([1]);
    expect(item3._idleNext === item4).to.be.true;
    expect(item3._idlePrev === item4).to.be.true;
    expect(item3._idleNext1 === item0).to.be.true;
    expect(item3._idlePrev1 === item0).to.be.true;

    expect(item0._idleNext === item1).to.be.true;
    expect(item0._idlePrev === item2).to.be.true;
    expect(item0._idleCursor).to.eql([1]);
    expect(item0._idleNext1 === item3).to.be.true;
    expect(item0._idlePrev1 === item3).to.be.true;

    // before tree modify
    expect(item2._idleNext === item0).to.be.true;
    expect(item2._idlePrev === item1).to.be.true;

    // tree append 2
    lib.append(item2, item3);
    expect(item2._idleCursor).to.eql([2]);
    expect(item2._idleNext === item0).to.be.true;
    expect(item2._idlePrev === item1).to.be.true;
    expect(item2._idleNext2 ===  item3).to.be.true;
    expect(item2._idlePrev2 ===  item3).to.be.true;

    expect(item3._idleCursor).to.eql([1, 2]);

    // other links not changes
    expect(item3._idleNext === item4).to.be.true;
    expect(item3._idlePrev === item4).to.be.true;
    expect(item3._idleNext1 === item0).to.be.true;
    expect(item3._idlePrev1 === item0).to.be.true;

    // new links
    expect(item3._idleNext2 === item2).to.be.true;
    expect(item3._idlePrev2 === item2).to.be.true;

    lib.remove(item3);

    // null all links after remove item
    expect(item3._idleCursor).to.be.null;
    expect(item3._idlePrev).to.be.null;
    expect(item3._idleNext).to.be.null;
    expect(item3._idlePrev1).to.be.null;
    expect(item3._idleNext1).to.be.null;
    expect(item3._idlePrev2).to.be.null;
    expect(item3._idleNext2).to.be.null;

    expect(item4._idlePrev === item4).to.be.true;
    expect(item4._idleNext === item4).to.be.true;

    expect(item0._idlePrev1 === item0).to.be.true;
    expect(item0._idleNext1 === item0).to.be.true;

    expect(item2._idleNext2 === item2).to.be.true;
    expect(item2._idlePrev2 === item2).to.be.true;

    // check state after remove
    expect(item0._idleNext === item1).to.be.true;
    expect(item0._idlePrev === item2).to.be.true;

    expect(item1._idleNext === item2).to.be.true;
    expect(item1._idlePrev === item0).to.be.true;

    expect(item2._idleNext === item0).to.be.true;
    expect(item2._idlePrev === item1).to.be.true;

    expect(item4._idlePrev === item4).to.be.true;
    expect(item4._idleNext === item4).to.be.true;

    var item6 = {id: 6};
    lib.append(item2, item6);
    expect(item6._idleNext === item0).to.be.true;
    expect(item6._idlePrev === item2).to.be.true;
    expect(item6._idleNext2 === item2).to.be.true;
    expect(item6._idlePrev2 === item2).to.be.true;
  });
});
