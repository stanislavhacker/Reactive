/**
 * Attribute in Reactive
 * @author Stanislav Hacker
 */
(function (dom, document, window) {
	"use strict";

	dom.html = dom.html || {};

	/**
	 * Attribute
	 * @param {ElementType|string} name
	 * @param {string|dom.data.Contract} value
	 * @extends {dom.Element}
	 * @constructor
	 */
	dom.html.Attribute = function (name, value) {
		/** @type {ElementType|string}*/
		this.name = name.toLowerCase();
		/** @type {dom.data.Contract}*/
		this.value = value instanceof dom.data.Contract ? value : new dom.data.UnboundContract(value);
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();

		//register change
		this.value.addChangeEvent(this, this.onAttributeChange);
	};
	dom.utils.inherit(dom.html.Attribute, dom.Element);

	/**
	 * @public
	 * Return name
	 * @returns {ElementType|string}
	 */
	dom.html.Attribute.prototype.getName = function () {
		return this.name;
	};

	/**
	 * @public
	 * Return value contract
	 * @returns {string}
	 */
	dom.html.Attribute.prototype.getValue = function () {
		var value = this.value.getValue();
		return value ? value.toString() : null;
	};

	/**
	 * @public
	 * Is changeable
	 * @returns {boolean}
	 */
	dom.html.Attribute.prototype.isChangeable = function () {
		var unbound = this.value instanceof dom.data.UnboundContract;
		return unbound === false;
	};

	/**
	 * @protected
	 * On attribute change
	 */
	dom.html.Attribute.prototype.onAttributeChange = function () {
		this.elements.setAttribute(this);
	};


	/**
	 * Attribute type
	 * @enum {string}
	 */
	dom.html.AttributeType = {
		ID: "id",
		VALUE: "value",
		ACCESSKEY: "accesskey",
		ACTION: "action",
		ALINK: "alink",
		ALT: "alt",
		CHECKED: "checked",
		CITE: "cite",
		COLS: "cols",
		COLSPAN: "colspan",
		DISABLED: "disabled",
		HREF: "href",
		FOR: "for",
		LANG: "lang",
		MEDIA: "media",
		METHOD: "method",
		NAME: "name",
		READONLY: "readonly",
		REL: "rel",
		ROWS: "rows",
		ROWSPAN: "rowspan",
		SRC: "src",
		TABINDEX: "tabindex",
		TARGET: "target",
		TITLE: "title",
		TYPE: "type"
	};

	//export
	window['AttributeType'] = dom.html.AttributeType;

}(dom, document, window));
