# Javascript circle-linked-list implementations

This is a repository with solution for [Hola’s Spring JS Competition](http://hola.org/challenge_js). Here is several
implementations of linked lists:

* [nodejs-linklist](src/nodejs-linklist.js) – this is implementation from [node.js sources](https://github.com/joyent/node/blob/master/lib/_linklist.js)
 for internal usage. Brought here as a reference implementation. 
* [symbol-based](src/symbol-based.js) – uses [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
to store links to previous and next items in the list. Not so fast, but interesting solution. Also, it includes 
fallback for `node.js 0.10` which doesn't have symbols support.
* [prebuilt-getters](src/prebuilt-getters.js) – each instance of List generates its own getter and setter functions to 
get previous and next items in the list. This is faster than work with properties using bracket syntax. Also, this is the fastest
implementation which supports storing items in multiple lists and doesn't require extra wrappers.
* [wrapped-items](src/wrapped-items.js) – wrap items into special object to store in the list. Unlike other ones, it is
incompatible with `nodejs-linklist`, but it is the fastest implementation, because it doesn't use dynamic property
names, so it can be generated into perfectly optimized code.

### Project structure

* `src` – directory contains various implementations of linked list, as described above.
* `spec` – directory with functional unit-tests
* `benchmark.js` – performance tests

### Running tests

1. Install node.js or io.js
2. Run `npm install`
3. `npm test` for unit-tests
4. `npm run benchmark` for performance tests

# Benchmark results

## Tests description

**Shift test** fill list by items, and remove them all via shift.
**Peek test** fill list, and go through list and find a sum of values in items.

## System

Tests have been run in [Docker](https://www.docker.com/) using the official docker containers from the dockerhub.
 
* [node.js](https://registry.hub.docker.com/_/node/)
* [io.js](https://registry.hub.docker.com/_/iojs/)

```
Platform info:
Linux 3.13.0-35-generic x64
Intel Core i7 9xx (Nehalem Class Core i7) × 4
```

### node.js v0.10.38

```
--- Shift tests ---
nodejs-linklist x 829 ops/sec ±2.21% (77 runs sampled)
symbol-based x 66.05 ops/sec ±0.59% (70 runs sampled)
prebuilt-getters x 428 ops/sec ±2.94% (85 runs sampled)
wrapped-items x 1,442 ops/sec ±2.79% (83 runs sampled)
--- Peek tests ---
nodejs-linklist x 989 ops/sec ±1.79% (89 runs sampled)
symbol-based x 91.07 ops/sec ±0.84% (69 runs sampled)
prebuilt-getters x 671 ops/sec ±1.32% (88 runs sampled)
wrapped-items x 1,709 ops/sec ±3.40% (79 runs sampled)
```


### node.js v0.12.3

```
--- Shift tests ---
nodejs-linklist x 623 ops/sec ±1.42% (90 runs sampled)
symbol-based x 45.60 ops/sec ±0.96% (61 runs sampled)
prebuilt-getters x 373 ops/sec ±1.62% (80 runs sampled)
wrapped-items x 2,781 ops/sec ±11.18% (80 runs sampled)
--- Peek tests ---
nodejs-linklist x 356 ops/sec ±8.38% (51 runs sampled)
symbol-based x 55.45 ops/sec ±1.80% (59 runs sampled)
prebuilt-getters x 313 ops/sec ±6.96% (58 runs sampled)
wrapped-items x 1,856 ops/sec ±4.66% (93 runs sampled)
```

### iojs v2.0.2

```
--- Shift tests ---
nodejs-linklist x 1,762 ops/sec ±3.72% (52 runs sampled)
symbol-based x 46.20 ops/sec ±0.75% (62 runs sampled)
prebuilt-getters x 589 ops/sec ±3.16% (71 runs sampled)
wrapped-items x 1,993 ops/sec ±13.14% (64 runs sampled)
--- Peek tests ---
nodejs-linklist x 1,123 ops/sec ±10.79% (71 runs sampled)
symbol-based x 64.68 ops/sec ±1.26% (68 runs sampled)
prebuilt-getters x 539 ops/sec ±9.73% (50 runs sampled)
wrapped-items x 1,060 ops/sec ±25.04% (30 runs sampled)
```
