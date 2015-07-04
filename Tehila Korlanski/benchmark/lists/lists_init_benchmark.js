var common = require('../common.js');

var bench = common.createBenchmark(main, {
  module: ['_generic_linklist', '_linklist']
});

function main(conf) {

  var module = require(conf.module);
  var list = {name: 'list'};

  bench.start();
  
  module.init(list);
  
  bench.end(1);
}
