/*
Author: kobi( kobi@napuzba.com )

mocha test suite ( npm install -g mocha )
*/

var assert = require("assert");
var List = require('./linklist');

describe('List test suite', function () {
    it('check init', function () {
        var ss = new List.List(); assertList( new List.List() , null , true , '' );
    });
    
    it('check append', function () {
        var ss = new List.List()      ; assertList( ss , null , true  , ''                 );
        ss.append(1);                 ; assertList( ss , 1    , false , '1'                );
        ss.append(2)                  ; assertList( ss , 1    , false , '1 -> 2'           );
        ss.append(3)                  ; assertList( ss , 1    , false , '1 -> 2 -> 3'      );
        ss.append(4)                  ; assertList( ss , 1    , false , '1 -> 2 -> 3 -> 4' );
    });

    it('check shift', function () {
        var ss = new List.List()
        ss.append(1);
        ss.append(2);
        ss.append(3);
        ss.append(4);
        assert.equal(1    , ss.shift() ) ; assertList( ss , 2    , false , '2 -> 3 -> 4' );
        assert.equal(2    , ss.shift() ) ; assertList( ss , 3    , false , '3 -> 4'      );
        assert.equal(3    , ss.shift() ) ; assertList( ss , 4    , false , '4'           );
        assert.equal(4    , ss.shift() ) ; assertList( ss , null , true  , ''            );
        assert.equal(null , ss.shift() ) ; assertList( ss , null , true  , ''            );

        ss.append(1); ss.append(2); ss.shift(); ss.append(3); assertList( ss , 2    , false , '2 -> 3'      );
        ss.append(4); ss.shift()  ; ss.shift(); ss.append(5); assertList( ss , 4    , false , '4 -> 5'      );
    });
    
    it('check remove', function () {
        var ss = new List.List()
        var a1 = ss.append(1);
        var a2 = ss.append(2);
        var a3 = ss.append(3);
        var a4 = ss.append(4);
        
        assertList( ss , 1    , false , '1 -> 2 -> 3 -> 4' );
        assert(3, ss.remove(a3)); assertList( ss , 1    , false , '1 -> 2 -> 4' );
        assert(3, ss.remove(a3)); assertList( ss , 1    , false , '1 -> 2 -> 4' );        
        assert(1, ss.remove(a1)); assertList( ss , 2    , false , '2 -> 4' );
        assert(1, ss.remove(a1)); assertList( ss , 2    , false , '2 -> 4' );
    });
    
    it('check moveEnd', function () {
        var s1 = new List.List();
        var a1 = s1.append(1);
        var a2 = s1.append(2);
        var a3 = s1.append(3);
        var a4 = s1.append(4);

        var s2 = new List.List();
        var aa = s2.append('a');
        var ab = s2.append('b');
        var ac = s2.append('c');
        var ad = s2.append('d');        
        
        s1.moveEnd(a2) ; assertList( s1 , 1    , false , '1 -> 3 -> 4 -> 2' );
        s1.moveEnd(a2) ; assertList( s1 , 1    , false , '1 -> 3 -> 4 -> 2' );
        s1.moveEnd(a3) ; assertList( s1 , 1    , false , '1 -> 4 -> 2 -> 3' );
        s1.moveEnd(a3) ; assertList( s1 , 1    , false , '1 -> 4 -> 2 -> 3' );
        s1.moveEnd(a1) ; assertList( s1 , 4    , false , '4 -> 2 -> 3 -> 1' );
        s1.moveEnd(a1) ; assertList( s1 , 4    , false , '4 -> 2 -> 3 -> 1' );
        
        s1.moveEnd(ab) ; assertList( s1 , 4    , false , '4 -> 2 -> 3 -> 1 -> b' ); assertList( s2 , 'a'    , false , 'a -> c -> d' );
        s1.moveEnd(ab) ; assertList( s1 , 4    , false , '4 -> 2 -> 3 -> 1 -> b' ); assertList( s2 , 'a'    , false , 'a -> c -> d' );
        s2.moveEnd(a2) ; assertList( s1 , 4    , false , '4 -> 3 -> 1 -> b'      ); assertList( s2 , 'a'    , false , 'a -> c -> d -> 2' );
        s2.moveEnd(a2) ; assertList( s1 , 4    , false , '4 -> 3 -> 1 -> b'      ); assertList( s2 , 'a'    , false , 'a -> c -> d -> 2' );        
    });    
    
    function assertList(list,top,empty,dump) {        
        assert.equal(list.peek()   , top   );
        assert.equal(list.isEmpty(), empty );
        assert.equal(list.dump()   , dump  );
    }
});
