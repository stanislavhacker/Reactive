var dom = {};
/**
 * Base shadow dom definition
 *
 *
 *  @dom - working directly with dom elements
 *
 */
(function () {
	"use strict";

	//namespaces
	dom.utils = {};
	dom.sheets = {};
	dom.html = {};
	dom.data = {};
	dom.builder = {};

	/**
	 * HTML functions
	 */
	(function () {

		/**
		 * @static
		 * Create div
		 * @param {dom.Element...=} params
		 * @returns {dom.html.Element}
		 */
		dom.div = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.DIV, args);
		};

		/**
		 * @static
		 * Create span
		 * @param {dom.Element...=} params
		 * @returns {dom.html.Element}
		 */
		dom.span = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.SPAN, args);
		};




		/**
		 * @static
		 * Create text element
		 * @param {string|dom.data.Contract} text
		 * @returns {dom.html.TextElement}
		 */
		dom.text = function (text) {
			return new dom.html.TextElement(text);
		};




		/**
		 * @static
		 * Create attribute
		 * @param {dom.html.ElementType|string} name
		 * @param {string|dom.data.Contract} value
		 * @returns {dom.html.Attribute}
		 */
		dom.attr = function (name, value) {
			return new dom.html.Attribute(name, value);
		};

		/**
		 * @static
		 * Create data attribute
		 * @param {dom.html.ElementType|string} name
		 * @param {string|dom.data.Contract} value
		 * @returns {dom.html.Attribute}
		 */
		dom.dataAttr = function (name, value) {
			return new dom.html.DataAttribute(name, value);
		};



		/**
		 * @static
		 * Create classes
		 * @param {string|dom.data.Contract...} params
		 * @returns {dom.html.Classes}
		 */
		dom.classes = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Classes(args);
		};

	}());

	/**
	 * CSS functions
	 */
	(function () {

		/**
		 * @static
		 * Css
		 * @param {dom.sheets.CssProperty|dom.sheets.CssGroup...} params
		 * @returns {dom.sheets.Css}
		 */
		dom.css = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.sheets.Css(args);
		};

		/**
		 * @static
		 * Css property
		 * @param {dom.sheets.CssPropertyType|string} name
		 * @param {string|dom.data.Contract} value
		 * @returns {dom.sheets.CssProperty}
		 */
		dom.cssProperty = function (name, value) {
			return new dom.sheets.CssProperty(name, value);
		};

		/**
		 * @static
		 * Css group
		 * @param {string} name
		 * @param {dom.sheets.CssProperty|dom.sheets.CssGroup...} params
		 * @returns {dom.sheets.CssGroup}
		 */
		dom.cssGroup = function (name, params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.sheets.CssGroup(name, args.slice(1));
		};

	}());

	/**
	 * DATA functions
	 */
	(function () {

		/**
		 * @static
		 * Contract
		 * @param {string} value
		 * @returns {dom.data.Contract}
		 */
		dom.contract = function (value) {
			return new dom.data.Contract(value);
		};

	}());

}());
