/*global dom*/
/**
 * Element in shadow dom
 */
(function () {
	"use strict";

	/**
	 * Element
	 * @param {dom.html.ElementType} tag
	 * @param {Array.<dom.Element>} elements
	 * @extends {HTMLElement}
	 * @extends {dom.Element}
	 * @constructor
	 */
	dom.html.Element = function (tag, elements) {
		/** @type {dom.html.ElementType}*/
		this.tag = tag;
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
	dom.utils.inherit(dom.html.Element, dom.Element);

	/**
	 * @public
	 * Get tag
	 * @returns {dom.html.ElementType}
	 */
	dom.html.Element.prototype.getTag = function () {
		return this.tag;
	};

	/**
	 * @public
	 * Get children
	 * @returns {Array.<dom.html.Element>}
	 */
	dom.html.Element.prototype.getChildren = function () {
		return this.children;
	};

	/**
	 * @public
	 * Get attributes
	 * @returns {Object.<string, dom.html.Attribute>}
	 */
	dom.html.Element.prototype.getAttributes = function () {
		return this.attributes;
	};

	/**
	 * @public
	 * Get class names
	 * @returns {Array.<dom.html.Classes>}
	 */
	dom.html.Element.prototype.getClassNames = function () {
		return this.classNames;
	};

	/**
	 * @public
	 * Get css
	 * @returns {dom.sheets.Css}
	 */
	dom.html.Element.prototype.getCss = function () {
		return this.css || null;
	};

	/**
	 * @public
	 * Is empty
	 * @returns {boolean}
	 */
	dom.html.Element.prototype.isEmpty = function () {
		return this.children.length === 0;
	};

	/**
	 * @public
	 * Get live dom
	 * @returns {HTMLElement}
	 */
	dom.html.Element.prototype.getLive = function () {
		var element = this.element;
		//create new element
		if (element === null) {
			new dom.builder.Live(this).getLive();
			element = this.element;
		}
		//return element
		return element;
	};

	/**
	 * @public
	 * Get html string
	 * @returns {string}
	 */
	dom.html.Element.prototype.getHtml = function () {
		var node = this.getLive();
		return node.outerHTML || node.nodeValue;
	};



	/**
	 * @private
	 * Remove element from css
	 * @param {dom.html.Element} element
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} cssProperties
	 */
	function removeElementFromCss(element, cssProperties) {
		var i,
			data;

		for (i = 0; i < cssProperties.length; i++) {
			data = cssProperties[i];
			if (data instanceof dom.sheets.CssGroup) {
				data.elements.removeElement(element);
				removeElementFromCss(element, data.getCss());
			} else {
				data.elements.removeElement(element);
			}
		}
	}

	/**
	 * @dom
	 * @public
	 * Remove
	 */
	dom.html.Element.prototype.remove = function () {
		var i,
			name,
			css = this.css,
			parent = this.parent,
			element = this.element,
			children = this.children,
			classNames = this.classNames,
			attributes = this.attributes;

		//remove all children
		for (i = 0; i < children.length; i++) {
			children[i].remove();
		}
		//remove attr
		for (name in attributes) {
			//noinspection JSUnfilteredForInLoop
			attributes[name].elements.removeElement(this);
		}
		//remove classNames
		for (i = 0; i < classNames.length; i++) {
			classNames[i].elements.removeElement(this);
		}
		//remove css
		if (css) {
			css.elements.removeElement(this);
			removeElementFromCss(this, css.getCss());
		}
		//parent
		if (parent) {
			//remove from dom
			if (parent.element && element) {
				parent.element.removeChild(element);
			}
			//remove from children
			this.setParent(null);
		}
	};

	/**
	 * @dom
	 * Set attribute
	 * @type {string} name
	 * @type {string} value
	 */
	dom.html.Element.prototype.setAttribute = function (name, value) {
		var element = this.element;
		//set attribute on dom element
		if (element) {
			element.setAttribute(name, value);
		}
	};

	/**
	 * @dom
	 * Set css property
	 * @type {string} name
	 * @type {string} value
	 */
	dom.html.Element.prototype.setCssProperty = function (name, value) {
		var element = this.element;
		//set attribute on dom element
		if (element) {
			element.style[name] = value;
		}
	};

	/**
	 * @dom
	 * Set class name
	 * @type {Array.<string>} value
	 */
	dom.html.Element.prototype.setClassName = function (value) {
		var element = this.element;
		//set attribute on dom element
		if (element) {
			element.className = value.join(" ");
		}
	};

	/**
	 * @protected
	 * Set parent
	 * @param {dom.Element} parent
	 */
	dom.html.Element.prototype.setParent = function (parent) {
		var index,
			current = this.parent;
		//parent exists, change it
		if (current !== null) {
			index = current.children.indexOf(parent);
			current.children.splice(index, 1);
		}
		//set new parent
		this.parent = parent;
	};


	/**
	 * Element type
	 * @enum {string}
	 */
	dom.html.ElementType = {
		DIV: "div",
		SPAN: "span"
	}

}());
