/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.builder = dom.builder || {};

	/**
	 * Live
	 * @param {dom.html.Element} element
	 * @extends {dom.builder.Live}
	 * @constructor
	 */
	dom.builder.LiveText = function (element) {
		/** @type {dom.html.Element}*/
		this.element = element;
	};
	dom.utils.inherit(dom.builder.LiveText, dom.builder.Live);

	/**
	 * Get live dom element
	 * @returns {HTMLElement}
	 */
	dom.builder.LiveText.prototype.getLive = function () {
		//generate content for text element
		this.generateTextContent();
	};

	/**
	 * @private
	 * Generate text content
	 */
	dom.builder.LiveText.prototype.generateTextContent = function () {
		var element = /** @type {dom.html.TextElement}*/  this.element;
		//create element
		element.element = document.createTextNode("");
		//set text value
		if (element.getValue() !== null) {
			element.setText();
		}
	};

	/**
	 * @public
	 * Set attribute
	 * @param {AttributeType|string} name
	 * @param {string} value
	 */
	dom.builder.LiveText.prototype.setAttribute = function (name, value) {
	};


	/**
	 * @public
	 * Set css property
	 * @type {string} name
	 * @type {string} value
	 */
	dom.builder.LiveText.prototype.setCssProperty = function (name, value) {
	};

	/**
	 * @public
	 * Set class name
	 * @type {Array.<string>} value
	 */
	dom.builder.LiveText.prototype.setClassName = function (value) {
	};

}(dom, document, window));
