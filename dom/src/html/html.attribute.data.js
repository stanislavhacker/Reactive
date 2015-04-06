/**
 * Data attribute in Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.html = dom.html || {};

	/**
	 * Data Attribute
	 * @param {ElementType|string} name
	 * @param {string|dom.data.Contract} value
	 * @extends {dom.html.Attribute}
	 * @constructor
	 */
	dom.html.DataAttribute = function (name, value) {
		/** @type {ElementType|string}*/
		this.name = name;
		/** @type {dom.data.Contract}*/
		this.value = value instanceof dom.data.Contract ? value : new dom.data.UnboundContract(value);
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();

		//register change
		this.value.addChangeEvent(this, this.onAttributeChange);
	};
	dom.utils.inherit(dom.html.DataAttribute, dom.html.Attribute);

	/**
	 * @public
	 * Return name
	 * @returns {ElementType|string}
	 */
	dom.html.DataAttribute.prototype.getName = function () {
		return "data-" + this.name;
	};

}(dom, document, window));
