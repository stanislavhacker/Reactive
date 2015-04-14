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
	 * Remove handler
	 * @param {HTMLElement} el
	 * @param {string} eventType
	 * @param {function} handler
	 */
	function removeEvent(el, eventType, handler) {
		// For all major browsers, except IE 8 and earlier
		if (el.removeEventListener) {
			el.removeEventListener(eventType, handler);
		// For IE 8 and earlier versions
		} else if (el.detachEvent) {
			el.detachEvent('on' + eventType, handler);
		// ancient browsers
		} else {
			throw "Reactive events are not supported in this browser.";
		}
	}

	/**
	 * Bubble
	 * @param {HTMLElement} where
	 * @param {HTMLElement} target
	 * @returns {boolean}
	 */
	function bubble(where, target) {
		var parent = target;
		//iterate all to body
		while(parent) {
			//check
			if (parent === where) {
				return true;
			}
			parent = parent.parentNode;
		}
		return false;
	}

	/**
	 * Event
	 * @param {dom.html.Element} element
	 * @constructor
	 */
	dom.builder.Event = function (element) {
		/** @type {dom.html.Element}*/
		this.element = element;
		/** @type {Array.<{event: dom.events.Event, handler: function}>}*/
		this.handlers = [];
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
		var handler,
			target,
			self = this,
			handlers = this.handlers,
			element = this.element;
		//create handler
		handler = function (e) {
			//not active
			if (event.isActive() === false) {
				return;
			}
			//target
			target = e.target || e.srcElement;
			//do nothing if is not right element
			if (bubble(element.element, target)) {
				//make routine
				event.trigger(self.createEvent(event, target, e));
			}
		};
		//push handler
		handlers.push({
			event: event,
			handler: handler
		});
		//attach
		addEvent(document.body, event.getType(), handler);
	};

	/**
	 * @private
	 * Create event
	 * @param {dom.events.Event} event
	 * @param {*} domElement
	 * @param {Event} originalEvent
	 */
	dom.builder.Event.prototype.createEvent = function (event, domElement, originalEvent) {
		var type = event.getType(),
			base;

		switch (type) {
			case EventType.Change:
				base = new dom.events.ChangeEventMessage(type, originalEvent);
				base.checked = Boolean(domElement.checked);
				base.newValue = domElement.value;
				return base;
			default:
				return new dom.events.EventMessage(type, originalEvent);
		}
	};

	/**
	 * @public
	 * Remove
	 */
	dom.builder.Event.prototype.remove = function () {
		var i,
			handler,
			handlers = this.handlers;

		for (i = 0; i < handlers.length; i++) {
			//handler
			handler = handlers[i];
			//remove
			removeEvent(document.body, handler.event.getType(), handler.handler);
		}
	};

}(dom, document, window));