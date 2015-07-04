# Solution for Hola’s Spring JS Competition - 2015

##Contestant 

Almaz Mubinov

mailto:almaz@mubinov.com

https://github.com/mubinov

## Solution

My solution in **List102/List102.js** (it is compiled from coffescript: **List102/List102.coffee**).
Solution based on very funny hack: we replace source code of our List102 class in runtime for improve performance

## How it use
    
    var List102 = require('./List102/List102');
    var list1 = new List102(); // first list
    var list2 = new List102(); // second list
    var object = /*some object*/;
    list1.init(object);
    list2.init(object); // Yes, object holds another list pointers! 
    

## Benchmark

    benchmark.js:

    Benchmark for original linklist:
        Timer 1 (creating and appending 100k items): 972ms
        Timer 2 (shift random 10k items): 1540ms
        Timer 3 (peek random 10k items): 276ms
        Timer 4 (remove random 10k items): 413ms

    Benchmark for List102:
        Timer 1 (creating and appending 100k items): *823ms*
        Timer 2 (shift random 10k items): *1456ms*
        Timer 3 (peek random 10k items): *261ms*
	    Timer 4 (remove random 10k items): *392ms*
	    
	    
                                        Full table
                
                                                        original linklist        List102
    Timer 1 (creating and appending 100k items)                972                 823
    Timer 2 (shift random 10k items)                           1540                1456
    Timer 3 (peek random 10k items)                            276                 261
    Timer 4 (remove random 10k items)                          413                 392
    
    
    How we can see performance hasn’t been degraded.