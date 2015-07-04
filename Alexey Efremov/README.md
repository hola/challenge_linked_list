###Author
Efremov Alexey lexich121@gmail.com

### Structure of project
- index.js - result, multible tree list
- test.js - unit-tests for index.js (lib/_linklist.js original linked list)
- benchmark.js - benchmark for `index.js` and `lib/_linklist.js`

### Commands
- `npm test` - run linters and unit-tests for `index.js` and `lib/_linklist.js`
- `npm run benchmark` - run benchmark

### Explanation realization of treelist
For adding item to list it needs to use method `append`. If item not initialized (item hasn't got `__idleNext`, `__idlePrev` properties) or ```js  item === item.__idlePrev === item.__idleNext ``` - method `append` works as original method. In this case speeding up of `append` method reachs by not using `remove` before setting links. In other case when `item !== item.__idlePrev !== item.__idleNext` - list and item connects by new links (`__idlePrev{id}`, `__idleNext{id}`) (where `{id}` unique identificator for chain). All links ids (except defaults `__idleNext`, `__idlePrev`) save in `__idleCursor` array in each node of chain.  
Method `remove` break all links from node as expected. `init`, `peek`, `shift` weren't modified. In `isEmpty` method adds checking "new links" if it's nessesasy.

### Results
```sh
original x 613,470 ops/sec ±0.79% (99 runs sampled)
optimization x 671,917 ops/sec ±1.30% (93 runs sampled)
Fastest is optimization in 1.0952723535368623
```

Benchmark checks combimation `apppend` and `remove` methods.
