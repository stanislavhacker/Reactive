/**
 * Element in Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.html = dom.html || {};

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
		/** @type {dom.builder.LiveText}*/
		this.reactor = null;
		/** @type {dom.render.Update}*/
		this.updates = new dom.render.Update();

		/** @type {boolean}*/
		this.rendered = false;

		//register change
		this.text.addChangeEvent(this, this.setText);
	};
	dom.utils.inherit(dom.html.TextElement, dom.html.Element);

	/**
	 * @public
	 * @param elements
	 */
	dom.html.TextElement.prototype.attach = function (elements) {
	};

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
		return text !== null && text !== undefined ? text.toString() : null;
	};

	/**
	 * @protected
	 * Set attribute
	 * @type {string} name
	 * @type {string} value
	 */
	dom.html.TextElement.prototype.setAttribute = function (name, value) {
	};

	/**
	 * @protected
	 * Set css property
	 * @type {string} name
	 * @type {string} value
	 */
	dom.html.TextElement.prototype.setCssProperty = function (name, value) {
	};

	/**
	 * @protected
	 * Set class name
	 * @type {Array.<string>} value
	 */
	dom.html.TextElement.prototype.setClassName = function (value) {
	};

	//noinspection JSUnusedLocalSymbols
	/**
	 * @public
	 * Get live dom
	 * @returns {HTMLElement}
	 */
	dom.html.TextElement.prototype.getLive = function (parent) {
		var element = this.element;
		//create new element
		if (element === null) {
			//create reactor
			this.reactor = new dom.builder.LiveText(this);
			this.reactor.getLive();
			//load element
			element = this.element;
		}
		//return element
		return /** @type {HTMLElement}*/element;
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
	 * @public
	 * Set text
	 */
	dom.html.TextElement.prototype.setText = function () {
		var self = this,
			element = this.element;
		//set attribute on dom element
		if (element) {
			dom.html.RENDERER.render(this, "nodeValue", function () {
				element.nodeValue = self.getValue() || "";
			});
		}
	};

}(dom, document, window));
