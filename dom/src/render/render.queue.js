/*global dom*/
/**
 * Builder for shadow dom
 */
(function () {
	"use strict";

	/**
	 * Render queue
	 * @constructor
	 */
	dom.render.Queue = function () {
		/** @type {Array.<Array.<Function>>}*/
		this.stacks = [];
		/** @type {Array.<dom.html.Element>}*/
		this.elements = [];
	};

	/**
	 * @protected
	 * Add into queue
	 * @param {dom.html.Element} element
	 * @param {Function} what
	 */
	dom.render.Queue.prototype.add = function (element, what) {
		var array,
			index = this.elements.indexOf(element);

		//element is not in array
		if (index === -1) {
			index = this.elements.length;
			this.elements.push(element);
		}
		//array
		array = this.stacks[index];
		if (!array) {
			array = [];
			this.stacks[index] = array;
		}
		array.push(what);
	};

	/**
	 * Get function from queue
	 * @returns {Function}
	 */
	dom.render.Queue.prototype.get = function () {
		var fnc,
			elements = this.elements,
			stacks = this.stacks;
		//nothing exists in queue
		if (stacks.length === 0) {
			return null;
		}
		//get function
		fnc = stacks[0].shift();
		//remove from stack
		if (stacks[0].length === 0) {
			stacks.shift();
			elements.shift();
		}
		//return function
		return fnc;
	};

	/**
	 * Get functions from queue
	 * @param {dom.html.Element} element
	 * @returns {Array.<Function>}
	 */
	dom.render.Queue.prototype.getFor = function (element) {
		var i,
			array = [],
			elements = this.elements,
			stacks = this.stacks,
			children = element.getChildren(),
			index = elements.indexOf(element);

		//force for all children
		if (!element.isEmpty() && children.length) {
			for (i = 0; i < children.length; i++) {
				array = array.concat(this.getFor(children[i]));
			}
		}

		//no element found
		if (index === -1) {
			return array;
		}
		//get functions
		array = array.concat(stacks[index]);
		//remove
		elements.splice(index, 1);
		stacks.splice(index, 1);
		//return functions
		return array;
	};

	/**
	 * @protected
	 * Count
	 * @return {number}
	 */
	dom.render.Queue.prototype.count = function () {
		return this.stacks.length
	};



}());
