/**
 * Event in Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.events = dom.events || {};

	/**
	 * Key Event message
	 * @param {dom.events.EventType|EventType|string} type
	 * @param {Event} originalEvent
	 * @extends {dom.events.EventMessage}
	 * @constructor
	 */
	dom.events.KeyEventMessage = function (type, originalEvent) {
		/** @type {dom.events.EventType|EventType|string}*/
		this.type = type;
		/** @type {Event}*/
		this.event = originalEvent;
		/** @type {dom.html.Element}*/
		this.handledBy = null;

		/** @type {dom.events.key.Modifiers}*/
		this.modifiers = new dom.events.key.Modifiers();
		/** @type {number}*/
		this.keyCode = 0;
		/** @type {number}*/
		this.charCode = 0;
		/** @type {string|null}*/
		this.character = null;
		/** @type {dom.events.KeyType|KeyType|string}*/
		this.key = null;
	};
	dom.utils.inherit(dom.events.KeyEventMessage, dom.events.EventMessage);

	/**
	 * Key type
	 * @num {string}
	 */
	dom.events.KeyType = {
		8: "backspace",
		9: "tab",
		13: "enter",
		16: "shift",
		17: "ctrl",
		18: "alt",
		19: "pause",
		20: "capslock",
		27: "esc",
		32: "space",
		33: "pageup",
		34: "pagedown",
		35: "end",
		36: "home",
		37: "left",
		38: "up",
		39: "right",
		40: "down",
		44: "printscreen",
		45: "insert",
		46: "delete",
		91: "leftmeta",
		92: "rightmeta",
		93: "select",
		96: "num0",
		97: "num1",
		98: "num2",
		99: "num3",
		100: "num4",
		101: "num5",
		102: "num6",
		103: "num7",
		104: "num8",
		105: "num9",
		106: "multiply",
		107: "add",
		109: "subtract",
		110: "decimalpoint",
		111: "divide",
		112: "f1",
		113: "f2",
		114: "f3",
		115: "f4",
		116: "f5",
		117: "f6",
		118: "f7",
		119: "f8",
		120: "f9",
		121: "f10",
		122: "f11",
		123: "f12",
		144: "numlock",
		145: "scrolllock",
		186: "semicolon",
		187: "equalsign",
		188: "comma",
		189: "dash",
		190: "period",
		191: "forwardslash",
		192: "graveaccent",
		219: "openbracket",
		220: "backslash",
		221: "closebraket",
		222: "singlequote",
		226: "pipe"
	};

	//export on window
	window['KeyType'] = dom.events.KeyType;

}(dom, document, window));