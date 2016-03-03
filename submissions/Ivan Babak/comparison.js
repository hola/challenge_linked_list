'use strict';

var implementations = {
  "original": require('./lib/_linklist'),
  "sompylasar's": require('./lib/linklist')
};

Object.keys(implementations).forEach(function (key) {
  console.log(key + ' > running original tests...');
  
  require('./test/test')(implementations[key]);
  
  console.log(key + ' > original tests passed.');
  
  if (key !== "original") {
    console.log(key + ' > running extended tests...');
    
    require('./test/test-extended')(implementations[key]);
    
    console.log(key + ' > extended tests passed.');
  }
  
  console.log('');
});


console.log('benchmarking...\n');
require('./test/bench')(implementations, function () {
  console.log('benchmark done.');
});
