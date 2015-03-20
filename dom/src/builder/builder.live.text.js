/*global dom*/
/**
 * Builder for shadow dom
 */
(function () {
	"use strict";

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

}());
