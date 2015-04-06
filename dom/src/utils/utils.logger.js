/**
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
