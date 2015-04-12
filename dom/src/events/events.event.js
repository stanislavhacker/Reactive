/**
 * Event in Reactive
 * @author Stanislav Hacker
 */
(function (dom, document, window) {
	"use strict";

	dom.events = dom.events || {};

	/**
	 * Event
	 * @param {dom.events.EventType|EventType|string} type
	 * @param {Function} handler
	 * @extends {HTMLElement}
	 * @constructor
	 */
	dom.events.Event = function (type, handler) {
		/** @type {string}*/
		this.type = type;
		/** @type {Function}*/
		this.handler = handler;
		/** @type {boolean}*/
		this.detached = false;
	};
	dom.utils.inherit(dom.events.Event, dom.Element);

	/**
	 * Get type
	 * @returns {dom.events.EventType|EventType|string}
	 */
	dom.events.Event.prototype.getType = function () {
		return this.type;
	};

	/**
	 * Enable
	 */
	dom.events.Event.prototype.enable = function () {
		this.detached = false;
	};

	/**
	 * Disable
	 */
	dom.events.Event.prototype.disable = function () {
		this.detached = true;
	};

	/**
	 * Trigger
	 * @param {Event} event
	 */
	dom.events.Event.prototype.trigger = function (event) {
		//TODO: Convert event?
		this.handler(event);
	};

	/**
	 * Is detached
	 * @returns {boolean}
	 */
	dom.events.Event.prototype.isActive = function () {
		return !this.detached;
	};


	/**
	 * Event type
	 * @num {string}
	 */
	dom.events.EventType = {
		//Mouse events
		Click: "click",
		DblClick: "dblclick",
		Drag: "drag",
		DragEnd: "dragend",
		DragEnter: "dragenter",
		DragLeave: "dragleave",
		DragOver: "dragover",
		DragStart: "dragstart",
		Drop: "drop",
		MouseDown: "mousedown",
		MouseMove: "mousemove",
		MouseOut: "mouseout",
		MouseOver: "mouseover",
		MouseUp: "mouseup",
		MouseWheel: "mousewheel",
		Scroll: "scroll",
		Wheel: "wheel",

		//Copy / paste
		Copy: "copy",
		Cut: "cut",
		Paste: "paste",

		//Media
		Abort: "abort",
		CanPlay: "canplay",
		CanPlayThrough: "canplaythrough",
		CueChange: "cuechange",
		DurationChange: "durationchange",
		Emptied: "emptied",
		Ended: "ended",
		LoadedData: "loadeddata",
		LoadedMetadata: "loadedmetadata",
		LoadStart: "loadstart",
		Pause: "pause",
		Play: "play",
		Playing: "playing",
		Progress: "progress",
		RateChange: "ratechange",
		Seeked: "seeked",
		Seeking: "seeking",
		Stalled: "stalled",
		Suspend: "suspend",
		TimeUpdate: "timeupdate",
		VolumeChange: "volumechange",
		Waiting: "waiting",

		//Keyboard
		KeyDown: "keydown",
		KeyPress: "keypress",
		KeyUp: "keyup",

		//Forms
		Blur: "blur",
		Change: "change",
		ContextMenu: "contextmenu",
		Focus: "focus",
		Input: "input",
		Invalid: "invalid",
		Reset: "reset",
		Search: "search",
		Select: "select",
		Submit: "submit",

		//Window
		AfterPrint: "afterprint",
		BeforePrint: "beforeprint",
		BeforeUnload: "beforeunload",
		HashChange: "hashchange",
		Message: "message",
		Offline: "offline",
		Online: "online",
		PageHide: "pagehide",
		PageShow: "pageshow",
		PopState: "popstate",
		Resize: "resize",
		Storage: "storage",
		Unload: "unload",

		//Universal
		Load: "load",
		Error: "error",
		Show: "show",
		Toggle: "toggle"
	};

	//export on window
	window['EventType'] = dom.events.EventType;

}(dom, document, window));
