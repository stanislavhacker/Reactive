/*global dom*/
/**
 * Base shadow dom definition
 */
(function () {
	"use strict";

	/**
	 * Utils
	 */
	(function () {

		var isConsole = Boolean(window.console);

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

	}());

}());
