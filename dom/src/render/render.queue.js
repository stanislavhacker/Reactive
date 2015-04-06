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
		/** @type {Array.<Array.<Function>>}*/
		this.stacks = [];
		/** @type {Array.<Array.<string>>}*/
		this.names = [];
		/** @type {Array.<dom.html.Element>}*/
		this.elements = [];
	};

	/**
	 * Add into queue
	 * @param {dom.html.Element} element
	 * @param {string} name Function name
	 * @param {Function} what
	 */
	dom.render.Queue.prototype.add = function (element, name, what) {
		var i,
			namesArray,
			stackArray,
			elements = this.elements;
		//insert of not exists
		i = dom.utils.arrayInsert(elements, element);
		//stack and names
		stackArray = this.stacks[i];
		namesArray = this.names[i];
		if (!stackArray) {
			//stack array
			stackArray = [];
			this.stacks[i] = stackArray;
			//names array
			namesArray = [];
			this.names[i] = namesArray;
		}
		//insert of not exists
		i = dom.utils.arrayInsert(namesArray, name);
		//push
		namesArray[i] = name;
		stackArray[i] = what;
	};

	/**
	 * Get function from queue
	 * @returns {Function}
	 */
	dom.render.Queue.prototype.get = function () {
		var fnc,
			elements = this.elements,
			names = this.names,
			stacks = this.stacks;
		//nothing exists in queue
		if (stacks.length === 0) {
			return null;
		}
		//get function, shift name
		names[0].shift();
		fnc = stacks[0].shift();
		//remove from stack
		if (stacks[0].length === 0) {
			stacks.shift();
			names.shift();
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
			index,
			array = [],
			names = this.names,
			stacks = this.stacks,
			elements = this.elements,
			children = element.getChildren();

		//get array index
		index = dom.utils.arrayIndex(elements, element);
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
		names.splice(index, 1);
		//return functions
		return array;
	};

	/**
	 * Count
	 * @return {number}
	 */
	dom.render.Queue.prototype.count = function () {
		return this.stacks.length;
	};



}(dom, document, window));
