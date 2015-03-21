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
		/** @type {Array.<Function>}*/
		this.stacks = [];
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
	 * @param {Function} what
	 * @constructor
	 */
	dom.render.Renderer.prototype.render = function (what) {
		//propagate immediately in dev mode
		if (dom.IS_DEVELOPMENT) {
			what();

		//evaluate run
		} else {
			this.stacks.push(what);
			this.changed();
		}
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
			if (self.stacks.length !== 0) {
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
			fnc,
			ration,
			length;

		//run functions
		for (i = 0; i < this.MAX_IN_STEP; i++) {
			//get first function
			fnc = this.stacks.shift();
			//fnc
			if (fnc) {
				fnc();
			} else {
				//no function left, its done
				return;
			}
			//length of functions
			length = this.now() - time;
			//check for remaining time
			if (length > this.MAX_TIME) {
				//set new max function count
				this.MAX_IN_STEP = Math.max(i, 1);
				break;
			}
		}
		//length of cycle
		length = this.now() - time;
		//fast rendering, calculate MAX_IN_STEP
		if (this.MAX_IN_STEP === i && length < this.MAX_TIME) {
			ration = length === 0 ? 10 : this.MAX_TIME / length;
			this.MAX_IN_STEP = Math.floor(this.MAX_IN_STEP * ration);
		}
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
