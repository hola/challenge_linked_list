"use strict";

// @author Efremov Alexey lexich121@gmail.com

var libOrig = require("./lib/_linklist"),
    libNew = require("./");

var Benchmark = require("benchmark");

var lstOrig = {},
    lstNew = {};

libOrig.init(lstOrig);
libNew.init(lstNew);

function genItems() {
  var _items = [];
  for (var i = 0; i < 10; i++) {
    _items[_items.length] = {};
  }
  return _items;
}

new Benchmark.Suite()
  .add("original", function() {
    var items = genItems();
    var i;
    for (i = 0; i < items.length; i++) {
      libOrig.append(lstOrig, items[i]);
    }
    for (i = 0; i < items.length; i++) {
      libOrig.remove(items[i]);
    }
  })
  .add("optimization", function() {
    var items = genItems();
    var i;
    for (i = 0; i < items.length; i++) {
      libNew.append(lstNew, items[i]);
    }
    for (i = 0; i < items.length; i++) {
      libNew.remove(items[i]);
    }
  })
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    var slowest = this.filter("slowest");
    var fastest = this.filter("fastest");
    console.log("Fastest is " + this.filter("fastest").pluck("name") + " in " + fastest[0].hz / slowest[0].hz);
  })
  .run({ "async": true });
