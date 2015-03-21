/**
 * Created by Stanislav on 20. 3. 2015.
 */
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

}());