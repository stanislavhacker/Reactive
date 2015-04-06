/**
 * Array utils for reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.utils = dom.utils || {};

	/**
	 * @static
	 * Array insert
	 * @param {Array} array
	 * @param {object} element
	 * @returns {number}
	 */
	dom.utils.arrayInsert = function (array, element) {
		var i,
			length = array.length;
		//elements look up
		for (i = 0; i < length; i++) {
			if (array[i] === element) {
				return i;
			}
		}
		//element is not in array
		array.push(element);
		return array.length - 1;
	};

	/**
	 * @static
	 * Array index
	 * @param {Array} array
	 * @param {object} element
	 * @returns {number}
	 */
	dom.utils.arrayIndex = function (array, element) {
		var i,
			length = array.length;
		//elements look up
		for (i = 0; i < length; i++) {
			if (array[i] === element) {
				return i;
			}
		}
		return -1;
	};

}(dom, document, window));
