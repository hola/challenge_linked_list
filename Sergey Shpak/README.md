The challenge: generalize NodeJS/'s linklist
====================

Description and challenge details, http://hola.org/challenge_js?l


Challenge Solutions
====================

There are two possible solutions in this package, the descriptions of each one are placed below.
Solutions have been created according to challenge rules and with max possible simplicity.
(so there were no need to comment each line of code, everything is clear and simple for understanding)

_linklistgeneric-1.js

The main idea of this solution is creation (and partial caching) of unique 'List' Constructors per each list instance.
Each unique list instance constructor is created from 'template' constructor(string), with 'key' replacement. 
This approach allows avoiding inefficient property access, like 'item["listKey"]'. 
Each list constructor which was created with name(passed to method) is cached. Solution achieves challenge goals(generic approach), 
optimizes property access performance, optimizes performance with OOP in general.

_linklistgeneric-2.js

The main idea of this solution is creation internal 'Item'(ItemGeneric) instances, which are linked between themselves and list instance.
Each item passed to list 'append' method is added to internal 'Item' instance(ItemGeneric) as data property. 
This solution meets challenge rules(generic approach) and has a great performance results.
* Please notice, solution 'append' method returns internal list item instance(ItemGeneric), not an object that has been 
passed to the method.


Challenge Tests
====================

All tests implemented and commented in challenge.js

# Performance Test
Test creates benchmark suite and compares performance results of each solution.
If we use only 'append' method in performance test, it will increase amount of list items (due to references between them) in memory, 
and as result can come to 'process out of memory'. So for proper performance tests we should use 'append' and then 'remove' items 
(to remove the references between items and to allow Garbage Collector to free memory)

# Memory Test
Test creates closure and emulates memory leak, which allows creating 'proper' memory snapshot (before all used memory is free by 
Garbage Collector). Test creates 10,000 items of each list solution. Test creates memory snapshot (./snapshots/snapshot.heapsnapshot) 
which can be profiled in Google Chrome / Dev Tools / Profiles (Load Heap Snapshot). 
Due to unique item constructors ('OriginalItemConstructor','GenericItemConstructor1','ItemGeneric')
it is easy enough to find memory amount which is used by items instances of each list (objects are grouped by Constructors name 
when profiling heap snapshot).

* due to solution2 implementation, instead of 'GenericItemConstructor2' use 'ItemGeneric' constructor name when profiling.
(more details in challenge.js comments)
* make sure process has rights to write to './snapshots/'.
* more information about Memory Profiling in Google Chrome, https://developer.chrome.com/devtools/docs/javascript-memory-profiling

# Challenge Tests Dependencies
Benchmark and Heapdump modules are used for performance and memory tests.
- https://www.npmjs.com/package/benchmark
- https://www.npmjs.com/package/heapdump


Challenge Results
====================

My local environment shows next results, 

Performance test: 
Solution #1 faster than original in 1.04 times ( 9,214,213 ops/sec)
Solution #2 faster than original in 1.92 times (16,969,782 ops/sec)

Memory test: 
OriginalItemConstructor items (10 000) Shallow: 400 000 Retained: 400 000 (Original)
GenericItemConstructor1 items (10 000) Shallow: 320 000 Retained: 320 000 (Solution #1)
ItemGeneric             items (10 000) Shallow: 560 000 Retained: 560 000 (Solution #2)
* ItemGeneric, instead of GenericItemConstructor2


All tested were passed with Node.js v0.10.25, npm v1.3.10, Benchmark v1.0.0, Heapdump v0.3.6,


Challenge Usage
====================

To install package dependencies, run:
'npm install'

To run performance and memory test, run:
'node challenge.js'

* All result will be outputted to console.


Challenge Package
====================
- README.md
- package.json
- challenge.js
- lib/_linklistgeneric-1.js
- lib/_linklistgeneric-2.js
- lib/_linklistoriginal.js
- snapshots/snapshot.heapsnapshot