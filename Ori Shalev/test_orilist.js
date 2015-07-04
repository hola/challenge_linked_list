
var L = require('./orilist')('idle1');
//var L = require('./orilist')('idle1', true); // this variation doesn't leave files in /tmp
//var L = require('_linklist');

var main = function()
{
        var a = { v: -1 };
        L.init(a);

        for (i = 0; i < 10000000; i++) {
                L.append(a, {v: i})
        }

}

main()

