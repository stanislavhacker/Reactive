/**
 * Base element object in reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	/**
	 * Base element in shadow dom
	 * @constructor
	 */
	dom.Element = function () {
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();
		/** @type {dom.Element}*/
		this.parent = null;
	};

	/**
	 * @protected
	 * Process children
	 * @param {Array.<dom.Element>} elements
	 * @return {Array.<dom.html.Element>}
	 */
	dom.Element.prototype.processChildren = function (elements) {
		var i,
			element,
			children = [];

		for (i = 0; i < elements.length; i++) {
			//load element
			element = /** @type {dom.html.Element} */ elements[i];
			//filter
			if (element instanceof dom.html.Element) {
				element.setParent(this);
				children.push(element);
			}
		}

		return children;
	};

	/**
	 * @protected
	 * Process attributes
	 * @param {Array.<dom.Element>} elements
	 * @return {Object.<string, dom.html.Attribute>}
	 */
	dom.Element.prototype.processAttributes = function (elements) {
		var i,
			attribute,
			attributes = {};

		for (i = 0; i < elements.length; i++) {
			//load attribute
			attribute = elements[i];
			//filter
			if (attribute instanceof dom.html.Attribute) {
				attribute.boundWith(this);
				attributes[attribute.getName()] = attribute;
			}
		}

		return attributes;
	};

	/**
	 * @protected
	 * Process classes
	 * @param {Array.<dom.Element>} elements
	 * @return {Array.<dom.html.Classes>}
	 */
	dom.Element.prototype.processClasses = function (elements) {
		var i,
			clazz,
			classes = [];

		for (i = 0; i < elements.length; i++) {
			//load clazz
			clazz = elements[i];
			//filter
			if (clazz instanceof dom.html.Classes) {
				clazz.boundWith(this);
				classes.push(clazz);
			}
		}

		return classes;
	};

	/**
	 * @protected
	 * Process classes
	 * @param {Array.<dom.Element>} elements
	 * @return {dom.sheets.Css}
	 */
	dom.Element.prototype.processCss = function (elements) {
		var i,
			cssClass,
			css = null;

		for (i = 0; i < elements.length; i++) {
			//load cssClass
			cssClass = elements[i];
			//filter
			if (cssClass instanceof dom.sheets.Css) {
				//check unique
				if (css !== null) {
					throw "Can not set css twice on element.";
				}
				//set css
				cssClass.boundWith(this);
				css = cssClass;
			}
		}

		return css;
	};

	/**
	 * @protected
	 * Process css property
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} elements
	 * @return {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}
	 */
	dom.Element.prototype.processCssProperty = function (elements) {
		var i,
			property,
			cssProperty = [];

		for (i = 0; i < elements.length; i++) {
			//load property
			property = elements[i];
			//push into new array and bound
			property.boundWith(this);
			//add property
			cssProperty.push(property);
		}

		return cssProperty;
	};

	/**
	 * @protected
	 * Process group css property
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} elements
	 * @return {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}
	 */
	dom.Element.prototype.processGroupCssProperty = function (elements) {
		var i,
			property,
			isProperty,
			cssProperty = [];

		for (i = 0; i < elements.length; i++) {
			//load property
			property = elements[i];
			//is property
			isProperty = property instanceof dom.sheets.CssProperty;
			//changeable check
			if (isProperty && property.isChangeable()) {
				throw "You can not set changeable css property into group!";
			}
			//push into new array and bound
			property.boundWith(this);
			//add property
			cssProperty.push(property);
		}

		return cssProperty;
	};

	/**
	 * @protected
	 * Bound with element
	 * @param {dom.Element} element
	 */
	dom.Element.prototype.boundWith = function (element) {
		//insert element
		this.elements.addElement(element);
	};

}(dom, document, window));
