/*global dom*/
/**
 * Data contract in shadow dom
 */
(function () {
	"use strict";

	/**
	 * Elements
	 * @extends {HTMLElement}
	 * @constructor
	 */
	dom.html.Elements = function () {
		/** @type {Array.<dom.html.Element|dom.sheets.Css>}*/
		this.elements = [];
	};

	/**
	 * Add element
	 * @param {dom.html.Element|dom.sheets.Css} element
	 */
	dom.html.Elements.prototype.addElement = function (element) {
		var index = this.elements.indexOf(element);
		if (index === -1) {
			this.elements.push(element);
		}
	};

	/**
	 * Remove element
	 * @param {dom.html.Element|dom.sheets.Css} element
	 */
	dom.html.Elements.prototype.removeElement = function (element) {
		var index = this.elements.indexOf(element);
		if (index >= 0) {
			this.elements.splice(index, 1);
		}
	};

	/**
	 * Set attribute
	 * @param {dom.html.Attribute} value
	 */
	dom.html.Elements.prototype.setAttribute = function (value) {
		var i,
			elements = this.elements;

		for (i = 0; i < elements.length; i++) {
			elements[i].setAttribute(value.getName(), value.getValue());
		}
 	};

	/**
	 * Set css property
	 * @param {dom.sheets.CssProperty} value
	 */
	dom.html.Elements.prototype.setCssProperty = function (value) {
		var i,
			element,
			elements = this.elements;

		for (i = 0; i < elements.length; i++) {
			element = elements[i];
			if (element instanceof dom.sheets.Css) {
				element.setCssProperty(value);
			} else {
				element.setCssProperty(value.getName(), value.getValue());
			}
		}
	};

	/**
	 * Set class name
	 * @param {dom.html.Classes} value
	 */
	dom.html.Elements.prototype.setClassName = function (value) {
		var i,
			names = value.getClasses(),
			elements = this.elements;

		for (i = 0; i < elements.length; i++) {
			elements[i].setClassName(names);
		}
	};

}());