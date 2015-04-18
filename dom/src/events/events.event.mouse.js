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
	dom.events.MouseEventMessage = function (type, originalEvent) {
		/** @type {dom.events.EventType|EventType|string}*/
		this.type = type;
		/** @type {Event}*/
		this.event = originalEvent;
		/** @type {dom.html.Element}*/
		this.handledBy = null;
		/** @type {dom.events.mouse.Buttons}*/
		this.buttons = new dom.events.mouse.Buttons();
		/** @type {dom.events.mouse.Position}*/
		this.positions = new dom.events.mouse.Position();
		/** @type {dom.events.key.Modifiers}*/
		this.modifiers = new dom.events.key.Modifiers();
		/** @type {number}*/
		this.wheel = 0;
	};
	dom.utils.inherit(dom.events.MouseEventMessage, dom.events.EventMessage);

}(dom, document, window));
