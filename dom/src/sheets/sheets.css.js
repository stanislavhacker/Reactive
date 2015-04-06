/**
 * Css in shadow dom in reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.sheets = dom.sheets || {};

	/**
	 * Css
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} css
	 * @extends {dom.Element}
	 * @constructor
	 */
	dom.sheets.Css = function (css) {
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();
		/** @type {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}*/
		this.css = this.processCssProperty(css);
	};
	dom.utils.inherit(dom.sheets.Css, dom.Element);

	/**
	 * @public
	 * Set css property
	 * @param {dom.sheets.CssProperty|dom.sheets.CssGroup} value
	 */
	dom.sheets.Css.prototype.setCssProperty = function (value) {
		this.elements.setCssProperty(value);
	};

	/**
	 * @public
	 * Get css
	 * @returns {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}
	 */
	dom.sheets.Css.prototype.getCss = function () {
		return this.css;
	};

}(dom, document, window));
