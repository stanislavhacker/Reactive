/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.builder = dom.builder || {};

	/**
	 * Add event
	 * @param {HTMLElement} el
	 * @param {string} eventType
	 * @param {function} handler
	 */
	function addEvent(el, eventType, handler) {
		// DOM Level 2 browsers
		if (el.addEventListener) {
			el.addEventListener(eventType, handler, false);
		// IE <= 8
		} else if (el.attachEvent) {
			el.attachEvent('on' + eventType, handler);
		// ancient browsers
		} else {
			throw "Reactive events are not supported in this browser.";
		}
	}

	/**
	 * Event
	 * @param {dom.html.Element} element
	 * @constructor
	 */
	dom.builder.Event = function (element) {
		/** @type {dom.html.Element}*/
		this.element = element;
	};

	/**
	 * @public
	 * Bind events on element
	 */
	dom.builder.Event.prototype.bindEvents = function () {
		var i,
			event,
			element = this.element,
			events = element.getEvents();
		//process all
		for (i = 0; i < events.length; i++) {
			//get event
			event = events[i];
			//attach
			this.attachEvent(event);
		}
	};

	/**
	 * @private
	 * Attach event
	 * @param {dom.events.Event} event
	 */
	dom.builder.Event.prototype.attachEvent = function (event) {
		var target,
			element = this.element;
		//attach
		addEvent(document.body, event.getType(), function (e) {
			//target
			target = e.target || e.srcElement;
			//do nothing if is not right element
			if (element.element !== target || event.isActive() === false) {
				return;
			}
			//make routine
			event.trigger(new dom.events.EventMessage(event.getType(), e));
		});
	};

}(dom, document, window));