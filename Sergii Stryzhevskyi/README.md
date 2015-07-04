##[Hola’s Spring JS Competition](http://hola.org/challenge_js)
I was trying to understand this task, I hope I've managed this.
Atention: some magic constants inside!

####Start

```sh
npm start
```

####This is output of tests, which I've got on my laptop.

```
Test similar to default but with new feature
Default (Joyent's) linked list   x 301,969 ops/sec ±0.82% (90 runs sampled)
Array (splice) linked list       x 92,783 ops/sec ±1.00% (92 runs sampled)
Array (adaptive) linked list     x 311,697 ops/sec ±0.82% (89 runs sampled)
Array of IDs linked list         x 80,417 ops/sec ±42.72% (59 runs sampled)
Object linked list               x 51,625 ops/sec ±1.00% (87 runs sampled)
Map linked list                  x 34,975 ops/sec ±0.96% (87 runs sampled)
WeakMap linked list              x 31,404 ops/sec ±1.04% (94 runs sampled)
Fastest is Array (adaptive) linked list 


Test with "append" and "remove" for list with 10 elements
Default (Joyent's) linked list   x 368,959 ops/sec ±1.99% (92 runs sampled)
Array (splice) linked list       x 133,603 ops/sec ±2.04% (91 runs sampled)
Array (adaptive) linked list     x 363,745 ops/sec ±0.87% (98 runs sampled)
Array of IDs linked list         x 277,586 ops/sec ±0.90% (93 runs sampled)
Object linked list               x 307,537 ops/sec ±0.34% (97 runs sampled)
Map linked list                  x 47,283 ops/sec ±6.70% (78 runs sampled)
WeakMap linked list              x 53,117 ops/sec ±3.38% (99 runs sampled)
Fastest is Default (Joyent's) linked list       


Test with "append" and "remove" for list with 100 elements
Default (Joyent's) linked list   x 43,191 ops/sec ±0.44% (100 runs sampled)
Array (splice) linked list       x 14,713 ops/sec ±0.57% (101 runs sampled)
Array (adaptive) linked list     x 20,837 ops/sec ±0.51% (102 runs sampled)
Array of IDs linked list         x 10,235 ops/sec ±0.63% (101 runs sampled)
Object linked list               x 35,081 ops/sec ±0.19% (97 runs sampled)
Map linked list                  x 5,048 ops/sec ±6.76% (79 runs sampled)
WeakMap linked list              x 4,971 ops/sec ±0.30% (101 runs sampled)
Fastest is Default (Joyent's) linked list
  
  
Test with "append" and "remove" for list with 300 elements
Default (Joyent's) linked list   x 14,312 ops/sec ±0.48% (101 runs sampled)
Array (splice) linked list       x 4,173 ops/sec ±0.95% (99 runs sampled)
Array (adaptive) linked list     x 4,141 ops/sec ±0.23% (102 runs sampled)
Array of IDs linked list         x 1,234 ops/sec ±0.82% (100 runs sampled)
Object linked list               x 11,519 ops/sec ±0.26% (98 runs sampled)
Map linked list                  x 1,594 ops/sec ±7.77% (79 runs sampled)
WeakMap linked list              x 1,715 ops/sec ±1.52% (98 runs sampled)
Fastest is Default (Joyent's) linked list   
    
    
Test with "append" and "remove" for list with 1000 elements
Default (Joyent's) linked list   x 4,324 ops/sec ±0.49% (99 runs sampled)
Array (splice) linked list       x 779 ops/sec ±0.73% (98 runs sampled)
Array (adaptive) linked list     x 774 ops/sec ±0.20% (97 runs sampled)
Array of IDs linked list         x 117 ops/sec ±0.21% (77 runs sampled)
Object linked list               x 3,474 ops/sec ±0.32% (98 runs sampled)
Map linked list                  x 513 ops/sec ±6.42% (79 runs sampled)
WeakMap linked list              x 538 ops/sec ±1.20% (97 runs sampled)
Fastest is Default (Joyent's) linked list       


Test with "append" and "remove" for list with 10000 elements
Default (Joyent's) linked list   x 433 ops/sec ±0.64% (98 runs sampled)
Array (splice) linked list       x 13.63 ops/sec ±0.78% (38 runs sampled)
Array (adaptive) linked list     x 13.14 ops/sec ±3.53% (38 runs sampled)
Array of IDs linked list         x 1.09 ops/sec ±0.87% (7 runs sampled)
Object linked list               x 299 ops/sec ±0.57% (82 runs sampled)
Map linked list                  x 42.38 ops/sec ±9.82% (57 runs sampled)
WeakMap linked list              x 44.15 ops/sec ±1.25% (60 runs sampled)
Fastest is Default (Joyent's) linked list 
```

Change *count* (index2.js:18) for different list length.