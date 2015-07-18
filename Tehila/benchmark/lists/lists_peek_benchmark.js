var common = require('../common.js');

var bench = common.createBenchmark(main, {
  module: ['_generic_linklist', '_linklist']
});

function main(conf) {

  var module = require(conf.module);
  var list = {name: 'list'};
  var item1 = {name: 'A'}

  
  module.init(list);
  module.append(list, item1);
 
  bench.start();
  
  module.peek(list);

  bench.end(1);
}
