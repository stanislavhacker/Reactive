/**
 * Html element in Reactive
 * @author Stanislav Hacker
 */
(function (dom, document, window) {
	"use strict";

	dom.html = dom.html || {};

	/**
	 * Renderer
	 * @type {dom.render.Renderer}
	 */
	dom.html.RENDERER = new dom.render.Renderer();

	/**
	 * Element
	 * @param {dom.html.ElementType|string} tag
	 * @param {Array.<dom.Element>} elements
	 * @extends {HTMLElement}
	 * @extends {dom.Element}
	 * @constructor
	 */
	dom.html.Element = function (tag, elements) {
		/** @type {dom.html.ElementType|string}*/
		this.tag = tag;
		/** @type {dom.html.Element}*/
		this.parent = null;
		/** @type {Array.<dom.html.Element>}*/
		this.children = [];
		/** @type {Object.<string, dom.html.Attribute>}*/
		this.attributes = [];
		/** @type {Array.<dom.html.Classes>}*/
		this.classNames = [];
		/** @type {dom.sheets.Css}*/
		this.css = null;
		/** @type {dom.render.Update}*/
		this.updates = new dom.render.Update();

		//init
		this.init(elements);

		/** @type {HTMLElement}*/
		this.element = null;
		/** @type {dom.sheets.CssRules}*/
		this.cssRules = null;
		/** @type {dom.builder.Live}*/
		this.reactor = null;

		/** @type {boolean}*/
		this.rendered = false;
	};
	dom.utils.inherit(dom.html.Element, dom.Element);

	/**
	 * @private
	 * @param {Array.<dom.Element>} elements
	 */
	dom.html.Element.prototype.init = function (elements) {
		this.children = this.processChildren(elements);
		this.attributes = this.processAttributes(elements);
		this.classNames = this.processClasses(elements);
		this.css = this.processCss(elements);
	};

	/**
	 * Get updates
	 * @returns {dom.render.Update}
	 */
	dom.html.Element.prototype.getUpdates = function () {
		return this.updates;
	};

	/**
	 * @public
	 * Attach html elements
	 * @param {Array.<dom.html.Element>} elements
	 */
	dom.html.Element.prototype.attach = function (elements) {
		var reactor = this.reactor,
			children = this.processChildren(elements);
		//generate
		this.children = this.children.concat(children);
		//create new element
		if (reactor !== null) {
			reactor.generateChildren();
		}
	};

	/**
	 * @public
	 * Get tag
	 * @returns {dom.html.ElementType}
	 */
	dom.html.Element.prototype.getTag = function () {
		return this.tag;
	};

	/**
	 * @public
	 * Get children
	 * @returns {Array.<dom.html.Element>}
	 */
	dom.html.Element.prototype.getChildren = function () {
		return this.children;
	};

	/**
	 * @public
	 * Get attributes
	 * @returns {Object.<string, dom.html.Attribute>}
	 */
	dom.html.Element.prototype.getAttributes = function () {
		return this.attributes;
	};

	/**
	 * @public
	 * Get class names
	 * @returns {Array.<dom.html.Classes>}
	 */
	dom.html.Element.prototype.getClassNames = function () {
		return this.classNames;
	};

	/**
	 * @public
	 * Get css
	 * @returns {dom.sheets.Css}
	 */
	dom.html.Element.prototype.getCss = function () {
		return this.css || null;
	};

	/**
	 * @public
	 * Is empty
	 * @returns {boolean}
	 */
	dom.html.Element.prototype.isEmpty = function () {
		return this.children.length === 0;
	};

	/**
	 * @public
	 * Get live dom
	 * @param {HTMLElement=} parent
	 * @returns {HTMLElement}
	 */
	dom.html.Element.prototype.getLive = function (parent) {
		var element = this.element;
		//create new element
		if (element === null) {
			//create reactor
			this.reactor = new dom.builder.Live(this, parent);
			this.reactor.getLive();
			//load element
			element = this.element;
		}
		//return element
		return element;
	};

	/**
	 * @public
	 * Get html string
	 * @returns {string}
	 */
	dom.html.Element.prototype.getHtml = function () {
		var node = this.getLive();
		dom.html.RENDERER.forceFor(this);
		return node.outerHTML || node.nodeValue;
	};

	/**
	 * @protected
	 * Create css rules
	 */
	dom.html.Element.prototype.createCssRules = function () {
		var rules = this.cssRules;
		//create new rules
		if (rules === null) {
			new dom.builder.Css(this).getCss();
		}
	};



	/**
	 * @private
	 * Remove element from css
	 * @param {dom.html.Element} element
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} cssProperties
	 */
	function removeElementFromCss(element, cssProperties) {
		var i,
			data;

		for (i = 0; i < cssProperties.length; i++) {
			data = cssProperties[i];
			if (data instanceof dom.sheets.CssGroup) {
				data.elements.removeElement(element);
				removeElementFromCss(element, data.getCss());
			} else {
				data.elements.removeElement(element);
			}
		}
	}

	/**
	 * @public
	 * Remove
	 */
	dom.html.Element.prototype.remove = function () {
		var i,
			name,
			css = this.css,
			parent = this.parent,
			element = this.element,
			children = this.children,
			classNames = this.classNames,
			attributes = this.attributes;

		//remove all children
		for (i = children.length - 1; i >= 0; i--) {
			children[i].remove();
		}
		//remove attr
		for (name in attributes) { // jshint ignore:line
			//noinspection JSUnfilteredForInLoop
			attributes[name].elements.removeElement(this);
		}
		//remove classNames
		for (i = 0; i < classNames.length; i++) {
			classNames[i].elements.removeElement(this);
		}
		//remove css
		if (css) {
			css.elements.removeElement(this);
			removeElementFromCss(this, css.getCss());
		}
		//parent
		if (parent) {
			//remove from dom
			if (parent.element && element) {
				parent.element.removeChild(element);
			}
			//remove from children
			this.setParent(null);
		}
		//no rendered
		this.rendered = false;
	};

	/**
	 * @public
	 * Set attribute
	 * @type {string} name
	 * @type {string} value
	 */
	dom.html.Element.prototype.setAttribute = function (name, value) {
		var element = this.element;
		//set attribute on dom element
		if (element) {
			dom.html.RENDERER.render(this, name, function () {
				element.setAttribute(name, value);
			});
		}
	};

	/**
	 * @public
	 * Set css property
	 * @type {string} name
	 * @type {string} value
	 */
	dom.html.Element.prototype.setCssProperty = function (name, value) {
		var element = this.element;
		//set attribute on dom element
		if (element) {
			dom.html.RENDERER.render(this, name, function () {
				element.style[name] = value;
			});
		}
	};

	/**
	 * @public
	 * Set class name
	 * @type {Array.<string>} value
	 */
	dom.html.Element.prototype.setClassName = function (value) {
		var element = this.element;
		//set attribute on dom element
		if (element) {
			dom.html.RENDERER.render(this, "className", function () {
				element.className = value.join(" ");
			});
		}
	};

	/**
	 * @public
	 * Set parent
	 * @param {dom.Element|dom.html.Element} parent
	 */
	dom.html.Element.prototype.setParent = function (parent) {
		var index,
			current = this.parent;
		//parent exists, change it
		if (current !== null) {
			index = dom.utils.arrayIndex(current.children, parent);
			current.children.splice(index, 1);
		}
		//set new parent
		this.parent = parent;
		this.rendered = parent ? parent.rendered : false;
	};


	/**
	 * Element type
	 * @enum {string}
	 */
	dom.html.ElementType = {
		DIV: "div",
		SPAN: "span",
		A: "a",
		ABBR: "abbr",
		ADDRESS: "address",
		AREA: "area",
		ARTICLE: "article",
		ASIDE: "aside",
		AUDIO: "audio",
		B: "b",
		BASE: "base",
		BLOCKQUOTE: "blockquote",
		BR: "br",
		BUTTON: "button",
		CANVAS: "canvas",
		CAPTION: "caption",
		CITE: "cite",
		CODE: "code",
		EM: "em",
		EMBED: "embed",
		FIELDSET: "fieldset",
		FOOTER: "footer",
		FORM: "form",
		H1: "h1",
		H2: "h2",
		H3: "h3",
		H4: "h4",
		H5: "h5",
		H6: "h6",
		HEADER: "header",
		I: "i",
		IFRAME: "iframe",
		IMG: "img",
		INPUT: "input",
		LABEL: "label",
		LEGEND: "legend",
		LI: "li",
		MAIN: "main",
		MARK: "mark",
		MENU: "menu",
		MENUITEM: "menuitem",
		META: "meta",
		METER: "meter",
		NAV: "nav",
		NOSCRIPT: "noscript",
		OBJECT: "object",
		OL: "ol",
		OPTION: "option",
		P: "p",
		PARAM: "param",
		PRE: "pre",
		Q: "q",
		SECTION: "section",
		SELECT: "select",
		SMALL: "small",
		SOURCE: "source",
		STRONG: "strong",
		SUB: "sub",
		SUMMARY: "summary",
		SUP: "sup",
		TABLE: "table",
		TBODY: "tbody",
		TD: "td",
		TEXTAREA: "textarea",
		TFOOT: "tfoot",
		TH: "th",
		THEAD: "thead",
		TITLE: "title",
		TR: "tr",
		TRACK: "track",
		U: "u",
		UL: "ul",
		VIDEO: "video"
	};

	//export
	window['ElementType'] = dom.html.ElementType;

}(dom, document, window));
