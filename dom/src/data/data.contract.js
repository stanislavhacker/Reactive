/*global dom*/
/**
 * Data contract in shadow dom
 */
(function () {
	"use strict";

	/**
	 * Data contract
	 * @param {string} initialValue
	 * @constructor
	 */
	dom.data.Contract = function (initialValue) {
		/** @type {object}*/
		this.value = initialValue;
		/** @type {Array.<function>}*/
		this.changeEvents = [];
		/** @type {Array.<object>}*/
		this.callers = [];
	};

	/**
	 * @public
	 * Get value
	 * @returns {object}
	 */
	dom.data.Contract.prototype.getValue = function () {
		return this.value;
	};

	/**
	 * @public
	 * Set value
	 * @param {object} value
	 */
	dom.data.Contract.prototype.setValue = function (value) {
		var events = this.changeEvents,
			callers = this.callers,
			i;

		//set new value
		this.value = value;
		//inform all
		for (i = 0; i < events.length; i++) {
			events[i].apply(callers[i]);
		}
	};

	/**
	 * @protected
	 * @param {object} caller
	 * @param {function} event
	 */
	dom.data.Contract.prototype.addChangeEvent = function (caller, event) {
		var index = dom.utils.arrayIndex(this.callers, caller);
		//inset if not exists
		if (index === -1) {
			this.callers.push(caller);
			this.changeEvents.push(event);
		}
	};

	/**
	 * @protected
	 * @param {object} caller
	 */
	dom.data.Contract.prototype.removeChangeEvent = function (caller) {
		var index = dom.utils.arrayIndex(this.callers, caller);
		//remove if not exists
		if (index >= 0) {
			this.callers.splice(index, 1);
			this.changeEvents.splice(index, 1);
		}
	};

}());
