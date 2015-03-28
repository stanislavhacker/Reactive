/*global dom*/
/**
 * Base shadow dom definition
 */
(function () {
	"use strict";

	/**
	 * Utils logger
	 */
	(function () {

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

	}());

}());
