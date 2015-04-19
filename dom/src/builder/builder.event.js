/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom, document, window) {
	"use strict";

	dom.builder = dom.builder || {};

	var buttons = dom.events.mouse.Buttons();

	/**
	 * Add event
	 * @param {HTMLElement|Window} el
	 * @param {dom.events.EventType|EventType|string} eventType
	 * @param {function} handler
	 */
	function addEvent(el, eventType, handler) {
		var phase = EventType.Scroll === eventType;
		// DOM Level 2 browsers
		if (el.addEventListener) {
			el.addEventListener(eventType, handler, phase);
		// IE <= 8
		} else if (el.attachEvent) {
			el.attachEvent('on' + eventType, handler);
		// ancient browsers
		} else {
			throw "Reactive events are not supported in this browser.";
		}

		//firefox scroll
		switch(eventType) {
			case EventType.MouseWheel:
				addEvent(el, "DOMMouseScroll", handler);
				break;
			default:
				break;
		}
	}

	/**
	 * Remove handler
	 * @param {HTMLElement} el
	 * @param {dom.events.EventType|EventType|string} eventType
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

		//firefox scroll
		switch(eventType) {
			case EventType.MouseWheel:
				removeEvent(el, "DOMMouseScroll", handler);
				break;
			default:
				break;
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
			case EventType.MouseWheel:
			case EventType.ContextMenu:
				return dom.builder.Event.createMouseEventMessage(event, element, originalEvent);
			//Scroll events
			case EventType.Scroll:
				return dom.builder.Event.createScrollEventMessage(event, element, originalEvent);
			//Keyboard events
			case EventType.KeyDown:
			case EventType.KeyPress:
			case EventType.KeyUp:
				return dom.builder.Event.createKeyEventMessage(event, element, originalEvent);
			//Forms events
			case EventType.Blur:
			case EventType.Focus:
			case EventType.Reset:
			case EventType.Select:
			case EventType.Submit:
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
	 * Determine button
	 * @param {*} event
	 * @param {dom.events.mouse.Buttons} buttons
	 */
	function determineButton (event, buttons) {
		// all browsers except IE before version 9
		if ('which' in event) {
			switch (event.which) {
				case 1:
					buttons.left = true;
					break;
				case 2:
					buttons.middle = true;
					break;
				case 3:
					buttons.right = true;
					break;
			}
		//old browsers IE8 <
		} else {
			//case
			switch (event.button) {
				case 1:
					buttons.left = true;
					break;
				case 2:
					buttons.right = true;
					break;
				case 3:
					buttons.left = true;
					buttons.right = true;
					break;
				case 4:
					buttons.middle = true;
					break;
				case 5:
					buttons.left = true;
					buttons.middle = true;
					break;
				case 6:
					buttons.right = true;
					buttons.middle = true;
					break;
				case 7:
					buttons.left = true;
					buttons.middle = true;
					buttons.right = true;
					break;
			}
		}
	}

	/**
	 * Determine modifiers
	 * @param {MouseEvent} event
	 * @param {dom.events.key.Modifiers} modifiers
	 */
	function determineModifiers (event, modifiers) {
		modifiers.altKey = event.altKey;
		modifiers.ctrlKey = event.ctrlKey;
		modifiers.metaKey = event.metaKey;
		modifiers.shiftKey = event.shiftKey;
	}

	/**
	 * Determine positions
	 * @param {MouseEvent} event
	 * @param {dom.events.mouse.Position} positions
	 */
	function determinePositions (event, positions) {
		//noinspection JSValidateTypes
		var pageSupport = event.pageX !== undefined;
		//viewport fill
		positions.viewport.left = event.clientX;
		positions.viewport.top = event.clientY;
		//document fill
		positions.document.left = pageSupport ? event.pageX : event.clientX + document.documentElement.scrollLeft;
		positions.document.top = pageSupport ? event.pageY : event.clientY + document.documentElement.scrollTop;
		//screen fill
		positions.screen.left = event.screenX;
		positions.screen.top = event.screenY;
	}

	/**
	 * Determine wheel
	 * @param {dom.events.EventType|EventType|string} type
	 * @param {MouseEvent} event
	 * @returns {number}
	 */
	function determineWheel (type, event) {
		if (type !== EventType.MouseWheel) {
			return 0;
		}
		return event.detail ? event.detail * (-40) : event.wheelDelta;
	}

	/**
	 * Determine key type
	 * @param {number} keyCode
	 * @return {KeyType|string}
	 */
	function determineKey (keyCode) {
		return dom.events.KeyType[keyCode];
	}




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

	/**
	 * @static
	 * Create mouse event message
	 * @param {dom.events.Event} event
	 * @param {dom.html.Element} element
	 * @param {Event} originalEvent
	 * @return {dom.events.ChangeEventMessage}
	 */
	dom.builder.Event.createMouseEventMessage = function (event, element, originalEvent) {
		var type = event.getType(),
			base;

		base = new dom.events.MouseEventMessage(type, originalEvent);
		//determine buttons on mouse down
		switch(type) {
			case EventType.Click:
				determineButton(originalEvent, base.buttons);
				break;
			case EventType.MouseDown:
				buttons = new dom.events.mouse.Buttons();
				determineButton(originalEvent, buttons);
				base.buttons = buttons;
				break;
			default:
				base.buttons = buttons;
				break;
		}
		//determine rest
		determinePositions(originalEvent, base.positions);
		determineModifiers(originalEvent, base.modifiers);
		base.wheel = determineWheel(type, originalEvent);

		return base;
	};

	/**
	 * @static
	 * Create scroll event message
	 * @param {dom.events.Event} event
	 * @param {dom.html.Element} element
	 * @param {Event} originalEvent
	 * @return {dom.events.ScrollEventMessage}
	 */
	dom.builder.Event.createScrollEventMessage = function (event, element, originalEvent) {
		var domElement = element.element,
			type = event.getType(),
			base;

		base = new dom.events.ScrollEventMessage(type, originalEvent);
		base.scrollTop = domElement.scrollTop;
		base.scrollLeft = domElement.scrollLeft;

		return base;
	};

	/**
	 * @static
	 * Create scroll event message
	 * @param {dom.events.Event} event
	 * @param {dom.html.Element} element
	 * @param {Event} originalEvent
	 * @return {dom.events.ScrollEventMessage}
	 */
	dom.builder.Event.createKeyEventMessage = function (event, element, originalEvent) {
		var type = event.getType(),
			base;

		base = new dom.events.KeyEventMessage(type, originalEvent);

		determineModifiers(originalEvent, base.modifiers);
		//char
		base.charCode = originalEvent.charCode;
		base.character = base.charCode ? String.fromCharCode(base.charCode) : null;
		//key
		base.keyCode = originalEvent.keyCode;
		//do not determine for keypress
		if (type !== EventType.KeyPress) {
			base.key = determineKey(base.keyCode) || String.fromCharCode(base.keyCode).toLowerCase();
		}

		return base;
	};



	//bind helper events
	addEvent(window, EventType.MouseDown, function (e) {
		buttons = new dom.events.mouse.Buttons();
		determineButton(e, buttons);
	});
	addEvent(window, EventType.MouseUp, function () {
		buttons = new dom.events.mouse.Buttons();
	});

}(dom, document, window));