// Written by Ori Shalev, ori.shalev@gmail.com
// Submitting to hola! coding challenge http://hola.org/challenge_js?m
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var fs = require('fs');
var linklist = require('_linklist');
var tmp = require('tmp');
var tosource = require('tosource');

var sourceCode =
  "var remove = (" + tosource(linklist.remove) + ");\n" +
  "exports.remove = remove;\n" +
  "exports.init = (" + tosource(linklist.init) + ");\n" +
  "exports.peek = (" + tosource(linklist.peek) + ");\n" +
  "exports.shift = (" + tosource(linklist.shift) + ");\n" +
  "exports.append = (" + tosource(linklist.append) + ");\n" +
  "exports.isEmpty = (" + tosource(linklist.isEmpty) + ");\n";


module.exports = function(name, dontCache) {
  var genfile = null;
  var g;
  if (!dontCache) {
    try {
      genfile = '/tmp/_orilist_' + name + '.js';
      if (!fs.existsSync(genfile)) {
        fs.writeFileSync(genfile, sourceCode.replace(/idle/g, name));
      }
    }
    catch(err) {
      genfile = null;
    }
  }
  if (!genfile) {
    genfile = tmp.fileSync({ postfix: '.js' }).name;
    fs.writeFileSync(genfile, sourceCode.replace(/idle/g, name));
  }
  var g = require(genfile);
  return { init: g.init,
           peek: g.peek,
           shift: g.shift,
           remove: g.remove,
           append: g.append,
           isEmpty: g.isEmpty };
};
