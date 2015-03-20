/*global dom*/
/**
 * Css group in shadow dom
 */
(function () {
	"use strict";

	/**
	 * Css property
	 * @param {string} name
	 * @param {Array.<dom.sheets.CssProperty>} elements
	 * @extends {dom.Element}
	 * @constructor
	 */
	dom.sheets.CssGroup = function (name, elements) {
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();
		/** @type {string}*/
		this.name = name;
		/** @type {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}*/
		this.css = this.processGroupCssProperty(elements);
	};
	dom.utils.inherit(dom.sheets.CssGroup, dom.Element);

	/**
	 * @public
	 * Get name
	 * @returns {string}
	 */
	dom.sheets.CssGroup.prototype.getName = function () {
		return this.name;
	};

	/**
	 * @public
	 * Get css
	 * @returns {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}
	 */
	dom.sheets.CssGroup.prototype.getCss = function () {
		return this.css;
	};

}());
