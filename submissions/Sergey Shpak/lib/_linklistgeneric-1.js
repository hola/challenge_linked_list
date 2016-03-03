/***********************************************************
 * Tools
 * General Link List
 * Copyright 2015 Sergii Shpak <sergii.shpak.web@gmail.com>
 * MIT License, http://shps.mit-license.org
 ************************************************************/

/* The main idea of this solution is creation (and partial caching)
 * of unique 'List' Constructors per each list instance */

var listCounter = 0,
	Item = function (prev, next) {
		this.prev = prev;
		this.next = next;
	},
	List = function (Item) {

		this.key = new Item(this, this);

		this.append = function (item) {
			this.remove(item).key = new Item(this, this.key.next);
			this.key.next.key.prev = item;
			this.key.next = item;
		};

		this.remove = function (item) {
			if (!item.key) return item;
			item.key.next.key.prev = item.key.prev;
			item.key.prev.key.next = item.key.next;
			item.key = null;
			return item;
		};

		this.shift = function () {
			return this.remove(this.key.prev);
		};

		this.peek = function () {
			if (this.key.prev === this) return null;
			return this.key.prev;
		};

		this.isEmpty = function () {
			return this.key.next === this;
		};

		// Get List key, if list has been created without 'name'
		this.getKey = function () {
			return "key"
		};

	}.toString(),

	ListConstructorBody = List.substring(List.indexOf("{") + 1, List.lastIndexOf("}")),

	ListConstructorsCache = {};


module.exports = function (name) {

	var Constructor = ListConstructorsCache[name] ||
		new Function("Item", ListConstructorBody.replace(/key/g, name || ("__list_" + listCounter++ )));

	// Cache Constructors only with passed name
	if (name) ListConstructorsCache[name] = Constructor;
	return new Constructor(Item);
};