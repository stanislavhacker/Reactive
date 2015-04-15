/**
 * Event in Reactive
 * @author Stanislav Hacker
 */
(function (dom, document, window) {
	"use strict";

	dom.events = dom.events || {};

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

}(dom, document, window));
