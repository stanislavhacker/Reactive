/*global dom*/
/**
 * Builder for shadow dom
 */
(function () {
	"use strict";

	/**
	 * Live body
	 * @param {dom.html.Element} element
	 * @extends {dom.builder.Live}
	 * @constructor
	 */
	dom.builder.LiveBody = function (element) {
		/** @type {dom.html.Element}*/
		this.element = element;
	};
	dom.utils.inherit(dom.builder.LiveBody, dom.builder.Live);

	/**
	 * @private
	 * Generate element
	 */
	dom.builder.LiveBody.prototype.generateElement = function () {
		var element = this.element;
		//create element
		element.element = document.body || document.createElement("body");
		//add to page
		document.body = element.element;
	};

}());
