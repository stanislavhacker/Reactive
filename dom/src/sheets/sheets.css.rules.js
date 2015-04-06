/**
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
