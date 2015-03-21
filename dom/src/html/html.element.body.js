/*global dom*/
/**
 * Element in shadow dom
 */
(function () {
	"use strict";

	/**
	 * Body Element
	 * @param {Array.<dom.Element>} elements
	 * @extends {dom.html.Element}
	 * @extends {HTMLElement}
	 * @constructor
	 */
	dom.html.BodyElement = function (elements) {
		/** @type {dom.html.ElementType}*/
		this.tag = "body";
		/** @type {dom.html.Element}*/
		this.parent = null;
		/** @type {Array.<dom.html.Element>}*/
		this.children = this.processChildren(elements);
		/** @type {Object.<string, dom.html.Attribute>}*/
		this.attributes = this.processAttributes(elements);
		/** @type {Array.<dom.html.Classes>}*/
		this.classNames = this.processClasses(elements);
		/** @type {dom.sheets.Css}*/
		this.css = this.processCss(elements);
		/** @type {HTMLElement}*/
		this.element = null;
	};
	dom.utils.inherit(dom.html.BodyElement, dom.html.Element);

	/**
	 * @public
	 * Get live dom
	 * @returns {HTMLElement}
	 */
	dom.html.BodyElement.prototype.getLive = function () {
		var element = this.element;
		//create new element
		if (element === null) {
			new dom.builder.LiveBody(this).getLive();
			element = this.element;
		}
		//return element
		return element;
	};

	/**
	 * @dom
	 * @public
	 * Remove
	 */
	dom.html.BodyElement.prototype.remove = function () {
		throw "You can not remove body element from DOM :)";
	};

}());
