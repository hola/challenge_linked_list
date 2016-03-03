/***********************************************************
 * Tools
 * General Link List
 * Copyright 2015 Sergii Shpak <sergii.shpak.web@gmail.com>
 * MIT License, http://shps.mit-license.org
 ************************************************************/

/* The main idea of this solution is creation of anonymous Item instances,
 * which are linked between themselves and list instance */


var listCounter = 0,
    // 'ItemGeneric' is used to profile memory heap snapshot
	ItemGeneric = function( id, prev, next, data ) {

		this.id = id;
		this.prev = prev;
		this.next = next;
		this.data = data;
	},
	List = function( id ) {

		this.id = id;
		this.next = this;
		this.prev = this;

		this.append = function( data ) {
			return this.next = this.next.prev =
				new ItemGeneric(id, this, this.next, data);
		};

		this.remove = function( item ) {
			if(!item.prev) return item;
			item.next.prev = item.prev;
			item.prev.next = item.next;
			return item.data; // return item
		};

		this.shift = function() {
			return this.remove(this.prev);
		};

		this.peek = function() {
			if(this.prev === this) return null;
			return this.prev.data;
		};

		this.isEmpty = function() {
			return this.next === this;
		};

		this.inList = function(item){
			return this.id === item.id;
		}
	};

module.exports = function( name ) {
	return new List(name || "list_" + listCounter++);
};