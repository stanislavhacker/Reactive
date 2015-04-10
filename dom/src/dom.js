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
			//set rendered
			domElement.rendered = true;
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
			//css generator module exists
			if (typeof domCssGenerator !== "undefined") {
				return domCssGenerator.getInstance();
			}
			//throw error
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

}());