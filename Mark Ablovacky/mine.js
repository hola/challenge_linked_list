// Copyright Joyent, Inc. and other Node contributors.
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

function init(list)
{
    // internal fields:
    //   __lists - array of nested lists
    // arrays in most cases faster then objects, so use it

    if (typeof list.__lists === 'undefined')
        list.__lists = [];
    list.__lists.push([list, list]);
    return list.__lists.length - 1;
}
exports.init = init;

function isEmpty(list, handle)
{
    return list.__lists[handle][1] === list;
}
exports.isEmpty = isEmpty;

// remove a item from its list
function remove(item)
{
    var next = item._next;
    var prev = item._prev;
    var handle = item._handle;

    // neither next or prev can not be null by design, so we can skip this check
    // but we should know if prev or next points on parent list object

    if (typeof next.__lists !== 'undefined')
        next.__lists[handle][0] = prev;
    else
        next._prev = prev;

    if (typeof prev.__lists !== 'undefined')
        prev.__lists[handle][1] = next;
    else
        prev._prev = next;

    item._prev = undefined;
    item._next = undefined;
    item._handle = undefined;
}
exports.remove = remove;

// remove the most idle item from the list
function shift(list, handle)
{
    var hList = list.__lists[handle];
    var first = hList[0];

    // we know a lot about links of this element, so we can optimize removing
    // first._next === list

    var prev = first._prev;

    // first._next._prev = first._prev
    hList[0] = prev;

    // first._prev._next = first._next
    if (prev === list)
        hList[1] = list;
    else
        prev._next = list;

    first._prev = undefined;
    first._next = undefined;
    first._handle = undefined;

    return first;
}
exports.shift = shift;

// remove a item from its list and place at the end.
function append(list, handle, item)
{
    // remove element only if it belongs to another list
    if (typeof item._handle !== 'undefined' && item._handle !== handle)
        remove(item);

    // last = list._next;
    var last = list.__lists[handle][1];

    // list._next._prev = item
    if (last === list)
        list.__lists[handle][0] = item;
    else
        last._prev = item;

    // list._next = item
    list.__lists[handle][1] = item;

    item._prev = list;
    // item._next = list._next
    item._next = last;
    item._handle = handle;
}
exports.append = append;

// show the most idle item
function peek(list, handle)
{
    var prev = list.__lists[handle][0];
    if (prev == list)
        return null;
    return prev;
}
exports.peek = peek;

// utilitary function, no optimization
// atm, prefer clear code
function free(list, handle)
{
    while (!isEmpty(list, handle))
        shift(list, handle);

    list.__lists[handle] = null;
    var shouldCompact = true;
    // check if all handles allocated after this, already freed. in this case, free memory for this handle
    // if we have active handles, it means that we can not remove this handle yet, coz we should keep handle table consistent
    for (var len = list.__lists.length, idx = handle + 1; idx < len; idx++)
    {
        if (list.__lists[idx])
        {
            shouldCompact = false;
            break;
        }
    }
    if (shouldCompact)
        list.__lists.length = handle;
}
exports.free = free;