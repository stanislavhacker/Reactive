/**
 * Event in Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.events = dom.events || {};

	/**
	 * Scroll Event message
	 * @param {dom.events.EventType|EventType|string} type
	 * @param {Event} originalEvent
	 * @extends {dom.events.EventMessage}
	 * @constructor
	 */
	dom.events.ScrollEventMessage = function (type, originalEvent) {
		/** @type {dom.events.EventType|EventType|string}*/
		this.type = type;
		/** @type {Event}*/
		this.event = originalEvent;
		/** @type {dom.html.Element}*/
		this.handledBy = null;

		/** @type {number}*/
		this.scrollTop = 0;
		/** @type {number}*/
		this.scrollLeft = 0;
	};
	dom.utils.inherit(dom.events.ScrollEventMessage, dom.events.EventMessage);

}(dom, document, window));
