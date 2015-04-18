/**
 * Event in Reactive
 * @author Stanislav Hacker
 */
(function (dom, document, window) {
	"use strict";

	dom.events = dom.events || {};
	dom.events.mouse = dom.events.mouse || {};
	dom.events.key = dom.events.key || {};


	/**
	 * Event message
	 * @param {dom.events.EventType|EventType|string} type
	 * @param {Event} originalEvent
	 * @constructor
	 */
	dom.events.EventMessage = function (type, originalEvent) {
		/** @type {dom.events.EventType|EventType|string}*/
		this.type = type;
		/** @type {Event}*/
		this.event = originalEvent;
		/** @type {dom.html.Element}*/
		this.handledBy = null;
	};

	/**
	 * Get event
	 * @returns {Event}
	 */
	dom.events.EventMessage.prototype.getEvent = function () {
		return this.event;
	};

	/**
	 * Get type
	 * @returns {dom.events.EventType|EventType|string}
	 */
	dom.events.EventMessage.prototype.getType = function () {
		return this.type;
	};

	/**
	 * Get handled by
	 * @returns {dom.html.Element}
	 */
	dom.events.EventMessage.prototype.getHandledBy = function () {
		return this.handledBy;
	};







	/**
	 * Buttons
	 * @constructor
	 */
	dom.events.mouse.Buttons = function () {
		/** @type {boolean}*/
		this.left = false;
		/** @type {boolean}*/
		this.middle = false;
		/** @type {boolean}*/
		this.right = false;
	};

	/**
	 * Position
	 * @constructor
	 */
	dom.events.mouse.Position = function () {
		/** @type {dom.events.mouse.Coordination}*/
		this.viewport = new dom.events.mouse.Coordination();
		/** @type {dom.events.mouse.Coordination}*/
		this.document = new dom.events.mouse.Coordination();
		/** @type {dom.events.mouse.Coordination}*/
		this.screen = new dom.events.mouse.Coordination();
	};

	/**
	 * Coordination
	 * @constructor
	 */
	dom.events.mouse.Coordination = function () {
		/** @type {number}*/
		this.top = 0;
		/** @type {number}*/
		this.left = 0;
	};

	/**
	 * Modifiers
	 * @constructor
	 */
	dom.events.key.Modifiers = function () {
		/** @type {boolean}*/
		this.altKey = false;
		/** @type {boolean}*/
		this.ctrlKey = false;
		/** @type {boolean}*/
		this.metaKey = false;
		/** @type {boolean}*/
		this.shiftKey = false;
	};

}(dom, document, window));
