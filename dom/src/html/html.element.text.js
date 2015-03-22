/*global dom*/
/**
 * Element in shadow dom
 */
(function () {
	"use strict";

	/**
	 * Text Element
	 * @param {string|dom.data.Contract} text
	 * @extends {dom.html.Element}
	 * @extends {HTMLElement}
	 * @constructor
	 */
	dom.html.TextElement = function (text) {
		/** @type {dom.data.Contract}*/
		this.text = text instanceof dom.data.Contract ? text : new dom.data.UnboundContract(text);
		/** @type {Text}*/
		this.element = null;
		/** @type {dom.html.Element}*/
		this.parent = null;

		//register change
		this.text.addChangeEvent(this, this.setText);
	};
	dom.utils.inherit(dom.html.TextElement, dom.html.Element);

	/**
	 * @public
	 * Is empty
	 * @returns {boolean}
	 */
	dom.html.TextElement.prototype.isEmpty = function () {
		return true;
	};

	/**
	 * @public
	 * Get value
	 * @returns {string}
	 */
	dom.html.TextElement.prototype.getValue = function () {
		var text = this.text.getValue();
		return text ? text.toString() : null;
	};

	/**
	 * Set attribute
	 * @type {string} name
	 * @type {string} value
	 */
	dom.html.TextElement.prototype.setAttribute = function (name, value) {
	};

	/**
	 * Set css property
	 * @type {string} name
	 * @type {string} value
	 */
	dom.html.TextElement.prototype.setCssProperty = function (name, value) {
	};

	/**
	 * Set class name
	 * @type {Array.<string>} value
	 */
	dom.html.TextElement.prototype.setClassName = function (value) {
	};

	/**
	 * @public
	 * Get live dom
	 * @returns {HTMLElement}
	 */
	dom.html.TextElement.prototype.getLive = function () {
		var element = this.element;
		//create new element
		if (element === null) {
			new dom.builder.LiveText(this).getLive();
			element = this.element;
		}
		//return element
		return element;
	};

	/**
	 * @public
	 * Remove
	 */
	dom.html.TextElement.prototype.remove = function () {
		var parent = this.parent,
			element = this.element;

		//parent
		if (parent) {
			//remove from dom
			if (parent.element && element) {
				parent.element.removeChild(element);
			}
			//remove from children
			this.setParent(null);
		}
		//un-register change
		this.text.removeChangeEvent(this);
	};

	/**
	 * @protected
	 * Set text
	 */
	dom.html.TextElement.prototype.setText = function () {
		var self = this,
			element = this.element;
		//set attribute on dom element
		if (element) {
			dom.html.RENDERER.render(this, function () {
				element.nodeValue = self.text.getValue() || "";
			});
		}
	};

}());
