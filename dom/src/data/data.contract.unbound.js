/*global dom*/
/**
 * Data contract in shadow dom
 */
(function () {
	"use strict";

	/**
	 * @public
	 * Data contract unbound
	 * @param {string} initialValue
	 * @extends {dom.data.Contract}
	 * @constructor
	 */
	dom.data.UnboundContract = function (initialValue) {
		/** @type {object}*/
		this.value = initialValue;
		/** @type {Array.<function>}*/
		this.changeEvents = [];
		/** @type {Array.<object>}*/
		this.callers = [];
	};
	dom.utils.inherit(dom.data.UnboundContract, dom.data.Contract);


	/**
	 * @protected
	 * @param {object} caller
	 * @param {function} event
	 */
	dom.data.UnboundContract.prototype.addChangeEvent = function (caller, event) {
	};

	/**
	 * @protected
	 * @param {object} caller
	 */
	dom.data.UnboundContract.prototype.removeChangeEvent = function (caller) {
	};

}());
