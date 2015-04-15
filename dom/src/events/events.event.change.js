/**
 * Event in Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.events = dom.events || {};

	/**
	 * Event message
	 * @param {dom.events.EventType|EventType|string} type
	 * @param {Event} originalEvent
	 * @extends {dom.events.EventMessage}
	 * @constructor
	 */
	dom.events.ChangeEventMessage = function (type, originalEvent) {
		/** @type {dom.events.EventType|EventType|string}*/
		this.type = type;
		/** @type {Event}*/
		this.event = originalEvent;
		/** @type {dom.html.Element}*/
		this.handledBy = null;


		/** @type {boolean|undefined}*/
		this.newValue = undefined;
		/** @type {boolean|undefined}*/
		this.checked = undefined;
	};
	dom.utils.inherit(dom.events.ChangeEventMessage, dom.events.EventMessage);

}(dom, document, window));
