/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.render = dom.render || {};

	/**
	 * Render queue
	 * @constructor
	 */
	dom.render.Queue = function () {
		/** @type {Object.<string, dom.render.Update>}*/
		this.updatesMap = {};
		/** @type {Array.<string>}*/
		this.queue = [];
		/** @type {number}*/
		this.length = 0;
	};

	/**
	 * Add into queue
	 * @param {dom.html.Element} element
	 * @param {string} name Function name
	 * @param {Function} what
	 */
	dom.render.Queue.prototype.add = function (element, name, what) {
		var queue = this.queue,
			updatesMap = this.updatesMap,
			updates = element.getUpdates(),
			updateId = updates.getId(),
			update = updatesMap[updateId];
		//create updates
		if (!update) {
			//add to map and push
			updatesMap[updateId] = updates;
			queue.push(updateId);
			//set variable
			update = updates;
			//update
			this.length++;
		}
		//push update
		update.pushUpdate(name, what);
	};

	/**
	 * Get function from queue
	 * @returns {Function}
	 */
	dom.render.Queue.prototype.get = function () {
		//no queue
		if (this.length === 0) {
			return null;
		}
		//get first update
		var update,
			queue = this.queue,
			key = queue[0],
			updateMap = this.updatesMap,
			updates = updateMap[key];
		//pop update
		update = updates.popUpdate();
		//delete
		if (updates.length === 0) {
			//delete
			delete updateMap[key];
			//update
			this.length--;
			//remove from queue
			queue.shift();
		}
		//return function
		return update;
	};

	/**
	 * Get functions from queue
	 * @param {dom.html.Element} element
	 * @returns {Array.<Function>}
	 */
	dom.render.Queue.prototype.getFor = function (element) {
		var i,
			all,
			array = [],
			queue = this.queue,
			updateMap = this.updatesMap,
			updates = element.getUpdates(),
			children = element.getChildren(),
			key = updates.getId(),
			update = updateMap[key];

		//force for all children
		if (!element.isEmpty() && children.length) {
			for (i = 0; i < children.length; i++) {
				array = array.concat(this.getFor(children[i]));
			}
		}
		//no element found
		if (!update) {
			return array;
		}
		//all
		all = update.getAll();
		//get functions
		array = array.concat(all);
		//remove
		delete updateMap[key];
		queue.splice(queue.indexOf(key), 1);
		//length
		this.length--;
		//return functions
		return array;
	};

	/**
	 * Count
	 * @return {number}
	 */
	dom.render.Queue.prototype.count = function () {
		return this.length;
	};



}(dom, document, window));
