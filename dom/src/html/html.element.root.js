/*global dom*/
/**
 * Element in shadow dom
 */
(function () {
	"use strict";

	/**
	 * Root Element
	 * @param {HTMLElement} parent
	 * @param {Array.<dom.Element>} elements
	 * @extends {dom.html.Element}
	 * @extends {HTMLElement}
	 * @constructor
	 */
	dom.html.RootElement = function (parent, elements) {
		var parentElement = new dom.html.Element(parent.tagName, this);
		//add into structure
		parentElement.element = parent;

		/** @type {dom.html.ElementType}*/
		this.tag = "div";
		/** @type {dom.html.Element}*/
		this.parent = parentElement;
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
		/** @type {dom.sheets.CssRules}*/
		this.cssRules = null;

		//append
		this.append();
	};
	dom.utils.inherit(dom.html.RootElement, dom.html.Element);

	/**
	 * @public
	 * Get live dom
	 * @returns {HTMLElement}
	 */
	dom.html.RootElement.prototype.getLive = function () {
		throw "You can not call this method on RootElement.";
	};

	/**
	 * @public
	 * Remove
	 */
	dom.html.RootElement.prototype.remove = function () {
		throw "You can not call this method on RootElement.";
	};

	/**
	 * @private
	 * Append
	 */
	dom.html.RootElement.prototype.append = function () {
		var element = this.element,
			parent = this.parent.element;
		//create new element
		if (element === null) {
			//create element
			new dom.builder.Live(this).getLive();
			//get element
			element = this.element;
			//append
			parent.appendChild(element);
			//generate css rules
			this.createCssRules();
		}
	};

}());
