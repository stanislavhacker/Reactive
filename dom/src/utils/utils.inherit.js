/*global dom*/
/**
 * Base shadow dom definition
 */
(function () {
	"use strict";

	/**
	 * Utils inherit
	 */
	(function () {

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

	}());

}());
