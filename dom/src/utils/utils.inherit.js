/**
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
