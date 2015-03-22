/*global dom*/
/**
 * Css property in shadow dom
 */
(function () {
	"use strict";

	/**
	 * Css property
	 * @param {dom.sheets.CssPropertyType|string} name
	 * @param {string|dom.data.Contract} value
	 * @extends {dom.Element}
	 * @constructor
	 */
	dom.sheets.CssProperty = function (name, value) {
		/** @type {dom.sheets.CssPropertyType|string}*/
		this.name = name;
		/** @type {string}*/
		this.jsName = dom.sheets.CssProperty.createJsName(name);
		/** @type {dom.data.Contract}*/
		this.value = value instanceof dom.data.Contract ? value : new dom.data.UnboundContract(value);
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();

		//register change
		this.value.addChangeEvent(this, this.onCssChange);
	};
	dom.utils.inherit(dom.sheets.CssProperty, dom.Element);

	/**
	 * @public
	 * Get name
	 * @returns {dom.sheets.CssPropertyType|string}
	 */
	dom.sheets.CssProperty.prototype.getName = function () {
		return this.name;
	};

	/**
	 * @public
	 * Get name for js creation
	 * @returns {string}
	 */
	dom.sheets.CssProperty.prototype.getJsName = function () {
		return this.jsName;
	};

	/**
	 * @public
	 * Return value contract
	 * @returns {string}
	 */
	dom.sheets.CssProperty.prototype.getValue = function () {
		var value = this.value.getValue();
		return value ? value.toString() : null;
	};

	/**
	 * @public
	 * Is changeable
	 * @returns {boolean}
	 */
	dom.sheets.CssProperty.prototype.isChangeable = function () {
		var unbound = this.value instanceof dom.data.UnboundContract;
		return unbound === false;
	};

	/**
	 * @protected
	 * On attribute change
	 */
	dom.sheets.CssProperty.prototype.onCssChange = function () {
		this.elements.setCssProperty(this);
	};

	/**
	 * @static
	 * @param {string} name
	 * @returns {string}
	 */
	dom.sheets.CssProperty.createJsName = function (name) {
		var delimiter = "-",
			index = name.indexOf(delimiter);

		/**
		 * Replace char at
		 * @param {string} text
		 * @param {number} index
		 * @param {string|null} character
		 * @returns {string}
		 */
		function replaceAt(text, index, character) {
			if (character === null) {
				return text.substr(0, index) + text.substr(index + 1);
			}
			return text.substr(0, index) + character + text.substr(index + character.length);
		}

		while (index >= 0) {
			if (index > 0) {
				name = replaceAt(name, index, null);
				name = replaceAt(name, index, name[index].toUpperCase());
			} else {
				name = replaceAt(name, index, null);
			}
			index = name.indexOf(delimiter);
		}

		return name;
	};

	/**
	 * Css property type
	 * @enum {string}
	 */
	dom.sheets.CssPropertyType = {
		COLOR: "color",
		BORDER: "border",
		BORDER_COLOR: "border-color",
		BORDER_WIDTH: "border-width",
		BORDER_STYLE: "border-style"
	};

}());
