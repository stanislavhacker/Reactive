/**
 * Css rule for reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.sheets = dom.sheets || {};

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
		/** @type {Text}*/
		this.cssElement = null;
		/** @type {dom.html.Element}*/
		this.element = null;
	};

	/**
	 * Get rule name
	 * @returns {string}
	 */
	dom.sheets.CssRule.prototype.getRuleName = function () {
		return this.name;
	};

	/**
	 * Get rule string
	 * @returns {string}
	 */
	dom.sheets.CssRule.prototype.getRuleString = function () {
		return this.name + " {" + this.properties.join(";") + "}\n";
	};

	/**
	 * Check if rule is in dom
	 * @returns {boolean}
	 */
	dom.sheets.CssRule.prototype.isInDom = function () {
		return this.cssElement !== null;
	};


}(dom, document, window));
