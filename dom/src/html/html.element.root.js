/*global dom*/
/**
 * Element in shadow dom
 */
(function () {
	"use strict";

	/**
	 * Root Element
	 * @param {HTMLElement|dom.html.Element} parent
	 * @param {Array.<dom.Element>} elements
	 * @extends {dom.html.Element}
	 * @extends {HTMLElement}
	 * @constructor
	 */
	dom.html.RootElement = function (parent, elements) {
		/** @type {dom.html.ElementType}*/
		this.tag = "div";
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
		/** @type {dom.sheets.CssRules}*/
		this.cssRules = null;

		//create parent
		this.parent = this.convertToElement(parent);

		//append
		this.append();
	};
	dom.utils.inherit(dom.html.RootElement, dom.html.Element);


	/**
	 * @private
	 * Convert to element
	 * @param {HTMLElement|dom.html.Element} parent
	 * @returns {dom.html.Element}
	 */
	dom.html.RootElement.prototype.convertToElement = function (parent) {
		var domElement = parent,
			isElement = parent instanceof dom.html.Element;
		//create element
		if (!isElement) {
			domElement = new dom.html.Element(parent.tagName, [this]);
			domElement.element = parent;
		}
		//get live
		domElement.getLive();
		//return element
		return domElement;
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
