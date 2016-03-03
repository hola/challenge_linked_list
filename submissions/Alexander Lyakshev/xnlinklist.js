/* Created by Alexander Lyakshev */

"use strict";

function XnLinkList(id) {
    //var id = generateId();
    Object.defineProperty(this, "listId",
        {
            "get": function() { return id; },
            enumerable: false,
            configurable: false
        });

    this.append = new Function("item", appendFuncCode.replace(/\$/g, id));
    this.remove = new Function("item", removeFuncCode.replace(/\$/g, id));
    this.peek = new Function("", peekFuncCode.replace(/\$/g, id));
    this.shift = new Function("", shiftFuncCode.replace(/\$/g, id));
    this.isEmpty = new Function("", isEmptyFuncCode.replace(/\$/g, id));
    this.clear = new Function("", clearFuncCode.replace(/\$/g, id));

    this.clear();
}
exports.createList = function() { return new XnLinkList(globalListId++); };


function generateId() {
    var stamp = Date.now() * 10000 + Math.floor(Math.random() * 10000);
    return toString63(stamp);
}

/**
 * Converts a number to a string with radix of 63: 0-9 'a'-'z' 'A'-'Z' $
 * @param number - the number that will be converted to a string
 * @returns {string}
 */
function toString63(number) {
    if(!isFinite(number)) {
        throw new Error("Argument should be a number");
    }
    var res = "", val;
    do {
        if(number < 63) {
            val = number;
            number = undefined;
        } else {
            val = number % 63;
            number = (number - val) / 63;
        }
        if(val < 36) {
            res = val.toString(36) + res;  //convert val to 0-9/'a'-'z' view
            continue;
        }
        if(val === 62) {
            res = "$" + res;
            continue;
        }
        val += 29;                         //convert val to ASCII code 'A'-'Z': 'A' + (val - 36)
        res = String.fromCharCode(val) + res;
    } while(number !== undefined);
    return res;
}

// Data -----------------------------------------------------------------------
var appendFuncCode =
    "this.remove(item);" +
    "item._next$ = this._next$;" +
    "item._prev$ = this;" +
    "this._next$._prev$ = item;" +
    "this._next$ = item;";
var removeFuncCode =
    "if(item._next$) {" +
    "    item._next$._prev$ = item._prev$;" +
    "}" +
    "if(item._prev$) {" +
    "    item._prev$._next$ = item._next$;" +
    "}" +
    "item._next$ = null;" +
    "item._prev$ = null;";
var peekFuncCode = "return this._prev$ !== this ? this._prev$ : null;";
var shiftFuncCode =
    "var first = this._prev$;" +
    "this.remove(first); " +
    "return first;";
var isEmptyFuncCode = "return this._next$ === this;";
var clearFuncCode = "this._next$ = this._prev$ = this;";

var globalListId = 0;


