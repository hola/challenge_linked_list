// by borislav peev, written from my phone due to lack of laptop
// sorry for the space indent
// sorry for the lazy prototyping

"use strict"

/////////////////// benchmark

function text ( txt ) {
  document.body.innerHTML += txt + '</br>';
}

var nodeparasitetime, mineparasitetime;
var nodetotal = 0;
var minetotal = 0;

function bench ( name, node, mine, times ) {
  var start, nodet, minet;
  nodeparasitetime = 0;
  mineparasitetime = 0;
  text( 'Testing ' + name + ' ' + times + ' times...' );
  start = Date.now();
  for ( var n = 0; n < times; ++n ) {
    node();
  }
  nodet = Date.now() - start - nodeparasitetime;
  nodetotal += nodet;
  text( 'node ' + nodet / 1000.0 + 's' );

  start = Date.now();
  for ( var n = 0; n < times; ++n ) {
    mine();
  }
  minet = Date.now() - start - mineparasitetime;
  minetotal += minet;
  text( 'mine ' + minet / 1000.0 + 's' );

  if ( nodet == minet ) {
    text( 'draw' );
  }
  else {
    text( (nodet < minet ? 'node' : 'mine') + ' winz! ' + (nodet < minet ? minet / nodet : nodet / minet ) + ' times faster.' );
  }

  text( '' );
}

/////////////////// node
// pollutes the list items with dynamic properties
// can clash with other libs
// one list per item
// one item once per list
// only object items, no primitives
// not oop

var exports = {};

function init(list) {
  list._idleNext = list;
  list._idlePrev = list;
}
exports.init = init;


// show the most idle item
function peek(list) {
  if (list._idlePrev == list) return null;
  return list._idlePrev;
}
exports.peek = peek;


// remove the most idle item from the list
function shift(list) {
  var first = list._idlePrev;
  remove(first);
  return first;
}
exports.shift = shift;


// remove a item from its list
function remove(item) {
  if (item._idleNext) {
    item._idleNext._idlePrev = item._idlePrev;
  }

  if (item._idlePrev) {
    item._idlePrev._idleNext = item._idleNext;
  }

  item._idleNext = null;
  item._idlePrev = null;
}
exports.remove = remove;


// remove a item from its list and place at the end.
function append(list, item) {
  remove(item);
  item._idleNext = list._idleNext;
  list._idleNext._idlePrev = item;
  item._idlePrev = list;
  list._idleNext = item;
}
exports.append = append;


function isEmpty(list) {
  return list._idleNext === list;
}
exports.isEmpty = isEmpty;

/////////////////// mine
// minimum functionality, no proper api, just to speed test against node, obviously in the real world we need to add some methods etc., but the task said make it generic and fast, not beautiful
// not polluting the items with properties
// any number of lists per value
// any number of times per list
// any value type allowed
// oop
// requires additional keeping track of list items, but is completely generic, no limitations whatsoever

function LinkedList () {
  this._head = null;
  this._tail = null;
}

function LinkedListItem ( value, prev, next ) {
  this._value = value;
  this._prev = prev;
  this._next = next;
}

//only for debugging, not final api
LinkedList.prototype.toArrayRaw = function () {
  var p = this._head;
  var ret = [];
  while ( p !== null ) {
    ret.push( p );
    p = p._next;
  }
  return ret;
};

//only for debugging, not final api
LinkedList.prototype.toArray = function () {
  var p = this._head;
  var ret = [];
  while ( p !== null ) {
    ret.push( p._value );
    p = p._next;
  }
  return ret;
};

//only for debugging, not final api
LinkedList.prototype.toString = function () {
  return this.toArray().join( '' );
};

LinkedList.prototype.isEmpty = function () {
  return this._head === null;
};

LinkedList.prototype.append = function ( item ) {

  var h = this._head;
  var t = this._tail;

  var i = new LinkedListItem( item, t, null );
  this._tail = i;

  if ( h === null ) {
    this._head = i;
    return i;
  }

  t._next = i;
  return i;
};

LinkedList.prototype.shift = function () {
  //not reusing remove for the sake of the benchmark, of course
  var h = this._head;
  if ( h !== null ) {

    if ( this._tail === h ) {
        this._head = null;
        this._tail = null;
    }
    else {
      var hh = (this._head = h._next);
      hh._prev = null;
      h._next = null;
    }

  }
  return h;
};

LinkedList.prototype.remove = function ( item ) {

  //would be better to keep track of the parent list, otherwise remove can mess up, but safety is out of our scope

  var h = this._head;
  var t = this._tail;
  if ( item === h ) {

    if ( t === h ) {
      this._head = null;
      this._tail = null;
    }
    else {
      var hh = (this._head = h._next);
      hh._prev = null;
      h._next = null;
    }
  }
  else if ( item === t ) {
    
    var tt = (this._tail = t._prev);
    tt._next = null;
    t._prev = null;
  }
  else {
    var n = item._next;
    var p = item._prev;
    p._next = n;
    n._prev = p;
    item._prev = null;
    item._next = null;
  }

  return item;
};

/////////////////// the tests

/// sanity tests

//*
text( 'Testing integrity...' );
var minel = new LinkedList();
minel.append( 1 );
minel.append( 2 );
minel.append( 3 );
text( 'append ' + (minel.toString() == '123' ? 'OK' : 'Not OK') );
minel.shift();
text( 'shift ' + (minel.toString() == '23' ? 'OK' : 'Not OK') );
minel.shift();
text( 'shift ' + (minel.toString() == '3' ? 'OK' : 'Not OK') );
minel.shift();
text( 'shift ' + (minel.toString() == '' ? 'OK' : 'Not OK') );
minel.append( 1 );
minel.append( 2 );
minel.append( 3 );
minel.append( 4 );
minel.append( 5 );
text( 'append ' + (minel.toString() == '12345' ? 'OK' : 'Not OK') );
var vals = minel.toArrayRaw();
minel.remove( vals[ 1 ] );
text( 'remove ' + (minel.toString() == '1345' ? 'OK' : 'Not OK') );
minel.remove( vals[ 3 ] );
text( 'remove ' + (minel.toString() == '135' ? 'OK' : 'Not OK') );
minel.remove( vals[ 0 ] );
text( 'remove ' + (minel.toString() == '35' ? 'OK' : 'Not OK') );
minel.remove( vals[ 4 ] );
text( 'remove ' + (minel.toString() == '3' ? 'OK' : 'Not OK') );
minel.remove( vals[ 2 ] );
text( 'remove ' + (minel.toString() == '' ? 'OK' : 'Not OK') );
minel.append( 1 );
minel.append( 2 );
minel.append( 3 );
text( 'append ' + (minel.toString() == '123' ? 'OK' : 'Not OK') );

text( '' );
//*/

/// list init

function node_init () {
  // using the fn via exports is fair here because it is unlikely that in node they import the module and copy the fns globally
  var list = {};
  exports.init( list );
}

function mine_init () {
  new LinkedList();
}

bench( 'init', node_init, mine_init, 1000000 );

/// peek

var nodel = {};
exports.init( nodel );
var minel = new LinkedList();

function node_peek() {
  return exports.peek( nodel );
}

function mine_peek () {
  // using the property directly is fair, not that I would use it like this in the real world
  return minel._head;
}

bench( 'peek', node_peek, mine_peek, 10000000 );

/// append

var nodevals, minevals;

function init_values ( i ) {

  nodevals = [];
  minevals = [];

  //init some values
  for ( ; i > 0; --i ) {
    //push is faster than prealloc in recent v8, go figure
    nodevals.push( { a: i, _idleNa: i, _idlePb: 'asdf' } );
    minevals.push( { a: i, _idleNa: i, _idlePb: 'asdf' } );
  }
}

function node_append () {
  exports.init( nodel );
  for ( var n = nodevals.length - 1; n >= 0; --n ) {
    exports.append( nodel, nodevals[ n ] );
  }
}

function mine_append () {
  minel = new LinkedList();
  for ( var n = minevals.length - 1; n >= 0; --n ) {
    minel.append( minevals[ n ] );
  }
}

init_values( 500 );
bench( 'append 500x', node_append, mine_append, 10000 );

/// shift

function node_shift () {
  var start = Date.now();
  node_append();
  nodeparasitetime += Date.now() - start;
  for ( var n = nodevals.length; n >= 0 ; --n ) {
    exports.shift( nodel );
  }
}

function mine_shift () {
  var start = Date.now();
  mine_append();
  mineparasitetime += Date.now() - start;
  for ( var n = minevals.length; n >= 0 ; --n ) {
    minel.shift();
  }
}

init_values( 500 );
bench( 'shift 500x', node_shift, mine_shift, 10000 );

/// remove

function node_remove () {
  var start = Date.now();
  node_append();
  nodeparasitetime += Date.now() - start;

  //remove every other item
  var p = nodel;
  do {
    p = p._idlePrev;
    if ( p && p !== nodel && p._idlePrev && p._idlePrev !== nodel ) {
      exports.remove( p._idlePrev );
    }
    else {
      break;
    }
  } while ( p && p !== nodel );

  //remove half of the rest from left
  for ( var n = Math.floor( nodevals.length / 4 ) ; n > 0; --n ) {
    exports.remove( nodel._idlePrev );
  }

  //remove the rest from the right
  while ( nodel._idleNext && nodel._idleNext !== nodel ) {
    exports.remove( nodel._idleNext );
  }
}

function mine_remove () {
  var start = Date.now();
  mine_append();
  mineparasitetime += Date.now() - start;

  //remove every other item
  var p = minel._head;
  while ( p ) {
    if ( p && p._next ) {
      minel.remove( p._next );
    }
    p = p._next;
  }

  //remove half of the rest from left
  for ( var n = Math.floor( minevals.length / 4 ) ; n > 0; --n ) {
    minel.remove( minel._head );
  }

  //remove the rest from the right
  while ( minel._tail ) {
    minel.remove( minel._tail );
  }

}

init_values( 500 );
bench( 'remove 500x', node_remove, mine_remove, 10000 );

/////// total
  text( '============= total' );
  var nodet = nodetotal;
  var minet = minetotal;
  text( 'node ' + nodet / 1000.0 + 's' );
  text( 'mine ' + minet / 1000.0 + 's' );

  if ( nodet == minet ) {
    text( 'draw' );
  }
  else {
    text( (nodet < minet ? 'node' : 'mine') + ' winz! ' + (nodet < minet ? minet / nodet : nodet / minet ) + ' times faster.' );
  }
