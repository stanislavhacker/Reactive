/**
 * Reactive base module
 * @author Stanislav Hacker
 * @type {object}
 */
var dom = (function() {
	"use strict";

	/**
	 * @private
	 * Convert to element
	 * @param {HTMLElement|dom.html.Element} parent
	 * @param {Array.<dom.html.Element>} children
	 * @returns {dom.html.Element}
	 */
	function convertToElement (parent, children) {
		var domElement;
		//if its element, attach element into given element
		if (parent instanceof dom.html.Element) {
			//only pass element
			domElement = parent;
			//attach
			domElement.attach(children);
		} else {
			//create element
			domElement = new dom.html.Element(parent.tagName, children);
		}
		//get live
		domElement.getLive(parent);
		//generate css rules
		domElement.createCssRules();
		//return element
		return domElement;
	}

	//return interface methods
	return {

		//ATTACH functions

		/**
		 * @static
		 * Attach on element
		 * @param {HTMLElement|dom.html.Element} parent
		 * @param {...dom.html.Element=} params
		 * @return {dom.html.Element}
		 */
		attach: function (parent, params) {
			var args = Array.prototype.slice.apply(arguments);
			//create root element and run it!
			return convertToElement(parent, args.slice(1));
		},

		//HTML functions

		/**
		 * @static
		 * Create div
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		div: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.DIV, args);
		},

		/**
		 * @static
		 * Create span
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		span: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.SPAN, args);
		},

		/**
		 * @static
		 * Create a
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		a: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.A, args);
		},

		/**
		 * @static
		 * Create abbr
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		abbr: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.ABBR, args);
		},

		/**
		 * @static
		 * Create address
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		address: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.ADDRESS, args);
		},

		/**
		 * @static
		 * Create area
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		area: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.AREA, args);
		},

		/**
		 * @static
		 * Create article
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		article: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.ARTICLE, args);
		},

		/**
		 * @static
		 * Create aside
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		aside: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.ASIDE, args);
		},

		/**
		 * @static
		 * Create audio
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		audio: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.AUDIO, args);
		},

		/**
		 * @static
		 * Create b
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		b: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.B, args);
		},

		/**
		 * @static
		 * Create base
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		base: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.BASE, args);
		},

		/**
		 * @static
		 * Create blockquote
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		blockquote: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.BLOCKQUOTE, args);
		},

		/**
		 * @static
		 * Create br
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		br: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.BR, args);
		},

		/**
		 * @static
		 * Create button
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		button: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.BUTTON, args);
		},

		/**
		 * @static
		 * Create canvas
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		canvas: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.CANVAS, args);
		},

		/**
		 * @static
		 * Create caption
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		caption: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.CAPTION, args);
		},

		/**
		 * @static
		 * Create cite
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		cite: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.CITE, args);
		},

		/**
		 * @static
		 * Create code
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		code: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.CODE, args);
		},

		/**
		 * @static
		 * Create em
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		em: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.EM, args);
		},

		/**
		 * @static
		 * Create embed
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		embed: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.EMBED, args);
		},

		/**
		 * @static
		 * Create fieldset
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		fieldset: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.FIELDSET, args);
		},

		/**
		 * @static
		 * Create footer
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		footer: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.FOOTER, args);
		},

		/**
		 * @static
		 * Create form
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		form: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.FORM, args);
		},

		/**
		 * @static
		 * Create h1
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		h1: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.H1, args);
		},

		/**
		 * @static
		 * Create h2
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		h2: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.H2, args);
		},

		/**
		 * @static
		 * Create h3
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		h3: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.H3, args);
		},

		/**
		 * @static
		 * Create h4
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		h4: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.H4, args);
		},

		/**
		 * @static
		 * Create h5
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		h5: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.H5, args);
		},

		/**
		 * @static
		 * Create h6
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		h6: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.H6, args);
		},

		/**
		 * @static
		 * Create header
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		header: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.HEADER, args);
		},

		/**
		 * @static
		 * Create i
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		i: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.I, args);
		},

		/**
		 * @static
		 * Create iframe
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		iframe: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.IFRAME, args);
		},

		/**
		 * @static
		 * Create img
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		img: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.IMG, args);
		},

		/**
		 * @static
		 * Create input
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		input: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.INPUT, args);
		},

		/**
		 * @static
		 * Create label
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		label: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.LABEL, args);
		},

		/**
		 * @static
		 * Create legend
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		legend: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.LEGEND, args);
		},

		/**
		 * @static
		 * Create li
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		li: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.LI, args);
		},

		/**
		 * @static
		 * Create main
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		main: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.MAIN, args);
		},

		/**
		 * @static
		 * Create mark
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		mark: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.MARK, args);
		},

		/**
		 * @static
		 * Create menu
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		menu: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.MENU, args);
		},

		/**
		 * @static
		 * Create menuitem
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		menuitem: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.MENUITEM, args);
		},

		/**
		 * @static
		 * Create meta
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		meta: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.META, args);
		},

		/**
		 * @static
		 * Create meter
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		meter: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.METER, args);
		},

		/**
		 * @static
		 * Create nav
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		nav: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.NAV, args);
		},

		/**
		 * @static
		 * Create noscript
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		noscript: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.NOSCRIPT, args);
		},

		/**
		 * @static
		 * Create object
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		object: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.OBJECT, args);
		},

		/**
		 * @static
		 * Create ol
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		ol: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.OL, args);
		},

		/**
		 * @static
		 * Create option
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		option: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.OPTION, args);
		},

		/**
		 * @static
		 * Create p
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		p: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.P, args);
		},

		/**
		 * @static
		 * Create param
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		param: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.PARAM, args);
		},

		/**
		 * @static
		 * Create pre
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		pre: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.PRE, args);
		},

		/**
		 * @static
		 * Create q
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		q: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.Q, args);
		},

		/**
		 * @static
		 * Create section
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		section: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.SECTION, args);
		},

		/**
		 * @static
		 * Create select
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		select: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.SELECT, args);
		},

		/**
		 * @static
		 * Create small
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		small: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.SMALL, args);
		},

		/**
		 * @static
		 * Create source
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		source: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.SOURCE, args);
		},

		/**
		 * @static
		 * Create strong
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		strong: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.STRONG, args);
		},

		/**
		 * @static
		 * Create sub
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		sub: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.SUB, args);
		},

		/**
		 * @static
		 * Create summary
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		summary: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.SUMMARY, args);
		},

		/**
		 * @static
		 * Create sup
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		sup: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.SUP, args);
		},

		/**
		 * @static
		 * Create table
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		table: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.TABLE, args);
		},

		/**
		 * @static
		 * Create tbody
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		tbody: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.TBODY, args);
		},

		/**
		 * @static
		 * Create td
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		td: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.TD, args);
		},

		/**
		 * @static
		 * Create textarea
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		textarea: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.TEXTAREA, args);
		},

		/**
		 * @static
		 * Create tfoot
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		tfoot: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.TFOOT, args);
		},

		/**
		 * @static
		 * Create th
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		th: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.TH, args);
		},

		/**
		 * @static
		 * Create thead
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		thead: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.THEAD, args);
		},

		/**
		 * @static
		 * Create title
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		title: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.TITLE, args);
		},

		/**
		 * @static
		 * Create tr
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		tr: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.TR, args);
		},

		/**
		 * @static
		 * Create track
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		track: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.TRACK, args);
		},

		/**
		 * @static
		 * Create u
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		u: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.U, args);
		},

		/**
		 * @static
		 * Create ul
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		ul: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.UL, args);
		},

		/**
		 * @static
		 * Create video
		 * @param {...namespace.Element=} params
		 * @returns {dom.html.Element}
		 */
		video: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(ElementType.VIDEO, args);
		},





		/**
		 * @static
		 * Create text element
		 * @param {string|dom.data.Contract} text
		 * @returns {dom.html.TextElement}
		 */
		text: function (text) {
			return new dom.html.TextElement(text);
		},




		/**
		 * @static
		 * Create attribute
		 * @param {AttributeType|string} name
		 * @param {string|dom.data.Contract} value
		 * @returns {dom.html.Attribute}
		 */
		attr: function (name, value) {
			return new dom.html.Attribute(name, value);
		},

		/**
		 * @static
		 * Create data attribute
		 * @param {ElementType|string} name
		 * @param {string|dom.data.Contract} value
		 * @returns {dom.html.Attribute}
		 */
		dataAttr: function (name, value) {
			return new dom.html.DataAttribute(name, value);
		},



		/**
		 * @static
		 * Create classes
		 * @param {string|dom.data.Contract...} params
		 * @returns {dom.html.Classes}
		 */
		classes: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Classes(args);
		},

		//CSS functions

		/**
		 * @static
		 * Css
		 * @param {dom.sheets.CssProperty|dom.sheets.CssGroup...} params
		 * @returns {dom.sheets.Css}
		 */
		css: function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.sheets.Css(args);
		},

		/**
		 * @static
		 * Css property
		 * @param {CssPropertyType|string} name
		 * @param {string|dom.data.Contract} value
		 * @returns {dom.sheets.CssProperty}
		 */
		cssProperty: function (name, value) {
			return new dom.sheets.CssProperty(name, value);
		},

		/**
		 * @static
		 * Css group
		 * @param {string} name
		 * @param {dom.sheets.CssProperty|dom.sheets.CssGroup...} params
		 * @returns {dom.sheets.CssGroup}
		 */
		cssGroup: function (name, params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.sheets.CssGroup(name, args.slice(1));
		},

		/**
		 * Css generator
		 * @returns {CssGenerator}
		 */
		cssGenerator: function () {
			throw "You must include Reactive.css module for working with generated css.";
		},

		//DATA functions

		/**
		 * @static
		 * Contract
		 * @param {string} value
		 * @returns {dom.data.Contract}
		 */
		contract: function (value) {
			return new dom.data.Contract(value);
		}

		
	};

}());;/**
 * Base element object in reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	/**
	 * Base element in shadow dom
	 * @constructor
	 */
	dom.Element = function () {
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();
		/** @type {dom.Element}*/
		this.parent = null;
	};

	/**
	 * @protected
	 * Process children
	 * @param {Array.<dom.Element>} elements
	 * @return {Array.<dom.html.Element>}
	 */
	dom.Element.prototype.processChildren = function (elements) {
		var i,
			element,
			children = [];

		for (i = 0; i < elements.length; i++) {
			//load element
			element = /** @type {dom.html.Element} */ elements[i];
			//filter
			if (element instanceof dom.html.Element) {
				element.setParent(this);
				children.push(element);
			}
		}

		return children;
	};

	/**
	 * @protected
	 * Process attributes
	 * @param {Array.<dom.Element>} elements
	 * @return {Object.<string, dom.html.Attribute>}
	 */
	dom.Element.prototype.processAttributes = function (elements) {
		var i,
			attribute,
			attributes = {};

		for (i = 0; i < elements.length; i++) {
			//load attribute
			attribute = elements[i];
			//filter
			if (attribute instanceof dom.html.Attribute) {
				attribute.boundWith(this);
				attributes[attribute.getName()] = attribute;
			}
		}

		return attributes;
	};

	/**
	 * @protected
	 * Process classes
	 * @param {Array.<dom.Element>} elements
	 * @return {Array.<dom.html.Classes>}
	 */
	dom.Element.prototype.processClasses = function (elements) {
		var i,
			clazz,
			classes = [];

		for (i = 0; i < elements.length; i++) {
			//load clazz
			clazz = elements[i];
			//filter
			if (clazz instanceof dom.html.Classes) {
				clazz.boundWith(this);
				classes.push(clazz);
			}
		}

		return classes;
	};

	/**
	 * @protected
	 * Process classes
	 * @param {Array.<dom.Element>} elements
	 * @return {dom.sheets.Css}
	 */
	dom.Element.prototype.processCss = function (elements) {
		var i,
			cssClass,
			css = null;

		for (i = 0; i < elements.length; i++) {
			//load cssClass
			cssClass = elements[i];
			//filter
			if (cssClass instanceof dom.sheets.Css) {
				//check unique
				if (css !== null) {
					throw "Can not set css twice on element.";
				}
				//set css
				cssClass.boundWith(this);
				css = cssClass;
			}
		}

		return css;
	};

	/**
	 * @protected
	 * Process css property
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} elements
	 * @return {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}
	 */
	dom.Element.prototype.processCssProperty = function (elements) {
		var i,
			property,
			cssProperty = [];

		for (i = 0; i < elements.length; i++) {
			//load property
			property = elements[i];
			//push into new array and bound
			property.boundWith(this);
			//add property
			cssProperty.push(property);
		}

		return cssProperty;
	};

	/**
	 * @protected
	 * Process group css property
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} elements
	 * @return {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}
	 */
	dom.Element.prototype.processGroupCssProperty = function (elements) {
		var i,
			property,
			isProperty,
			cssProperty = [];

		for (i = 0; i < elements.length; i++) {
			//load property
			property = elements[i];
			//is property
			isProperty = property instanceof dom.sheets.CssProperty;
			//changeable check
			if (isProperty && property.isChangeable()) {
				throw "You can not set changeable css property into group!";
			}
			//push into new array and bound
			property.boundWith(this);
			//add property
			cssProperty.push(property);
		}

		return cssProperty;
	};

	/**
	 * @protected
	 * Bound with element
	 * @param {dom.Element} element
	 */
	dom.Element.prototype.boundWith = function (element) {
		//insert element
		this.elements.addElement(element);
	};

}(dom, document, window));
;/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.render = dom.render || {};

	/**
	 * Renderer
	 * @constructor
	 */
	dom.render.Renderer = function () {
		/** @type {dom.render.Queue}*/
		this.queue = new dom.render.Queue();
		/** @type {null}*/
		this.timer = null;
		/** @type {number}*/
		this.MAX_IN_STEP = 10; //count
		/** @type {number}*/
		this.MAX_TIME = 50; //ms
	};

	/**
	 * @public
	 * Renderer
	 * @param {dom.html.Element} element
	 * @param {string} name Function name
	 * @param {Function} what
	 */
	dom.render.Renderer.prototype.render = function (element, name, what) {
		this.queue.add(element, name, what);
		this.changed();
	};

	/**
	 * @public
	 * Force render for
	 * @param {dom.html.Element} element
	 */
	dom.render.Renderer.prototype.forceFor = function (element) {
		//stop timer
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
		//get all functions
		var i,
			functions = this.queue.getFor(element);
		//force run all
		for (i = 0; i < functions.length; i++) {
			functions[i]();
		}
		//run timer if its necessary
		this.changed();
	};

	/**
	 * @private
	 * Changed
	 */
	dom.render.Renderer.prototype.changed = function () {
		var timer = this.timer;
		//timer not running
		if (timer === null) {
			//create new timer
			this.spawnTimer();
		}
	};

	/**
	 * @private
	 * Spawn timer
	 */
	dom.render.Renderer.prototype.spawnTimer = function () {
		var time,
			self = this;

		//create new timer
		this.timer = setTimeout(function () {
			//get start time
			time = self.now();
			//run cycle
			self.cycle(time);
			//clear timer
			self.timer = null;
			//run int again if not complete all
			if (self.queue.count() !== 0) {
				self.changed();
			}
		}, 30);
	};

	/**
	 * @private
	 * Run one cycle
	 * @param {number} time
	 */
	dom.render.Renderer.prototype.cycle = function (time) {
		var i,
			fnc;

		//run functions
		for (i = 0; i < this.MAX_IN_STEP; i++) {
			//get first function
			fnc = this.queue.get();
			//fnc
			if (fnc) {
				fnc();
			} else {
				//no function left, its done
				return;
			}
			//check exceeded
			if (this.recalculate(time, i)) {
				//function exceeded given time
				return;
			}
		}
		//recalculate on end
		this.recalculate(time, i);
	};

	/**
	 * @private
	 * Recalculate
	 * @param {number} time
	 * @param {number} i
	 * @return {boolean} exceeded
	 */
	dom.render.Renderer.prototype.recalculate = function (time, i) {
		var ration,
			length;
		//length of cycle
		length = this.now() - time;
		//check for remaining time
		if (length > this.MAX_TIME) {
			//set new max function count
			this.MAX_IN_STEP = Math.max(i, 1);
			return true;
		}
		//fast rendering, calculate MAX_IN_STEP
		if (this.MAX_IN_STEP === i && length < this.MAX_TIME) {
			ration = length === 0 ? 10 : this.MAX_TIME / length;
			this.MAX_IN_STEP = Math.floor(this.MAX_IN_STEP * ration);
		}
		return false;
	};

	/**
	 * @private
	 * Now
	 * @returns {number}
	 */
	dom.render.Renderer.prototype.now = function () {
		return new Date().getTime();
	};

}(dom, document, window));
;/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.render = dom.render || {};

	/**
	 * Render queue
	 * @constructor
	 */
	dom.render.Queue = function () {
		/** @type {Array.<Array.<Function>>}*/
		this.stacks = [];
		/** @type {Array.<Array.<string>>}*/
		this.names = [];
		/** @type {Array.<dom.html.Element>}*/
		this.elements = [];
	};

	/**
	 * Add into queue
	 * @param {dom.html.Element} element
	 * @param {string} name Function name
	 * @param {Function} what
	 */
	dom.render.Queue.prototype.add = function (element, name, what) {
		var i,
			namesArray,
			stackArray,
			elements = this.elements;
		//insert of not exists
		i = dom.utils.arrayInsert(elements, element);
		//stack and names
		stackArray = this.stacks[i];
		namesArray = this.names[i];
		if (!stackArray) {
			//stack array
			stackArray = [];
			this.stacks[i] = stackArray;
			//names array
			namesArray = [];
			this.names[i] = namesArray;
		}
		//insert of not exists
		i = dom.utils.arrayInsert(namesArray, name);
		//push
		namesArray[i] = name;
		stackArray[i] = what;
	};

	/**
	 * Get function from queue
	 * @returns {Function}
	 */
	dom.render.Queue.prototype.get = function () {
		var fnc,
			elements = this.elements,
			names = this.names,
			stacks = this.stacks;
		//nothing exists in queue
		if (stacks.length === 0) {
			return null;
		}
		//get function, shift name
		names[0].shift();
		fnc = stacks[0].shift();
		//remove from stack
		if (stacks[0].length === 0) {
			stacks.shift();
			names.shift();
			elements.shift();
		}
		//return function
		return fnc;
	};

	/**
	 * Get functions from queue
	 * @param {dom.html.Element} element
	 * @returns {Array.<Function>}
	 */
	dom.render.Queue.prototype.getFor = function (element) {
		var i,
			index,
			array = [],
			names = this.names,
			stacks = this.stacks,
			elements = this.elements,
			children = element.getChildren();

		//get array index
		index = dom.utils.arrayIndex(elements, element);
		//force for all children
		if (!element.isEmpty() && children.length) {
			for (i = 0; i < children.length; i++) {
				array = array.concat(this.getFor(children[i]));
			}
		}

		//no element found
		if (index === -1) {
			return array;
		}
		//get functions
		array = array.concat(stacks[index]);
		//remove
		elements.splice(index, 1);
		stacks.splice(index, 1);
		names.splice(index, 1);
		//return functions
		return array;
	};

	/**
	 * Count
	 * @return {number}
	 */
	dom.render.Queue.prototype.count = function () {
		return this.stacks.length;
	};



}(dom, document, window));
;/**
 * Inheritance utils for reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.utils = dom.utils || {};

	/**
	 * @static
	 * Inherit
	 * @param {function} child
	 * @param {function} base
	 */
	dom.utils.inherit = function (child, base) {
		//temp function
		function Temp() {
			//noinspection JSUnusedGlobalSymbols
			this.constructor = child;
		}
		//inheritance
		Temp.prototype = base.prototype;
		child.prototype = new Temp();
	};

}(dom, document, window));
;/**
 * Logger utils for reactive
 * @author Stanislav Hacker
 */
(function (dom, document, window) {
	"use strict";

	dom.utils = dom.utils || {};

	var isConsole = Boolean(window.console);

	/**
	 * @static
	 * Logger
	 * @param {dom.utils.LoggerType} type
	 * @param {string} message
	 */
	dom.utils.logger = function (type, message) {
		if (isConsole) {
			console[type](message);
		}
	};

	/**
	 * Logger type
	 * @enum {string}
	 */
	dom.utils.LoggerType = {
		WARN: "warn",
		ERROR: "error",
		INFO: "info",
		LOG: "log"
	};

	//export
	window['LoggerType'] = dom.utils.LoggerType;

}(dom, document, window));
;/**
 * Array utils for reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.utils = dom.utils || {};

	/**
	 * @static
	 * Array insert
	 * @param {Array} array
	 * @param {object} element
	 * @returns {number}
	 */
	dom.utils.arrayInsert = function (array, element) {
		var i,
			length = array.length;
		//elements look up
		for (i = 0; i < length; i++) {
			if (array[i] === element) {
				return i;
			}
		}
		//element is not in array
		array.push(element);
		return array.length - 1;
	};

	/**
	 * @static
	 * Array index
	 * @param {Array} array
	 * @param {object} element
	 * @returns {number}
	 */
	dom.utils.arrayIndex = function (array, element) {
		var i,
			length = array.length;
		//elements look up
		for (i = 0; i < length; i++) {
			if (array[i] === element) {
				return i;
			}
		}
		return -1;
	};

}(dom, document, window));
;/**
 * Data contract in Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.data = dom.data || {};

	/**
	 * Data contract
	 * @param {string} initialValue
	 * @constructor
	 */
	dom.data.Contract = function (initialValue) {
		/** @type {object}*/
		this.value = initialValue;
		/** @type {Array.<function>}*/
		this.changeEvents = [];
		/** @type {Array.<object>}*/
		this.callers = [];
	};

	/**
	 * @public
	 * Get value
	 * @returns {object}
	 */
	dom.data.Contract.prototype.getValue = function () {
		return this.value;
	};

	/**
	 * @public
	 * Set value
	 * @param {object} value
	 */
	dom.data.Contract.prototype.setValue = function (value) {
		var events = this.changeEvents,
			callers = this.callers,
			i;

		//do nothing if value is same
		if (value === this.value) {
			return;
		}
		//set new value
		this.value = value;
		//inform all
		for (i = 0; i < events.length; i++) {
			events[i].apply(callers[i]);
		}
	};

	/**
	 * @public
	 * @param {object} caller
	 * @param {function} event
	 */
	dom.data.Contract.prototype.addChangeEvent = function (caller, event) {
		var index = dom.utils.arrayIndex(this.callers, caller);
		//inset if not exists
		if (index === -1) {
			this.callers.push(caller);
			this.changeEvents.push(event);
		}
	};

	/**
	 * @public
	 * @param {object} caller
	 */
	dom.data.Contract.prototype.removeChangeEvent = function (caller) {
		var index = dom.utils.arrayIndex(this.callers, caller);
		//remove if not exists
		if (index >= 0) {
			this.callers.splice(index, 1);
			this.changeEvents.splice(index, 1);
		}
	};

}(dom, document, window));
;/**
 * Data contract in Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.data = dom.data || {};

	/**
	 * @public
	 * Data contract unbound
	 * @param {string} initialValue
	 * @extends {dom.data.Contract}
	 * @constructor
	 */
	dom.data.UnboundContract = function (initialValue) {
		/** @type {object}*/
		this.value = initialValue;
		/** @type {Array.<function>}*/
		this.changeEvents = [];
		/** @type {Array.<object>}*/
		this.callers = [];
	};
	dom.utils.inherit(dom.data.UnboundContract, dom.data.Contract);


	/**
	 * @protected
	 * @param {object} caller
	 * @param {function} event
	 */
	dom.data.UnboundContract.prototype.addChangeEvent = function (caller, event) {
	};

	/**
	 * @protected
	 * @param {object} caller
	 */
	dom.data.UnboundContract.prototype.removeChangeEvent = function (caller) {
	};

}(dom, document, window));
;/**
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

		//init
		this.init(elements);

		/** @type {HTMLElement}*/
		this.element = null;
		/** @type {dom.sheets.CssRules}*/
		this.cssRules = null;
		/** @type {dom.builder.Live}*/
		this.reactor = null;
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
//			rules = this.cssRules,
			element = this.element,
			children = this.children,
			classNames = this.classNames,
			attributes = this.attributes;

		//remove all children
		for (i = 0; i < children.length; i++) {
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
	 * @param {dom.Element} parent
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
;/**
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
		return text ? text.toString() : null;
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

	/**
	 * @public
	 * Get live dom
	 * @returns {HTMLElement|Text}
	 */
	dom.html.TextElement.prototype.getLive = function () {
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
	 * @public
	 * Set text
	 */
	dom.html.TextElement.prototype.setText = function () {
		var self = this,
			element = this.element;
		//set attribute on dom element
		if (element) {
			dom.html.RENDERER.render(this, "nodeValue", function () {
				element.nodeValue = self.text.getValue() || "";
			});
		}
	};

}(dom, document, window));
;/**
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
		this.name = name;
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
		LABEL: "label",
		LANG: "lang",
		LINK: "link",
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
;/**
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
;/**
 * Element in Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.html = dom.html || {};

	/**
	 * Classes
	 * @param {Array.<string|dom.data.Contract>} classes
	 * @extends {dom.Element}
	 * @constructor
	 */
	dom.html.Classes = function (classes) {
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();
		/** @type {Array.<dom.data.Contract>}*/
		this.cls = this.createClasses(classes);
	};
	dom.utils.inherit(dom.html.Classes, dom.Element);

	/**
	 * @public
	 * Get classes
	 * @returns {Array.<string>}
	 */
	dom.html.Classes.prototype.getClasses = function () {
		var i,
			cls = this.cls,
			classes  = [];

		for (i = 0; i < cls.length; i++) {
			classes.push(cls[i].getValue());
		}

		return classes;
	};

	/**
	 * @public
	 * Get static classes
	 * @returns {Array.<string>}
	 */
	dom.html.Classes.prototype.getStaticClasses = function () {
		var i,
			clazz,
			cls = this.cls,
			classes  = [];

		for (i = 0; i < cls.length; i++) {
			clazz = cls[i];
			if (clazz instanceof dom.data.UnboundContract) {
				classes.push(clazz.getValue());
			}
		}

		return classes;
	};


	/**
	 * @private
	 * Create classes
	 * @param {Array.<string|dom.data.Contract>} data
	 * @return {Array.<dom.data.Contract>}
	 */
	dom.html.Classes.prototype.createClasses = function (data) {
		var i,
			item,
			contracts = [];

		for (i = 0; i < data.length; i++) {
			item = data[i];
			//is contract
			if (item instanceof dom.data.Contract) {
				item.addChangeEvent(this, this.onClassNameChange);
				contracts.push(item);

			//create contract
			} else {
				contracts.push(new dom.data.UnboundContract(item));
			}
		}

		return contracts;
	};

	/**
	 * @protected
	 * On attribute change
	 */
	dom.html.Classes.prototype.onClassNameChange = function () {
		this.elements.setClassName(this);
	};

}(dom, document, window));
;/**
 * Elements in Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.html = dom.html || {};

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
		var index = dom.utils.arrayIndex(this.elements, element);
		//add if not exists
		if (index === -1) {
			this.elements.push(element);
		}
	};

	/**
	 * Remove element
	 * @param {dom.html.Element|dom.sheets.Css} element
	 */
	dom.html.Elements.prototype.removeElement = function (element) {
		var index = dom.utils.arrayIndex(this.elements, element);
		//remove if exists
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

}(dom, document, window));;/**
 * Css in shadow dom in reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.sheets = dom.sheets || {};

	/**
	 * Css
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} css
	 * @extends {dom.Element}
	 * @constructor
	 */
	dom.sheets.Css = function (css) {
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();
		/** @type {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}*/
		this.css = this.processCssProperty(css);
	};
	dom.utils.inherit(dom.sheets.Css, dom.Element);

	/**
	 * @public
	 * Set css property
	 * @param {dom.sheets.CssProperty|dom.sheets.CssGroup} value
	 */
	dom.sheets.Css.prototype.setCssProperty = function (value) {
		this.elements.setCssProperty(value);
	};

	/**
	 * @public
	 * Get css
	 * @returns {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}
	 */
	dom.sheets.Css.prototype.getCss = function () {
		return this.css;
	};

}(dom, document, window));
;/**
 * Css property in reactive
 * @author Stanislav Hacker
 */
(function (dom, document, window) {
	"use strict";

	dom.sheets = dom.sheets || {};

	/**
	 * @private
	 * @type {Object<string, string>}
	 */
	var jsNamesMap = {};

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

	/**
	 * @static
	 * @param {string} cssName
	 * @returns {string}
	 */
	dom.sheets.CssProperty.createJsName = function (cssName) {
		var index,
			jsName = cssName,
			delimiter = "-",
			nameInCache = jsNamesMap[cssName];

		//return cssName in cache
		if (nameInCache) {
			return nameInCache;
		}
		//index
		index = jsName.indexOf(delimiter);
		//create cssName
		while (index >= 0) {
			if (index > 0) {
				jsName = replaceAt(jsName, index, null);
				jsName = replaceAt(jsName, index, jsName[index].toUpperCase());
			} else {
				jsName = replaceAt(jsName, index, null);
			}
			index = jsName.indexOf(delimiter);
		}
		//save cssName into map
		jsNamesMap[cssName] = jsName;
		//return new cssName
		return jsName;
	};

	/**
	 * Css property type
	 * @enum {string}
	 */
	dom.sheets.CssPropertyType = {
		ACCELERATOR: "accelerator",
		AZIMUTH: "azimuth",
		BACKGROUND: "background",
		BACKGROUND_ATTACHMENT: "background-attachment",
		BACKGROUND_COLOR: "background-color",
		BACKGROUND_IMAGE: "background-image",
		BACKGROUND_POSITION: "background-position",
		BACKGROUND_POSITION_X: "background-position-x",
		BACKGROUND_POSITION_Y: "background-position-y",
		BACKGROUND_REPEAT: "background-repeat",
		BEHAVIOR: "behavior",
		BORDER: "border",
		BORDER_BOTTOM: "border-bottom",
		BORDER_BOTTOM_COLOR: "border-bottom-color",
		BORDER_BOTTOM_STYLE: "border-bottom-style",
		BORDER_BOTTOM_WIDTH: "border-bottom-width",
		BORDER_COLLAPSE: "border-collapse",
		BORDER_COLOR: "border-color",
		BORDER_LEFT: "border-left",
		BORDER_LEFT_COLOR: "border-left-color",
		BORDER_LEFT_STYLE: "border-left-style",
		BORDER_LEFT_WIDTH: "border-left-width",
		BORDER_RIGHT: "border-right",
		BORDER_RIGHT_COLOR: "border-right-color",
		BORDER_RIGHT_STYLE: "border-right-style",
		BORDER_RIGHT_WIDTH: "border-right-width",
		BORDER_SPACING: "border-spacing",
		BORDER_STYLE: "border-style",
		BORDER_TOP: "border-top",
		BORDER_TOP_COLOR: "border-top-color",
		BORDER_TOP_STYLE: "border-top-style",
		BORDER_TOP_WIDTH: "border-top-width",
		BORDER_WIDTH: "border-width",
		BOTTOM: "bottom",
		CAPTION_SIDE: "caption-side",
		CLEAR: "clear",
		CLIP: "clip",
		COLOR: "color",
		CONTENT: "content",
		COUNTER_INCREMENT: "counter-increment",
		COUNTER_RESET: "counter-reset",
		CUE: "cue",
		CUE_AFTER: "cue-after",
		CUE_BEFORE: "cue-before",
		CURSOR: "cursor",
		DIRECTION: "direction",
		DISPLAY: "display",
		ELEVATION: "elevation",
		EMPTY_CELLS: "empty-cells",
		FILTER: "filter",
		FLOAT: "float",
		FONT: "font",
		FONT_FAMILY: "font-family",
		FONT_SIZE: "font-size",
		FONT_SIZE_ADJUST: "font-size-adjust",
		FONT_STRETCH: "font-stretch",
		FONT_STYLE: "font-style",
		FONT_VARIANT: "font-variant",
		FONT_WEIGHT: "font-weight",
		HEIGHT: "height",
		IME_MODE: "ime-mode",
		INCLUDE_SOURCE: "include-source",
		LAYER_BACKGROUND_COLOR: "layer-background-color",
		LAYER_BACKGROUND_IMAGE: "layer-background-image",
		LAYOUT_FLOW: "layout-flow",
		LAYOUT_GRID: "layout-grid",
		LAYOUT_GRID_CHAR: "layout-grid-char",
		LAYOUT_GRID_CHAR_SPACING: "layout-grid-char-spacing",
		LAYOUT_GRID_LINE: "layout-grid-line",
		LAYOUT_GRID_MODE: "layout-grid-mode",
		LAYOUT_GRID_TYPE: "layout-grid-type",
		LEFT: "left",
		LETTER_SPACING: "letter-spacing",
		LINE_BREAK: "line-break",
		LINE_HEIGHT: "line-height",
		LIST_STYLE: "list-style",
		LIST_STYLE_IMAGE: "list-style-image",
		LIST_STYLE_POSITION: "list-style-position",
		LIST_STYLE_TYPE: "list-style-type",
		MARGIN: "margin",
		MARGIN_BOTTOM: "margin-bottom",
		MARGIN_LEFT: "margin-left",
		MARGIN_RIGHT: "margin-right",
		MARGIN_TOP: "margin-top",
		MARKER_OFFSET: "marker-offset",
		MARKS: "marks",
		MAX_HEIGHT: "max-height",
		MAX_WIDTH: "max-width",
		MIN_HEIGHT: "min-height",
		MIN_WIDTH: "min-width",
		ORPHANS: "orphans",
		OUTLINE: "outline",
		OUTLINE_COLOR: "outline-color",
		OUTLINE_STYLE: "outline-style",
		OUTLINE_WIDTH: "outline-width",
		OVERFLOW: "overflow",
		OVERFLOW_X: "overflow-X",
		OVERFLOW_Y: "overflow-Y",
		PADDING: "padding",
		PADDING_BOTTOM: "padding-bottom",
		PADDING_LEFT: "padding-left",
		PADDING_RIGHT: "padding-right",
		PADDING_TOP: "padding-top",
		PAGE: "page",
		PAGE_BREAK_AFTER: "page-break-after",
		PAGE_BREAK_BEFORE: "page-break-before",
		PAGE_BREAK_INSIDE: "page-break-inside",
		PAUSE: "pause",
		PAUSE_AFTER: "pause-after",
		PAUSE_BEFORE: "pause-before",
		PITCH: "pitch",
		PITCH_RANGE: "pitch-range",
		PLAY_DURING: "play-during",
		POSITION: "position",
		QUOTES: "quotes",
		RICHNESS: "richness",
		RIGHT: "right",
		RUBY_ALIGN: "ruby-align",
		RUBY_OVERHANG: "ruby-overhang",
		RUBY_POSITION: "ruby-position",
		SIZE: "size",
		SPEAK: "speak",
		SPEAK_HEADER: "speak-header",
		SPEAK_NUMERAL: "speak-numeral",
		SPEAK_PUNCTUATION: "speak-punctuation",
		SPEECH_RATE: "speech-rate",
		STRESS: "stress",
		TABLE_LAYOUT: "table-layout",
		TEXT_ALIGN: "text-align",
		TEXT_ALIGN_LAST: "text-align-last",
		TEXT_DECORATION: "text-decoration",
		TEXT_INDENT: "text-indent",
		TEXT_JUSTIFY: "text-justify",
		TEXT_OVERFLOW: "text-overflow",
		TEXT_SHADOW: "text-shadow",
		TEXT_TRANSFORM: "text-transform",
		TEXT_AUTOSPACE: "text-autospace",
		TEXT_KASHIDA_SPACE: "text-kashida-space",
		TEXT_UNDERLINE_POSITION: "text-underline-position",
		TOP: "top",
		UNICODE_BIDI: "unicode-bidi",
		VERTICAL_ALIGN: "vertical-align",
		VISIBILITY: "visibility",
		VOICE_FAMILY: "voice-family",
		VOLUME: "volume",
		WHITE_SPACE: "white-space",
		WIDOWS: "widows",
		WIDTH: "width",
		WORD_BREAK: "word-break",
		WORD_SPACING: "word-spacing",
		WORD_WRAP: "word-wrap",
		WRITING_MODE: "writing-mode",
		Z_INDEX: "z-index",
		ZOOM: "zoom"
};

	//export
	window['CssPropertyType'] = dom.sheets.CssPropertyType;

}(dom, document, window));
;/**
 * Css group in reactive
 * @author Stanislav Hacker
 */
var sheets = (function (dom) {
	"use strict";

	dom.sheets = dom.sheets || {};

	/**
	 * Css property
	 * @param {string} name
	 * @param {Array.<dom.sheets.CssProperty>} elements
	 * @extends {dom.Element}
	 * @constructor
	 */
	dom.sheets.CssGroup = function (name, elements) {
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();
		/** @type {string}*/
		this.name = name;
		/** @type {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}*/
		this.css = this.processGroupCssProperty(elements);
	};
	dom.utils.inherit(dom.sheets.CssGroup, dom.Element);

	/**
	 * @public
	 * Get name
	 * @returns {string}
	 */
	dom.sheets.CssGroup.prototype.getName = function () {
		var name = this.name,
			start = name[0];
		//return name with space or not
		return start === ":" ? name : " " + name;
	};

	/**
	 * @public
	 * Get css
	 * @returns {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>}
	 */
	dom.sheets.CssGroup.prototype.getCss = function () {
		return this.css;
	};

}(dom, document, window));
;/**
 * Css rule for reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.sheets = dom.sheets || {};

	/**
	 * Css rule
	 * @param {string} name
	 * @param {Array.<string>} properties
	 * @constructor
	 */
	dom.sheets.CssRule = function (name, properties) {
		/** @type {string}*/
		this.name = name;
		/** @type {Array.<string>}*/
		this.properties = properties;
		/** @type {Text}*/
		this.cssElement = null;
		/** @type {dom.html.Element}*/
		this.element = null;
	};

	/**
	 * Get rule name
	 * @returns {string}
	 */
	dom.sheets.CssRule.prototype.getRuleName = function () {
		return this.name;
	};

	/**
	 * Get rule string
	 * @returns {string}
	 */
	dom.sheets.CssRule.prototype.getRuleString = function () {
		return this.name + " {" + this.properties.join(";") + "}\n";
	};

	/**
	 * Check if rule is in dom
	 * @returns {boolean}
	 */
	dom.sheets.CssRule.prototype.isInDom = function () {
		return this.cssElement !== null;
	};


}(dom, document, window));
;/**
 * Css rules for Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.sheets = dom.sheets || {};

	/**
	 * Css rules object
	 * @constructor
	 */
	dom.sheets.CssRules = function () {
	};
	//noinspection JSCheckFunctionSignatures
	dom.utils.inherit(dom.sheets.CssRules, Array);


}(dom, document, window));
;/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.builder = dom.builder || {};

	/**
	 * Live
	 * @param {dom.html.Element} element
	 * @param {HTMLElement=} parent
	 * @constructor
	 */
	dom.builder.Live = function (element, parent) {
		/** @type {dom.html.Element}*/
		this.element = element;
		/** @type {HTMLElement}*/
		this.parent = parent;
	};

	/**
	 * Get live dom element
	 */
	dom.builder.Live.prototype.getLive = function () {
		//generate content for text element
		this.generateElement();
		this.generateAttributes();
		this.generateClasses();
		this.generateCss();
		this.generateChildren();
	};

	/**
	 * @private
	 * Generate start tag
	 */
	dom.builder.Live.prototype.generateElement = function () {
		var element = this.element,
			parent = this.parent;
		//create element
		element.element = parent || document.createElement(element.getTag());
	};

	/**
	 * @private
	 * Generate attributes
	 */
	dom.builder.Live.prototype.generateAttributes = function () {
		var element = this.element,
			attributes,
			attr,
			name;

		//load attributes
		attributes = element.getAttributes();
		//iterate all attributes
		for (name in attributes) { // jshint ignore:line
			//noinspection JSUnfilteredForInLoop
			attr = attributes[name];
			//check attribute
			if (attr.getValue() !== null) {
				//set attribute
				element.setAttribute(attr.getName(), attr.getValue());
			}
		}
	};

	/**
	 * @private
	 * Generate attributes
	 */
	dom.builder.Live.prototype.generateClasses = function () {
		var element = this.element,
			names = [],
			classNames,
			i;

		//load class names
		classNames = element.getClassNames();

		//generate html for children
		for (i = 0; i < classNames.length; i++) {
			names = names.concat(classNames[i].getClasses());
		}

		//add
		if (names.length > 0) {
			element.setClassName(names);
		}
	};

	/**
	 * @private
	 * Generate css
	 */
	dom.builder.Live.prototype.generateCss = function () {
		var element = this.element,
			css = element.getCss();

		//no css
		if (css === null) {
			return;
		}

		//iterate all
		this.generateCssForGroup(css.getCss());
	};

	/**
	 * @private
	 * Generate css for group
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} cssProperties
	 */
	dom.builder.Live.prototype.generateCssForGroup = function (cssProperties) {
		var i,
			group,
			isGroup,
			property,
			isProperty,
			element = this.element;

		//iterate all
		for (i = 0; i < cssProperties.length; i++) {
			//property
			property = cssProperties[i];
			//is property, group
			isProperty = property instanceof dom.sheets.CssProperty;
			isGroup = property instanceof dom.sheets.CssGroup;
			//changeable
			if (isProperty && property.isChangeable()) {
				element.setCssProperty(property.getJsName(), property.getValue());
			}
			//group
			if (isGroup) {
				group = /** @type {dom.sheets.CssGroup} */ property;
				this.generateCssForGroup(group.getCss());
			}
		}
	};

	/**
	 * @public
	 * Generate html for children if there are
	 */
	dom.builder.Live.prototype.generateChildren = function () {
		var element = this.element,
			childrenElement,
			children,
			i;

		if (!element.isEmpty()) {
			//process children
			children = element.getChildren();
			//generate html for children
			for (i = 0; i < children.length; i++) {
				//children element
				childrenElement = children[i].getLive();
				//if not contain, append it
				if (!element.element.contains(childrenElement)) {
					element.element.appendChild(children[i].getLive());
				}
			}
		}
	};

}(dom, document, window));
;/**
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

}(dom, document, window));
;/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom, document, window) {
	"use strict";

	dom.builder = dom.builder || {};

	/**
	 * @private
	 * Style element, rules
	 * @type {HTMLElement}
	 */
	var style = null,
		rules = {};

	/**
	 * Css
	 * @param {dom.html.Element} element
	 * @constructor
	 */
	dom.builder.Css = function (element) {
		/** @type {dom.html.Element}*/
		this.element = element;
		/** @type {dom.sheets.CssRules}*/
		this.cssRules = new dom.sheets.CssRules();
	};

	/**
	 * Get css for element
	 */
	dom.builder.Css.prototype.getCss = function () {
		var i,
			rules = this.cssRules,
			element = this.element,
			children = element.getChildren(),
			css = this.element.getCss();

		//TODO: Check on static

		//css exists
		if (css) {
			//css rules
			this.getCssRule(dom.builder.Css.getRuleName(element), css.getCss());
		}
		//append to dom
		for (i = 0; i < rules.length; i++) {
			this.appendRule(rules[i]);
		}
		//for all children
		if (!element.isEmpty()) {
			for (i = 0; i < children.length; i++) {
				new dom.builder.Css(children[i]).getCss();
			}
		}
		//add rules
		element.cssRules = rules;
	};

	/**
	 * @private
	 * @param {string} name
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} cssProperties
	 * @returns {dom.sheets.CssRules}
	 */
	dom.builder.Css.prototype.getCssRule = function (name, cssProperties) {
		var i,
			cssRule,
			cssGroup,
			parentCss,
			rule = [],
			cssProperty,
			rules = this.cssRules;

		//process all
		for (i = 0; i < cssProperties.length; i++) {
			//load property
			cssProperty = cssProperties[i];
			//css group
			if (cssProperty instanceof dom.sheets.CssGroup) {
				cssGroup = /** @type {dom.sheets.CssGroup}*/cssProperty;
				this.getCssRule(name + cssGroup.getName(), cssGroup.getCss());
			//only non changeable and filled
			} else if (!cssProperty.isChangeable() && cssProperty.getValue() !== null) {
				rule.push(cssProperty.getName() + ": " + cssProperty.getValue());
			}
		}
		//parent name
		parentCss = dom.builder.Css.getParentRuleName(this.element.parent);
		//parent exists
		if (parentCss) {
			name = [ parentCss, name ].join(" ");
		}
		//rule
		cssRule = new dom.sheets.CssRule(name, rule);
		cssRule.element = this.element;
		//push top rule
		rules.push(cssRule);
	};

	/**
	 * @private
	 * Append style
	 * @param {dom.sheets.CssRule} rule
	 */
	dom.builder.Css.prototype.appendRule = function (rule) {
		var name = rule.getRuleName();
		//is already in dom, do nothing
		if (rule.isInDom()) {
			return;
		}
		//check rule exists
		if (rules[name]) {
			dom.utils.logger(LoggerType.INFO, "There is duplicate rule named '" + name + "'. You must specify one of element that is used on this path.");
			return;
		}
		rules[name] = rule;
		//create style
		dom.builder.Css.createStyle();
		//register node
		rule.cssElement = document.createTextNode(rule.getRuleString());
		//noinspection JSUnresolvedVariable
		if (style.styleSheet) {
			//noinspection JSUnresolvedVariable
			style.styleSheet.cssText += rule.cssElement.nodeValue;
		} else {
			style.appendChild(rule.cssElement);
		}
	};

	/**
	 * @private
	 * @static
	 * Get id for element
	 * @param  {dom.html.Element} element
	 * @returns {string|null}
	 */
	dom.builder.Css.getId = function (element) {
		var attributes = element.getAttributes(),
			id = attributes[AttributeType.ID];

		//for css we need static attribute
		if (id && !id.isChangeable()) {
			return id.getValue() || null;
		}
		return null;
	};

	/**
	 * @private
	 * @static
	 * Get all static css
	 * @param  {dom.html.Element} element
	 * @returns {Array.<string>}
	 */
	dom.builder.Css.getClasses = function (element) {
		var i,
			staticClasses,
			allClasses = [],
			classNames = element.getClassNames();

		for (i = 0; i < classNames.length; i++) {
			staticClasses = classNames[i].getStaticClasses();
			allClasses = allClasses.concat(staticClasses);
		}
		return allClasses;
	};

	/**
	 * @private
	 * @static
	 * Get rule name
	 * @param  {dom.html.Element} element
	 * @returns {string}
	 */
	dom.builder.Css.getRuleName = function (element) {
		var id,
			classes,
			name = [];

		//get ind and classes
		id = dom.builder.Css.getId(element);
		classes = dom.builder.Css.getClasses(element);
		//add id
		if (id !== null) {
			name.push("#" + id);
		}
		//add classes
		if (classes.length) {
			classes.unshift("");
			name.push(classes.join("."));
		}
		//nothing
		if (name.length === 0) {
			name.push(element.getTag());
		}
		//return
		return name.join("");
	};

	/**
	 * @private
	 * @static
	 * Get rule name
	 * @param  {dom.html.Element} element
	 * @returns {string}
	 */
	dom.builder.Css.getParentRuleName = function (element) {
		var name = [],
			parentIdentifier,
			parent = element,
			isBody = parent === null || element.parent === null;

		//is root
		if (isBody) {
			return "";
		}

		//generate name
		while(!isBody) {
			//get name
			parentIdentifier = dom.builder.Css.getRuleName(parent);
			//add into names array
			if (parentIdentifier) {
				name.unshift(parentIdentifier);
			}
			//get new parent
			parent = parent.parent;
			isBody = parent === null;
		}
		//return name
		return name.join(" ");
	};

	/**
	 * @static
	 * @private
	 * Create style
	 */
	dom.builder.Css.createStyle = function () {
		var header;
		//create new style
		if (style === null) {
			style = document.createElement('style');
			style.setAttribute("type", "text/css");
			style.setAttribute("id", dom.builder.CssStyleType.GENERATED);
			header = document.getElementsByTagName('head')[0];
			header.appendChild(style);
		}
	};

	/**
	 * CssStyle type
	 * @enum {string}
	 */
	dom.builder.CssStyleType = {
		GENERATED: "reactive-generated",
		STATIC: "reactive-static"
	};

	//export
	window['CssStyleType'] = dom.builder.CssStyleType;

}(dom, document, window));
