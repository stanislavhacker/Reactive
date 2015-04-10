/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.render = dom.render || {};

	/**
	 * Insert
	 * @param {dom.render.Queue} self
	 * @param {dom.html.Element} element
	 * @returns {dom.render.Update}
	 */
	function insert(self, element) {
		var where,
			queue = self.queue,
			updatesMap = self.updatesMap,
			updates = element.getUpdates(),
			updateId = updates.getId(),
			update = updatesMap[updateId];
		//create updates
		if (!update) {
			//add to map and push
			updatesMap[updateId] = updates;
			//prioritize
			if (element.isPrioritized()) {
				where = Math.floor(queue.length / 2) + 1;
				queue.splice(where, 0, updateId);
			} else {
				queue.push(updateId);
			}
			//set variable
			update = updates;
			//update
			self.length++;
		}
		//return update
		return update;
	}

	/**
	 * Retrieve function
	 * @param {dom.render.Queue} self
	 * @returns {Function}
	 */
	function retrieve(self) {
		var update,
			queue = self.queue,
			key = queue[0],
			updateMap = self.updatesMap,
			updates = updateMap[key];
		//pop update
		update = updates.popUpdate();
		//delete
		if (updates.length === 0) {
			//delete
			delete updateMap[key];
			//update
			self.length--;
			//remove from queue
			queue.shift();
		}
		return update;
	}

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
		var update;
		//update retrieve
		update = insert(this, element);
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
		var update;
		//get first update
		update = retrieve(this);
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
