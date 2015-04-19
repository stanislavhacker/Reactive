/**
 * Event in Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.events = dom.events || {};

	/**
	 * Form Event message
	 * @param {dom.events.EventType|EventType|string} type
	 * @param {Event} originalEvent
	 * @extends {dom.events.EventMessage}
	 * @constructor
	 */
	dom.events.FormEventMessage = function (type, originalEvent) {
		/** @type {dom.events.EventType|EventType|string}*/
		this.type = type;
		/** @type {Event}*/
		this.event = originalEvent;
		/** @type {dom.html.Element}*/
		this.handledBy = null;

		/** @type {dom.data.Contract}*/
		this.currentValue = undefined;
		/** @type {dom.data.Contract}*/
		this.checked = undefined;
	};
	dom.utils.inherit(dom.events.FormEventMessage, dom.events.EventMessage);

}(dom, document, window));
