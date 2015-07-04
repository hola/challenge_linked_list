var common = require('../common.js');

var bench = common.createBenchmark(main, {
  module: ['_generic_linklist', '_linklist']
});

function main(conf) {

  var module = require(conf.module);
  var list = {name: 'list'};
  var item1 = {name: 'A'}
  var item2 = {name: 'B'}
  var item3 = {name: 'C'}

  
  module.init(list);
  module.append(list, item1);
  module.append(list, item2);
  module.append(list, item3);

  bench.start();
  
  module.remove(item3, list);

  bench.end(1);
}
