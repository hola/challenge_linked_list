/*******************************************************************************************
   Title:  Javascript Generic List Implementation
   Description:  An implementation of a Generic List with LINQ support (based off .NET).
   Test:
        function Car(make, model)
        {
            this.make = make;
            this.model = model;
        }

        var myList = new List();
        myList.Add(new Car("Honda", "Civic"));
        myList.Add(new Car("Nissan", "Sentra"));
        myList.Add(new Car("Honda", "Cr-V"));
        myList.Add(new Car("Honda", "Cr-V"));

        var selList = myList.Where("make == 'Honda'").OrderByDescending("model").Distinct();
         
*********************************************************************************************/

/*namespace GenericList*/(function () {

    // ===============  Static Members  =================================================

    var $List$Created = -1, // Id counter used to identify each List instance.
        $List$Instances = {}, // Storage for each instance which has yet to be disposed.
    //Destructor
        $List$Dispose = (function (who, disposing) {
            try {

                //Ensure who is a List instance
                if (typeof who === 'number') who = $List$Instances[who];

                //Determine if event was called
                disposing = disposing || this === window;

                //Remove instance from Type storage
                $List$Instances[who.$key] = null;
                delete $List$Instances[who.$key];

                //Dispose Type in a closure
                if (disposing && Object.keys($List$Instances).length === 0) {
                    //Anonymously
                    (function () {
                        //set a timeout for 0 seconds to dispose the List Type
                        setTimeout((function () {
                            List = null;
                            return delete List;
                        }), 0);
                    })();
                }

            } catch (E) { }
        });

    // Method: Constructor
    // Description: Returns a new List instance based on the given parameters.
    function List(/*type, array*/) {

        // ===============  Private Attributes  =================================================

        var key = ++$List$Created,  // Identify each List instance with an incremented Id.
        oType = undefined,      // Used to ensure that all objects added to the list are of the same type.
        listArray = [];         // Stores all the list data.
        $List$Instances[key] = this; // Store instance with key

        //Copy constructor (utilized if first parameter is a List instance
        if (arguments[0] && arguments[0] instanceof List) {
            oType = arguments[0].$type; // Set the type of the List from the given
            listArray = arguments[0].array; // Set the inner array of the List from the given
        } else if (arguments[0] && arguments[0].length) { //If there is a type given it may be contained in an array which is to be used as the interal array..       
            try {
                oType = arguments[0][0].constructor; // Set type of the List from the first element in the given array
                arguments[1] = arguments[1] || arguments[0]; // Make a new argument incase one is not given which should be the array given. This will be used after AddRange is constructed to verify each given item complies with the List logic.
            } catch (e) { }
        };

        // ===============  Public Properties  =================================================

        //If supported define public properties on the List instance being created
        if (Object.defineProperty) {

            // Property: array
            // Description: Gets or Sets in Native inner array utilized by the List for storage. The elements contained must be of the same type in which this List instance was created with.
            Object.defineProperty(List.prototype, 'array',
           {
               // writable: false, // True if and only if the value associated with the property may be changed. (data descriptors only). Defaults to false.
               enumerable: true, // true if and only if this property shows up during enumeration of the properties on the corresponding object. Defaults to false.
               configurable: true, // true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object. Defaults to false.
               get: function () {
                   return listArray;
               },
               set: function (value) {
                   //Ensure Array
                   if (value instanceof Array) {
                       //Ensure length
                       if (value.length) {
                           //Ensure types
                           value.forEach(function (v) { if (v.constructor !== oType) throw "Only one object type is allowed in a list"; });
                       }
                       //Set member
                       listArray = value;
                   }
               }
           });

            // Property: $key
            // Description: Gets the machine key which identifies this List instance in the memory of all created List instances.
            Object.defineProperty(List.prototype, '$key',
           {
               configurable: true,
               get: function () {
                   return key;
               }
           });

            // Property: $key
            // Description: Gets the constructor or type in which this List was created with
            Object.defineProperty(List.prototype, '$type',
           {
               enumerable: true,
               configurable: true,
               get: function () {
                   return oType;
               }
           });


        } else {
            this.$type = oType;         // Compatibility
            this.array = listArray;
            this.$key = key;
        }

        // ===============  Private Methods  ====================================================

        // Method:  validate
        // Description:  Make sure that all objects added to the List are of the same type.
        function validate(object) {
            //If we have not yet determined a type it is determined by the first object added
            if (!oType) {
                oType = object.constructor;
            }
            else if (object.constructor !== oType) {
                throw "Only one object type is allowed in a list";
            }
        }

        // Method:  select
        // Description:  Return a copy of this List object with only the elements that meet the criteria
        //               as defined by the 'query' parameter.
        // Usage Example:  
        //              var selList = select("make == 'Honda'").
        //              var anotherList = select(function(){ return this.make === 'Honda' });
        function select(query) {
            var selectList = new List();
            listArray.forEach(function (tEl) {
                with (tEl)
                    if (eval(query))
                        selectList.Add(tEl);
            });
            return selectList;
        }

        // Method:  genericSort
        // Description:  Sort comparison function using an object property name.  Pass this function to
        //               the Javascript sort function to sort the list by a given property name.
        // Usage Example:
        //              var sortedList = listArray.sort(genericSort('model'));
        function genericSort(property) {
            return function (a, b) {
                return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            }
        }

        // ===============  Public Methods  ======================================================

        // Method:  Add
        // Description:  Add an element to the end of the list.
        this.Add = function (object) {

            validate(object);

            listArray.push(object);
        }

        // Method:  AddRange
        // Description:  Adds each of the elements in the given Array or List to this List instance
        this.AddRange = function (arrayOrList) {
            if (!arrayOrList) return;
            if (arrayOrList instanceof Array) {
                try {
                    arrayOrList.forEach(function (tEl) {
                        this.Add(tEl);
                    }, this);
                } catch (e) { throw e; }
            } else if (arrayOrList instanceof List) {
                try {
                    arrayOrList.array.forEach(function (tEl) {
                        this.Add(tEl);
                    }, this);
                } catch (e) { throw e; }
            }
        }

        //If there is an array given then each member of the array must be added and verified
        if (arguments[1] && arguments[1].length) {
            try {
                this.AddRange(arguments[1]);
            } catch (e) { throw e; }
        }

        // Method:  Clear
        // Description:  Removes all elements from this List instance
        this.Clear = function () { listArray = []; }

        // Method:  CopyTo
        // Description:  Adds all elemets in this List to the given array, List or Object
        this.CopyTo = function (source) {
            if (!source) return;
            if (source instanceof List) {
                listArray.forEach(function (tEl) {
                    source.Add(tEl);
                });
            } else if (source instanceof Array) {
                listArray.forEach(function (tEl) {
                    source.push(tEl);
                });
            } else {
                listArray.forEach(function (tEl) {
                    source[tEl.toString()] = tEl;
                });
            }
        }

        // Method:  Insert
        // Description:  Inserts an element into the List at the specified index (where).
        this.Insert = function (where, what) {
            if (where < 0 || where > listArray.length) throw "Invalid index parameter in call to List.Insert (arguments[0] = '" + where + "')";
            if (what.length) what.forEach(validate)
            else validate(what);
            listArray.splice(where, 0, what);
        }

        //Insert and InsertRange are the same physcially
        this.InsertRange = this.Insert;

        // Method:  Sort
        // Description:  Sorts the elements in the entire List using the specified comparer or genericSort
        this.Sort = function (comparer) {
            comparer = comparer || genericSort;
            listArray.sort(comparer);
        }

        // Method:  All
        // Description:  returns true if all elements in the List match the given query
        this.All = function (query) { return this.Count() === this.Where(query).Count(); }

        // Method:  Remove
        // Description:  Removes occurrences of a specific object from the List or a given amount.
        this.Remove = function (what/*, all, where, howMany */) {
            //Determine arguments for logic
            var all = arguments[1] || false,
            where = arguments[2] || undefined,
            howMany = arguments[3] || 1,
            results = new List();
            //Determine branch
            if (where < 0 || where > listArray.length) throw "Invalid index parameter in call to List.Remove (arguments[3] = '" + where + "')";
            if (!where && this.Contains(what)) {
                try { results.AddRange(listArray.splice($containsLastResult, howMany)); } catch (e) { throw e; }
            }
            else if (where) try { results.AddRange(listArray.splice(where, howMany)); } catch (e) { throw e; }
            if (all && this.Contains(what)) try { results.AddRange(this.Remove(undefined, undefined, $containsLastResult)); } catch (E) { throw e; }
            return results;
        }

        // Method:  RemoveAt
        // Description:  Removes the element at the specified index.
        this.RemoveAt = function (index) {
            return this.Remove(undefined, undefined, index, 1);
        }

        // Method:  RemoveRange
        // Description:  Removes a range of elements from the List starting at the given index count times.
        this.RemoveRange = function (index, count) {
            return this.Remove(undefined, undefined, index, count);
        }

        // Method:  RemoveAll
        // Description:  Removes all the elements that match the conditions defined by the specified predicate.
        this.RemoveAll = function (query) {
            //Run Where with the query to get results then pass the resulting List to ForEach on this instances Remove function
            return this.Where(query).ForEach(this.Remove);
        }

        // Method:  ElementAt
        // Description:  Get the element at a specific index in the list.
        this.ElementAt = function (index) {
            if (index >= this.Count() || index < 0)
                throw "Invalid index parameter in call to List.ElementAt";
            return listArray[index];
        }

        // Method:  Where
        // Description:  Return a copy of this List object with only the elements that meet the criteria
        //               as defined by the 'query' parameter.
        this.Where = function (query) { return select(query); }

        // Method:  FirstOrDefault
        // Description:  Return the first object in the list that meets the 'query' criteria or null if no objects are found.        
        this.FirstOrDefault = function (query/*, last*/) {
            var list = select(query),
            last = arguments[1] || false;
            return list ? list.ElementAt(last ? list.Count() - 1 : 0) : null;
        }

        // Method:  Count
        // Description:  Return the number of elements in the list or optionally the number of elements which are equal to the object given
        this.Count = function (what) {
            if (!what) return listArray.length;
            else {
                var count = 0;
                listArray.forEach(function (el) { if (el === what) ++count; });
                return count;
            }
        }

        //Method: Reverse
        //Description: Reverses the list starting at the given index || 0 count times.
        this.Reverse = function (index, count) {
            index = index || 0;
            count = count || listArray.length - 1;

            if (index < 0 || count > listArray.length) throw "Invalid index or count parameter in call to List.Reverse";

            for (; count > index; ++index, --count) {
                var temp = listArray[index];
                listArray[index] = listArray[count];
                listArray[count] = temp;
            }

            return;
        }

        //Method: ToArray
        //Description: Copies the elements of the List to a new array.
        this.ToArray = function () { return Array(listArray); }

        // Method:  OrderBy
        // Description:  Order (ascending) the objects in the list by the given object property name.
        this.OrderBy = function (property/*, desc*/) {
            //Make the list and the interval array
            var l = new List(listArray.slice(0).sort(genericSort(property))),
            //Determine if we need to reverse
            desc = arguments[1] || false;
            if (desc) l.Reverse();
            //return
            return l;
        }

        // Method:  OrderByDescending
        // Description:  Order (descending) the objects in the list by the given object property name.
        this.OrderByDescending = function (property) {
            return this.OrderBy(property, true);
        }

        //Storage pointer for the last result of Contains call
        var $containsLastResult = undefined;
        // Method: Contains
        // Description: Determines if the given object is contained in the List
        this.Contains = function (object, start) {
            var contained = false,
            keys = Object.keys(object);
            start = start || 0;
            //Iterate list
            listArray.forEach(function (tEl) {
                //Iterate keys
                keys.forEach(function (key, index) {
                    if (index < start) return;
                    //Try to ascertain equality
                    try {
                        //contained is equal to the expression of tEl[key] being exactly equal to object[key]'s value
                        if (contained = (tEl[key] === object[key])) $containsLastResult = index; //Store the last index if contained
                        else $containsLastResult = -1;
                    } catch (e) { contained = false; $containsLastResult = -1; }
                });
            });
            return contained;
        }

        // Method:  IndexOf
        // Description:  Returns the index of the specified element in this List or -1 if not found
        this.IndexOf = function (what, start) {
            try { return this.Contains(what, start || 0) ? $containsLastResult : -1; }
            catch (e) { return false; }
        }

        // Method:  LastIndexOf
        // Description:  Returns the last index of the specified element in this List or -1 if not found
        this.LastIndexOf = function (what, start, end) {
            var lastIndex = -1;
            start = start || 0;
            end = end || listArray.length;
            while (this.Contains(what, start++) && start < end) lastIndex = $containsLastResult;
            return lastIndex;
        }

        // Method: Distinct
        // Description: Gets a copy of the list with only unique elements.
        this.Distinct = function () {
            var results = new List();
            try {
                //this.ForEach(function (tEl) { if (!results.Contains(tEl)) results.Add(tEl); });
                //Equivelant to the following except the below is native 
                listArray.forEach(function (tEl) { if (!results.Contains(tEl)) results.Add(tEl); });
            } catch (E) { }
            return results;
        }

        // Method: ForEach
        // Description: Calls the given query on each element of the List
        this.ForEach = function (query, start, end) {
            start = start || 0;
            end = end || listArray.length - 1;
            if (start < 0 || end > listArray.length) throw "Invalid start or end parameter in call to List.ForEach";
            listArray.forEach(function (tEl, index) {
                if (start > index || end < index) return;
                with (tEl) query();
            });
        }

        // Method: TrueForAll
        // Description: etermines whether every element in the List matches the conditions defined by the specified predicate.
        this.TrueForAll = function (query) {
            return this.Where(query).Count() === this.Count();
            //this.ForEach(function () { if (!query()) return false; });
            //return true;
        }

        // Extension Methods
        this.First = function () { return listArray[0]; }
        this.Last = function () { return listArray[listArray.length - 1]; }

        // Method:  Any
        // Description:  returns true on the first element in the List which meets the given query.
        this.Any = function (query) {
            var result = false;
            try {
                listArray.forEach(function (tEl) {
                    with (tEl)
                        if (query()) {
                            result = true;
                            throw new Error();
                        }
                });
            } catch (E) { }
            return result;
        }

        // Method:  LastOrDefault
        // Description:  Return the last object in the list that meets the 'query' criteria or null if no objects are found.
        this.LastOrDefault = function (query) { return query ? this.FirstOrDefault(query, true) : null; }

        // Method:  Single
        // Description:  Returns the first object in the list that meets the 'query' criteria or null if no objects are found.
        this.Single = function (query) { return query ? this.FirstOrDefault(query) : null; }

        // Method:  Single
        // Description:  Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. The element's index is used in the logic of the predicate function.
        this.SkipWhile = function (query, start) {
            if (!query) return null;
            start = start || 0;
            if (start < 0 || start > listArray.length) throw "Invalid start parameter in call to List.SkipWhile";
            var results = new List();
            listArray.forEach(function (tEl, index) {
                if (index < start) return;
                with (tEl) if (!query()) results.Add(tEl);
            });
            return results;
        }

        //Cleanup instance prototype
        for (var p in this) if (!this.hasOwnProperty(p)) delete this.p;

        //Add event for destructor in executed closure
        window.addEventListener('unload', function (self) { $List$Dispose(self, true); } (this));

        //freeze new instance
        return Object.freeze(this);

    }

    //Method: indexOf
    //Description adds logic to retrieve the index of an element from an array if present, otherwise -1
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt /*, from*/) {
            var len = this.length,
            from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0) from += len;
            for (; from < len; from++)
                if (from in this && this[from] === elt)
                    return from;
            return -1;
        };
    }

    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function () { };
    }

    if (!Object.keys) {
        Object.keys = function (that) {
            var results = [];
            for (var p in that)
                if (that.hasOwnProperty(p))
                    results.push(that.p);
            return results;
        };
    }

    if (!Object.freeze) {
        Object.freeze = function (object) { };
    }

    //Export and Freeze List to the window namespace
    Object.freeze(window.List = List);

})();
