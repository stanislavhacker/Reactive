/*globals dom*/
var examples = {};
(function () {
	"use strict";

	/**
	 * Create dom element
	 * @param {string} id
	 */
	examples.createDomElement = function (id) {

		//var div = dom.div();
		//document.body.appendChild(div.getLive());

		var div = dom.div();
		document.getElementById(id).appendChild(document.createTextNode(div.getHtml()));
	};

	/**
	 * Create dom element with attr
	 * @param {string} id
	 */
	examples.createDomElementWithAttr = function (id) {

		//var div = dom.div(
		//	dom.attr(dom.html.AttributeType.LANG, "en"),
		//	dom.dataAttr("my-data", "test")
		//);
		//document.body.appendChild(div.getLive());

		var div = dom.div(
			dom.attr(dom.html.AttributeType.LANG, "en"),
			dom.dataAttr("my-data", "test")
		);
		document.getElementById(id).appendChild(document.createTextNode(div.getHtml()));
	};

	/**
	 * Create dom element with styles
	 * @param {string} id
	 */
	examples.createDomElementWithStyle = function (id) {

		//var div = dom.div(
		//	dom.attr('id', 'square'),
		//	dom.css(
		//		dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "red"),
		//		dom.cssProperty(dom.sheets.CssPropertyType.BORDER, "1px solid red")
		//	)
		//);
		//document.body.appendChild(div.getLive());

		var i,
			css = "",
			div = dom.div(
			dom.attr('id', 'square'),
			dom.css(
				dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "red"),
				dom.cssProperty(dom.sheets.CssPropertyType.BORDER, "1px solid red")
			)
		);
		document.getElementById(id).appendChild(document.createTextNode(div.getHtml()));
		div.createCssRules();

		for (i = 0; i < div.cssRules.length; i++) {
			css += div.cssRules[i].getRuleString();
		}

		document.getElementById(id + "_css").appendChild(document.createTextNode(css));
	};

	/**
	 * Create dom element with styles
	 * @param {string} id
	 */
	examples.createDomElementWithClasses = function (id) {

		//var div = dom.div(
		//	dom.classes("square", "red", "test")
		//);
		//document.body.appendChild(div.getLive());

		var div = dom.div(
			dom.classes("square", "red", "test")
		);
		document.getElementById(id).appendChild(document.createTextNode(div.getHtml()));
	};

}());