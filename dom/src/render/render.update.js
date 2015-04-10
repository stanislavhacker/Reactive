/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	var identifier = 0;

	dom.render = dom.render || {};

	/**
	 * Render update
	 * @constructor
	 */
	dom.render.Update = function () {
		/** @type {number}*/
		this.id = identifier;
		/** @type {Object.<string, Function>}*/
		this.updates = {};
		/** @type {Array.<string>}*/
		this.queue = [];
		/** @type {number}*/
		this.length = 0;
		//inc
		identifier++;
	};

	/**
	 * Get id
	 * @returns {number}
	 */
	dom.render.Update.prototype.getId = function () {
		return this.id;
	};

	/**
	 * Push update
	 * @param {string} name Function name
	 * @param {Function} what
	 */
	dom.render.Update.prototype.pushUpdate = function (name, what) {
		var isNew = !this.updates[name];
		//push to queue
		if (isNew) {
			this.queue.push(name);
			this.length++;
		}
		//update function
		this.updates[name] = what;
	};

	/**
	 * Pop update
	 * @returns {Function}
	 */
	dom.render.Update.prototype.popUpdate = function () {
		var first = this.queue.shift(),
			fnc = this.updates[first];
		//delete fnc
		delete this.updates[first];
		//update length
		this.length--;
		//return
		return fnc;
	};

	/**
	 * Get all
	 * @returns {Array.<Function>}
	 */
	dom.render.Update.prototype.getAll = function () {
		var name,
			all = [],
			updates = this.updates;
		//for all updates
		for (name in updates) {
			//noinspection JSUnfilteredForInLoop
			all.push(updates[name]);
		}
		//reset
		this.updates = {};
		this.queue = [];
		this.length = 0;
		//return
		return all;
	};



}(dom, document, window));
