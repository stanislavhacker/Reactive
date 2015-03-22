/*global dom*/
/**
 * Css rule for shadow dom
 */
(function () {
	"use strict";

	/**
	 * Css rule
	 * @param {string} name
	 * @param {Array.<string>} properties
	 * @constructor
	 */
	dom.sheets.CssRule = function (name, properties) {
		/** @type {string}*/
		this.name = name;
		/** @type {Array.<string>}*/
		this.properties = properties;
	};

	/**
	 * Get rule string
	 * @returns {string}
	 */
	dom.sheets.CssRule.prototype.getRuleString = function () {
		return this.name + " {" + this.properties.join(";") + "}\n";
	};


}());
