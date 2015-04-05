/*globals dom*/
window.dom = window.dom || {};
/**
 * @author Stanislav Hacker
 * Base shadow dom definition
 */
(function () {
	"use strict";

	//namespaces
	dom.builder = {};
	dom.data = {};
	dom.html = {};
	dom.render = {};
	dom.sheets = {};
	dom.utils = {};

	//global functions

	/**
	 * Body
	 */
	(function () {

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

		/**
		 * @static
		 * Attach on element
		 * @param {HTMLElement|dom.html.Element} parent
		 * @param {...dom.html.Element=} params
		 * @return {dom.html.Element}
		 */
		dom.attach = function (parent, params) {
			var args = Array.prototype.slice.apply(arguments);
			//create root element and run it!
			return convertToElement(parent, args.slice(1));
		};

	}());

	/**
	 * HTML functions
	 */
	(function () {

		/**
		 * @static
		 * Create div
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.div = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.DIV, args);
		};

		/**
		 * @static
		 * Create span
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.span = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.SPAN, args);
		};

		/**
		 * @static
		 * Create a
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.a = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.A, args);
		};

		/**
		 * @static
		 * Create abbr
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.abbr = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.ABBR, args);
		};

		/**
		 * @static
		 * Create address
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.address = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.ADDRESS, args);
		};

		/**
		 * @static
		 * Create area
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.area = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.AREA, args);
		};

		/**
		 * @static
		 * Create article
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.article = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.ARTICLE, args);
		};

		/**
		 * @static
		 * Create aside
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.aside = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.ASIDE, args);
		};

		/**
		 * @static
		 * Create audio
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.audio = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.AUDIO, args);
		};

		/**
		 * @static
		 * Create b
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.b = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.B, args);
		};

		/**
		 * @static
		 * Create base
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.base = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.BASE, args);
		};

		/**
		 * @static
		 * Create blockquote
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.blockquote = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.BLOCKQUOTE, args);
		};

		/**
		 * @static
		 * Create br
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.br = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.BR, args);
		};

		/**
		 * @static
		 * Create button
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.button = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.BUTTON, args);
		};

		/**
		 * @static
		 * Create canvas
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.canvas = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.CANVAS, args);
		};

		/**
		 * @static
		 * Create caption
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.caption = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.CAPTION, args);
		};

		/**
		 * @static
		 * Create cite
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.cite = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.CITE, args);
		};

		/**
		 * @static
		 * Create code
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.code = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.CODE, args);
		};

		/**
		 * @static
		 * Create em
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.em = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.EM, args);
		};

		/**
		 * @static
		 * Create embed
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.embed = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.EMBED, args);
		};

		/**
		 * @static
		 * Create fieldset
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.fieldset = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.FIELDSET, args);
		};

		/**
		 * @static
		 * Create footer
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.footer = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.FOOTER, args);
		};

		/**
		 * @static
		 * Create form
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.form = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.FORM, args);
		};

		/**
		 * @static
		 * Create h1
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.h1 = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.H1, args);
		};

		/**
		 * @static
		 * Create h2
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.h2 = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.H2, args);
		};

		/**
		 * @static
		 * Create h3
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.h3 = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.H3, args);
		};

		/**
		 * @static
		 * Create h4
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.h4 = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.H4, args);
		};

		/**
		 * @static
		 * Create h5
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.h5 = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.H5, args);
		};

		/**
		 * @static
		 * Create h6
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.h6 = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.H6, args);
		};

		/**
		 * @static
		 * Create header
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.header = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.HEADER, args);
		};

		/**
		 * @static
		 * Create i
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.i = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.I, args);
		};

		/**
		 * @static
		 * Create iframe
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.iframe = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.IFRAME, args);
		};

		/**
		 * @static
		 * Create img
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.img = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.IMG, args);
		};

		/**
		 * @static
		 * Create input
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.input = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.INPUT, args);
		};

		/**
		 * @static
		 * Create label
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.label = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.LABEL, args);
		};

		/**
		 * @static
		 * Create legend
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.legend = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.LEGEND, args);
		};

		/**
		 * @static
		 * Create li
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.li = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.LI, args);
		};

		/**
		 * @static
		 * Create main
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.main = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.MAIN, args);
		};

		/**
		 * @static
		 * Create mark
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.mark = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.MARK, args);
		};

		/**
		 * @static
		 * Create menu
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.menu = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.MENU, args);
		};

		/**
		 * @static
		 * Create menuitem
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.menuitem = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.MENUITEM, args);
		};

		/**
		 * @static
		 * Create meta
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.meta = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.META, args);
		};

		/**
		 * @static
		 * Create meter
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.meter = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.METER, args);
		};

		/**
		 * @static
		 * Create nav
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.nav = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.NAV, args);
		};

		/**
		 * @static
		 * Create noscript
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.noscript = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.NOSCRIPT, args);
		};

		/**
		 * @static
		 * Create object
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.object = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.OBJECT, args);
		};

		/**
		 * @static
		 * Create ol
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.ol = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.OL, args);
		};

		/**
		 * @static
		 * Create option
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.option = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.OPTION, args);
		};

		/**
		 * @static
		 * Create p
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.p = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.P, args);
		};

		/**
		 * @static
		 * Create param
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.param = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.PARAM, args);
		};

		/**
		 * @static
		 * Create pre
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.pre = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.PRE, args);
		};

		/**
		 * @static
		 * Create q
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.q = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.Q, args);
		};

		/**
		 * @static
		 * Create section
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.section = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.SECTION, args);
		};

		/**
		 * @static
		 * Create select
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.select = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.SELECT, args);
		};

		/**
		 * @static
		 * Create small
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.small = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.SMALL, args);
		};

		/**
		 * @static
		 * Create source
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.source = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.SOURCE, args);
		};

		/**
		 * @static
		 * Create strong
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.strong = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.STRONG, args);
		};

		/**
		 * @static
		 * Create sub
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.sub = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.SUB, args);
		};

		/**
		 * @static
		 * Create summary
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.summary = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.SUMMARY, args);
		};

		/**
		 * @static
		 * Create sup
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.sup = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.SUP, args);
		};

		/**
		 * @static
		 * Create table
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.table = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.TABLE, args);
		};

		/**
		 * @static
		 * Create tbody
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.tbody = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.TBODY, args);
		};

		/**
		 * @static
		 * Create td
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.td = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.TD, args);
		};

		/**
		 * @static
		 * Create textarea
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.textarea = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.TEXTAREA, args);
		};

		/**
		 * @static
		 * Create tfoot
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.tfoot = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.TFOOT, args);
		};

		/**
		 * @static
		 * Create th
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.th = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.TH, args);
		};

		/**
		 * @static
		 * Create thead
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.thead = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.THEAD, args);
		};

		/**
		 * @static
		 * Create title
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.title = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.TITLE, args);
		};

		/**
		 * @static
		 * Create tr
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.tr = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.TR, args);
		};

		/**
		 * @static
		 * Create track
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.track = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.TRACK, args);
		};

		/**
		 * @static
		 * Create u
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.u = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.U, args);
		};

		/**
		 * @static
		 * Create ul
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.ul = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.UL, args);
		};

		/**
		 * @static
		 * Create video
		 * @param {...dom.Element=} params
		 * @returns {dom.html.Element}
		 */
		dom.video = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Element(dom.html.ElementType.VIDEO, args);
		};





		/**
		 * @static
		 * Create text element
		 * @param {string|dom.data.Contract} text
		 * @returns {dom.html.TextElement}
		 */
		dom.text = function (text) {
			return new dom.html.TextElement(text);
		};




		/**
		 * @static
		 * Create attribute
		 * @param {dom.html.AttributeType|string} name
		 * @param {string|dom.data.Contract} value
		 * @returns {dom.html.Attribute}
		 */
		dom.attr = function (name, value) {
			return new dom.html.Attribute(name, value);
		};

		/**
		 * @static
		 * Create data attribute
		 * @param {dom.html.ElementType|string} name
		 * @param {string|dom.data.Contract} value
		 * @returns {dom.html.Attribute}
		 */
		dom.dataAttr = function (name, value) {
			return new dom.html.DataAttribute(name, value);
		};



		/**
		 * @static
		 * Create classes
		 * @param {string|dom.data.Contract...} params
		 * @returns {dom.html.Classes}
		 */
		dom.classes = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.html.Classes(args);
		};

	}());

	/**
	 * CSS functions
	 */
	(function () {

		/**
		 * @static
		 * Css
		 * @param {dom.sheets.CssProperty|dom.sheets.CssGroup...} params
		 * @returns {dom.sheets.Css}
		 */
		dom.css = function (params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.sheets.Css(args);
		};

		/**
		 * @static
		 * Css property
		 * @param {dom.sheets.CssPropertyType|string} name
		 * @param {string|dom.data.Contract} value
		 * @returns {dom.sheets.CssProperty}
		 */
		dom.cssProperty = function (name, value) {
			return new dom.sheets.CssProperty(name, value);
		};

		/**
		 * @static
		 * Css group
		 * @param {string} name
		 * @param {dom.sheets.CssProperty|dom.sheets.CssGroup...} params
		 * @returns {dom.sheets.CssGroup}
		 */
		dom.cssGroup = function (name, params) {
			var args = Array.prototype.slice.apply(arguments);
			return new dom.sheets.CssGroup(name, args.slice(1));
		};

		/**
		 * Css generator
		 * @returns {CssGenerator}
		 */
		dom.cssGenerator = function () {
			throw "You must include Reactive.css module for working with generated css.";
		};

	}());

	/**
	 * DATA functions
	 */
	(function () {

		/**
		 * @static
		 * Contract
		 * @param {string} value
		 * @returns {dom.data.Contract}
		 */
		dom.contract = function (value) {
			return new dom.data.Contract(value);
		};

	}());

}());
