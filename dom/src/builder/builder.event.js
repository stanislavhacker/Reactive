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
	 * @param {dom.html.Element} where
	 * @param {HTMLElement} target
	 * @returns {boolean}
	 */
	function bubble(where, target) {
		var parent = target;
		//iterate all to body
		while(parent) {
			//check
			if (parent === where.element) {
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
			handled,
			target,
			message,
			self = this,
			handlers = this.handlers,
			element = this.element;
		//create handler
		handler = function (e) {
			//not active
			if (event.isActive() === false) {
				return;
			}
			//get even from window
			e = e || window.event;
			//target
			target = e.target || e.srcElement;
			//do nothing if is not right element
			if (bubble(element, target)) {
				//create message
				message = e.message || self.createEvent(event, element, e);
				//update message
				e.message = message;
				//if not handled
				if (message.getHandledBy() === null) {
					//make routine
					handled = event.trigger(message);
					//handled by element
					if (handled) {
						message.handledBy = element;
					}
				}
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
	 * @param {dom.html.Element} element
	 * @param {Event} originalEvent
	 */
	dom.builder.Event.prototype.createEvent = function (event, element, originalEvent) {
		var type = event.getType();
		//switch by type
		switch (type) {
			//Change events
			case EventType.Change:
				return dom.builder.Event.createChangeEventMessage(event, element, originalEvent);
			//Mouse events
			case EventType.Click:
			case EventType.DblClick:
			case EventType.MouseDown:
			case EventType.MouseMove:
			case EventType.MouseOut:
			case EventType.MouseOver:
			case EventType.MouseUp:
			//Scroll events
			case EventType.MouseWheel:
			case EventType.Scroll:
			case EventType.Wheel:
			//Drag events
			case EventType.Drag:
			case EventType.DragEnd:
			case EventType.DragEnter:
			case EventType.DragLeave:
			case EventType.DragOver:
			case EventType.DragStart:
			case EventType.Drop:
			//Copy / pastes
			case EventType.Copy:
			case EventType.Cut:
			case EventType.Paste:
			//Media events
			case EventType.Abort:
			case EventType.CanPlay:
			case EventType.CanPlayThrough:
			case EventType.CueChange:
			case EventType.DurationChange:
			case EventType.Emptied:
			case EventType.Ended:
			case EventType.LoadedData:
			case EventType.LoadedMetadata:
			case EventType.LoadStart:
			case EventType.Pause:
			case EventType.Play:
			case EventType.Playing:
			case EventType.Progress:
			case EventType.RateChange:
			case EventType.Seeked:
			case EventType.Seeking:
			case EventType.Stalled:
			case EventType.Suspend:
			case EventType.TimeUpdate:
			case EventType.VolumeChange:
			case EventType.Waiting:
			//Keyboard events
			case EventType.KeyDown:
			case EventType.KeyPress:
			case EventType.KeyUp:
			//Forms events
			case EventType.Blur:
			case EventType.ContextMenu:
			case EventType.Focus:
			case EventType.Input:
			case EventType.Invalid:
			case EventType.Reset:
			case EventType.Search:
			case EventType.Select:
			case EventType.Submit:
			//Window events
			case EventType.AfterPrint:
			case EventType.BeforePrint:
			case EventType.BeforeUnload:
			case EventType.HashChange:
			case EventType.Message:
			case EventType.Offline:
			case EventType.Online:
			case EventType.PageHide:
			case EventType.PageShow:
			case EventType.PopState:
			case EventType.Resize:
			case EventType.Storage:
			case EventType.Unload:
			//Universal events
			case EventType.Load:
			case EventType.Error:
			case EventType.Show:
			case EventType.Toggle:
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




	//CREATORS

	/**
	 * @static
	 * Create change event message
	 * @param {dom.events.Event} event
	 * @param {dom.html.Element} element
	 * @param {Event} originalEvent
	 * @return {dom.events.ChangeEventMessage}
	 */
	dom.builder.Event.createChangeEventMessage = function (event, element, originalEvent) {
		var domElement = element.getLive(),
			attributes = element.getAttributes(),
			type = event.getType(),
			checkedContract,
			valueContract,
			checkedAttr,
			valueAttr,
			base;

		//checked attr
		checkedAttr = attributes[AttributeType.CHECKED];
		checkedContract = checkedAttr ? checkedAttr.getDataContract() : new dom.data.UnboundContract(null);
		checkedContract.setValue(Boolean(domElement.checked));

		//value attr
		valueAttr = attributes[AttributeType.VALUE];
		valueContract = valueAttr ? valueAttr.getDataContract() : new dom.data.UnboundContract(null);
		valueContract.setValue(domElement.value);

		base = new dom.events.ChangeEventMessage(type, originalEvent);
		base.checked = checkedContract;
		base.newValue = valueContract;

		return base;
	};







}(dom, document, window));