'use strict';

var Benchmark = require('benchmark');


module.exports = function (implementations, done) {

  var context = {
    L: null,
    ic: 1e3
  };
  
  var tests = {
    "L.isEmpty": {
      setup: function () {
        var L = this.options.ctx.L;
        
        var list = { name: 'list' };
        L.init(list);
      },
      fn: function () {
        L.isEmpty(list);
      }
    },
    "L.peek": {
      setup: function () {
        var L = this.options.ctx.L;
        
        var list = { name: 'list' };
        L.init(list);
      },
      fn: function () {
        L.peek(list);
      }
    },
    "L.append": {
      setup: function () {
        var L = this.options.ctx.L;
        var ic = this.options.ctx.ic;
        
        var list = { name: 'list' };
        L.init(list);
      },
      fn: function () {
        var i;
        var A;
        for (i = 0; i < ic; ++i) {
          A = { name: Math.random() };
          L.init(A);
          L.append(list, A);
        }
      }
    },
    "L.append (with duplicate)": {
      setup: function () {
        var L = this.options.ctx.L;
        var ic = this.options.ctx.ic;
        
        list2 = { name: 'list2' };
        list2A = null;
        L.init(list2);
      
        var i;
        var A;
        for (i = 0; i < ic; ++i) {
          A = { name: 'list2_' + i };
          L.init(A);
          L.append(list2, A);
          if (!list2A && i >= (ic / 2)) {
            list2A = A;
          }
        }
      },
      fn: function () {
        L.append(list2, list2A);
      }
    },
    "L.shift": {
      setup: function () {
        var L = this.options.ctx.L;
        var ic = this.options.ctx.ic;
        
        list2 = { name: 'list2' };
        list2A = null;
        L.init(list2);
      
        var i;
        var A;
        for (i = 0; i < ic; ++i) {
          A = { name: 'list2_' + i };
          L.init(A);
          L.append(list2, A);
        }
      },
      fn: function () {
        while (L.peek(list2)) {
          L.shift(list2);
        }
      }
    },
    "L.remove": {
      setup: function () {
        var L = this.options.ctx.L;
        var ic = this.options.ctx.ic;
        
        list2 = { name: 'list2' };
        list2A = null;
        L.init(list2);
      
        var i;
        var A;
        for (i = 0; i < ic; ++i) {
          A = { name: 'list2_' + i };
          L.init(A);
          L.append(list2, A);
          if (!list2A && i >= (ic / 2)) {
            list2A = A;
          }
        }
      },
      fn: function () {
        L.remove(list2A);
      }
    }
  };

  var suites = {};
  var suitesCount = 0;
  
  var lengthMapper = function (str) {
    return str.length;
  };
  var maxReducer = function (prev, curr) {
    return (curr > prev ? curr : prev);
  };
  var whitespacePaddingMapper = function (length) {
    return function (str) {
      while (str.length < length) { str += ' '; }
      return str;
    };
  };
  
  var testsKeys = Object.keys(tests);
  var testsKeysLength = testsKeys.map(lengthMapper).reduce(maxReducer, 0);
  var testsDisplayNames = testsKeys.map(whitespacePaddingMapper(testsKeysLength));
  
  var implementationsKeys = Object.keys(implementations);
  var implementationsKeysLength = implementationsKeys.map(lengthMapper).reduce(maxReducer, 0);
  var implementationsDisplayNames = implementationsKeys.map(whitespacePaddingMapper(implementationsKeysLength));
  
  var results = {};
  
  console.log(testsKeys.join('\n') + '\n\n...\n');
  
  testsKeys.forEach(function (testKey, testIndex) {
    ++suitesCount;
    var suite = suites[testKey] = new Benchmark.Suite({
      name: testKey,
      onStart: function (event) {
        //console.log(testsDisplayNames[testIndex] + ' > started.');
      },
      onCycle: function (event) {
        if (event.target.error) {
          console.log(testsDisplayNames[testIndex] + ' > error: ' + (event.target.error && event.target.error.stack));
        }
        else {
          //console.log(testsDisplayNames[testIndex] + ' > cycle: ' + String(event.target));
        }
      },
      onComplete: function (event) {
        if (event.target.error) {
          results[testKey] = (testsDisplayNames[testIndex] + ' > error:\n' + (event.target.error && event.target.error.stack));
        }
        else {
          var fastest;
          var fastestTime;
          results[testKey] = (
            '\n' +
            testsDisplayNames[testIndex] + ' > finished:\n' + this.pluck('times').map(function (times, index) {
              if (typeof fastestTime === 'undefined' || times.cycle < fastestTime) {
                fastestTime = times.cycle;
                fastest = implementationsKeys[index];
              }
              return [ times.period, (implementationsDisplayNames[index] + ' ' + (times.period * 1000).toFixed(10) + 'ms') ];
            }).sort(function (left, right) {
              return (left[0] - right[0]);
            }).map(function (v, index, arr) {
              if (index > 0) { v[0] = v[0] / arr[0][0]; }
              return v;
            }).map(function (v, index) {
              return (
                whitespacePaddingMapper(testsKeysLength)('') +
                (' #' + (index + 1) + ': ' + v[1] + (index > 0 ? ' ( x' + (v[0]).toFixed(10) + ' )' : ''))
              );
            }).join('\n') + '\n'
          );
        }
        
        --suitesCount;
        if (suitesCount === 0) {
          testsKeys.forEach(function (testKey) {
            console.log(results[testKey]);
          });
          done();
        }
      }
    });
    
    implementationsKeys.forEach(function (key) {
      var ctx = require('util')._extend({}, context);
      ctx.L = implementations[key];
      
      var test = tests[testKey];
      
      suite.add({
        name: key + ' ' + testKey,
        ctx: ctx,
        setup: test.setup,
        fn: test.fn,
        teardown: test.teardown
      });
    });
    
    suite.run({
      async: true
    });
  });
};
