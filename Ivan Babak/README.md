The [node timers linklist](https://github.com/joyent/node/blob/master/lib/_linklist.js), reimplemented for the challenge: http://hola.org/challenge_js?l

Goal: generalize and allow list parent to hold two or more different lists in the parent list object.

Run the tests and the benchmark:
```bash
node comparison.js
```
The tests verify the original API consistency and the multi-list implementation of the reworked version.
The benchmark compares performance of the original and the reworked versions in the basic scenarios.

Use as a module:
```javascript
var L = require('./lib/linklist.js');
```

See the comments in the `lib/linklist.js` for the implementation details.
