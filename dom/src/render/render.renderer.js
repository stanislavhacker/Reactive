/*global dom*/
/**
 * Builder for shadow dom
 */
(function () {
	"use strict";

	/**
	 * Renderer
	 * @constructor
	 */
	dom.render.Renderer = function () {
		/** @type {dom.render.Queue}*/
		this.queue = new dom.render.Queue();
		/** @type {null}*/
		this.timer = null;
		/** @type {number}*/
		this.MAX_IN_STEP = 10; //count
		/** @type {number}*/
		this.MAX_TIME = 50; //ms
	};

	/**
	 * @protected
	 * Renderer
	 * @param {dom.html.Element} element
	 * @param {Function} what
	 */
	dom.render.Renderer.prototype.render = function (element, what) {
		this.queue.add(element, what);
		this.changed();
	};

	/**
	 * @protected
	 * Force render for
	 * @param {dom.html.Element} element
	 */
	dom.render.Renderer.prototype.forceFor = function (element) {
		//stop timer
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
		//get all functions
		var i,
			functions = this.queue.getFor(element);
		//force run all
		for (i = 0; i < functions.length; i++) {
			functions[i]();
		}
		//run timer if its necessary
		this.changed();
	};

	/**
	 * @private
	 * Changed
	 */
	dom.render.Renderer.prototype.changed = function () {
		var timer = this.timer;
		//timer not running
		if (timer === null) {
			//create new timer
			this.spawnTimer();
		}
	};

	/**
	 * @private
	 * Spawn timer
	 */
	dom.render.Renderer.prototype.spawnTimer = function () {
		var time,
			self = this;

		//create new timer
		this.timer = setTimeout(function () {
			//get start time
			time = self.now();
			//run cycle
			self.cycle(time);
			//clear timer
			self.timer = null;
			//run int again if not complete all
			if (self.queue.count() !== 0) {
				self.changed();
			}
		}, 30);
	};

	/**
	 * @private
	 * Run one cycle
	 * @param {number} time
	 */
	dom.render.Renderer.prototype.cycle = function (time) {
		var i,
			fnc;

		//run functions
		for (i = 0; i < this.MAX_IN_STEP; i++) {
			//get first function
			fnc = this.queue.get();
			//fnc
			if (fnc) {
				fnc();
			} else {
				//no function left, its done
				return;
			}
			//check exceeded
			if (this.recalculate(time, i)) {
				//function exceeded given time
				return;
			}
		}
		//recalculate on end
		this.recalculate(time, i);
	};

	/**
	 * @private
	 * Recalculate
	 * @param {number} time
	 * @param {number} i
	 * @return {boolean} exceeded
	 */
	dom.render.Renderer.prototype.recalculate = function (time, i) {
		var ration,
			length;
		//length of cycle
		length = this.now() - time;
		//check for remaining time
		if (length > this.MAX_TIME) {
			//set new max function count
			this.MAX_IN_STEP = Math.max(i, 1);
			return true;
		}
		//fast rendering, calculate MAX_IN_STEP
		if (this.MAX_IN_STEP === i && length < this.MAX_TIME) {
			ration = length === 0 ? 10 : this.MAX_TIME / length;
			this.MAX_IN_STEP = Math.floor(this.MAX_IN_STEP * ration);
		}
		return false;
	};

	/**
	 * @private
	 * Now
	 * @returns {number}
	 */
	dom.render.Renderer.prototype.now = function () {
		return new Date().getTime();
	};

}());
