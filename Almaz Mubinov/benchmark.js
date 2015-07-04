function generateRandomObjects(count){
    var result = [];
    for (var i = 0; i < count; i++) {
        var obj = {};
        obj[i] = Math.random().toString(36);
        result.push(obj);
    }
    return result;
}
function getRandom(max){
    return Math.floor(Math.random() * max);
}
var i = 0;
var n = 100000;

// Benchmark for original linklist
var _linklist = require('./original_linklist/_linklist');
console.log('Benchmark for original linklist:');
var test_objects = generateRandomObjects(n);

// Test 1
console.time('\tTimer 1 (creating and appending 100k items)');
_linklist.init(test_objects[0]);
for (i =1; i < n; i++) {
    _linklist.append(test_objects[0], test_objects[i]);
}
console.timeEnd('\tTimer 1 (creating and appending 100k items)');

// Test 2
console.time('\tTimer 2 (shift random 10k items)');
for (i =1; i < n; i++) {
    try{
        _linklist.shift(test_objects[getRandom(n)]);
    }catch ($e){

    }
}
console.timeEnd('\tTimer 2 (shift random 10k items)');

// Test 3
console.time('\tTimer 3 (peek random 10k items)');
for (i =1; i < n; i++) {
    try{
        m = _linklist.peek(test_objects[getRandom(n)]);
        if(m<0){
            console.log('this is unreachable line')
        }
    }catch ($e){

    }
}
console.timeEnd('\tTimer 3 (peek random 10k items)');

// Test 4
console.time('\tTimer 4 (remove random 10k items)');
for (i =1; i < n; i++) {
    try{
        _linklist.remove(test_objects[getRandom(n)]);
    }catch ($e){

    }
}
console.timeEnd('\tTimer 4 (remove random 10k items)');


//---------------------------------------------------
console.log('\n\n');

// Benchmark for List102
var List102 = require('./List102/List102');

console.log('Benchmark for List102:');
list102 = new List102();

// Test 1
console.time('\tTimer 1 (creating and appending 100k items)');
list102.init(test_objects[0]);
for (i =1; i < n; i++) {
    list102.append(test_objects[0], test_objects[i]);
}
console.timeEnd('\tTimer 1 (creating and appending 100k items)');

// Test 2
console.time('\tTimer 2 (shift random 10k items)');
for (i =1; i < n; i++) {
    try{
        list102.shift(test_objects[getRandom(n)]);
    }catch ($e){

    }
}
console.timeEnd('\tTimer 2 (shift random 10k items)');

// Test 3
console.time('\tTimer 3 (peek random 10k items)');
for (i =1; i < n; i++) {
    try{
        m = list102.peek(test_objects[getRandom(n)]);
        if(m<0){
            console.log('this is unreachable line')
        }
    }catch ($e){

    }
}
console.timeEnd('\tTimer 3 (peek random 10k items)');

// Test 4
console.time('\tTimer 4 (remove random 10k items)');
for (i =1; i < n; i++) {
    try{
        list102.remove(test_objects[getRandom(n)]);
    }catch ($e){

    }
}
console.timeEnd('\tTimer 4 (remove random 10k items)');