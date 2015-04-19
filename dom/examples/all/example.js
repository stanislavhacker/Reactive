/*globals dom*/
(function () {
	"use strict";

	/**
	 * Create item
	 * @param {string} text
	 * @param {dom.events.Event} event1
	 * @param {dom.events.Event=} event2
	 * @returns {dom.html.Element}
	 */
	function createItem(text, event1, event2) {
		return dom.div(
			dom.classes("tester"),
			dom.css(
				dom.cssProperty("width", "250px"),
				dom.cssProperty("background", "red"),
				dom.cssProperty("color", "white"),
				dom.cssProperty("text-align", "center"),
				dom.cssProperty("padding", "10px"),
				dom.cssProperty("margin", "3px")
			),
			dom.text(text),
			event1,
			event2
		);
	}

	var h1,
		h3,
		item,
		value = dom.contract("{}");

	//title
	h1 = dom.h1(dom.text('Events example - all knows events'));
	dom.attach(document.body, h1);

	//source
	source('https://github.com/stanislavhacker/Reactive/blob/master/dom/examples/events/example.js');

	//TEXTAREA
	(function () {

		//item
		item = dom.div(
			//attr
			dom.attr(AttributeType.ID, "viewer"),
			//css
			dom.css(
				dom.cssProperty(CssPropertyType.POSITION, "fixed"),
				dom.cssProperty(CssPropertyType.TOP, "30px"),
				dom.cssProperty(CssPropertyType.RIGHT, "30px"),
				dom.cssProperty(CssPropertyType.MIN_WIDTH, "300px"),
				dom.cssProperty(CssPropertyType.HEIGHT, "400px")
			),
			//child
			dom.text("Event message preview:"),
			dom.pre(
				//css
				dom.css(
					dom.cssProperty(CssPropertyType.FONT_SIZE, "10px")
				),
				//child
				dom.div(
					dom.classes("json"),
					dom.text(value)
				)
			)
		);
		//item
		dom.attach(document.body, item);

	}());

	//MOUSE EVENTS
	(function () {

		h3 = dom.h3(dom.text('Mouse events'));
		dom.attach(document.body, h3);

		//click
		dom.attach(document.body, createItem(
			"Click event",
			dom.event(EventType.Click, function (e) {
				value.setValue(eventVisualiser(e));
			})
		));

		//mouseup, down
		dom.attach(document.body, createItem(
			"Mousedown, mouseup event",
			dom.event(EventType.MouseDown, function (e) {
				value.setValue(eventVisualiser(e));
			}),
			dom.event(EventType.MouseUp, function (e) {
				value.setValue(eventVisualiser(e));
			})
		));

		//double click
		dom.attach(document.body, createItem(
			"Double click event",
			dom.event(EventType.DblClick, function (e) {
				value.setValue(eventVisualiser(e));
			})
		));

		//mouse move
		dom.attach(document.body, createItem(
			"Move event",
			dom.event(EventType.MouseMove, function (e) {
				value.setValue(eventVisualiser(e));
			})
		));

		//mouse over, out
		dom.attach(document.body, createItem(
			"Move over out",
			dom.event(EventType.MouseOver, function (e) {
				value.setValue(eventVisualiser(e));
			}),
			dom.event(EventType.MouseOut, function (e) {
				value.setValue(eventVisualiser(e));
			})
		));

		//mouse wheel
		dom.attach(document.body, createItem(
			"Move wheel",
			dom.event(EventType.MouseWheel, function (e) {
				value.setValue(eventVisualiser(e));
			})
		));

		//contextmenu
		dom.attach(document.body, createItem(
			"ContextMenu",
			dom.event(EventType.ContextMenu, function (e) {
				value.setValue(eventVisualiser(e));
			})
		));

	}());

	//CHANGE EVENTS
	(function () {

		h3 = dom.h3(dom.text('Change events'));
		dom.attach(document.body, h3);

		//change
		item = dom.div(
			dom.classes("tester"),
			dom.text("Change event"),
			dom.br(),
			dom.input(
				dom.attr('type', 'checkbox'),
				dom.event(EventType.Change, function (e) {
					value.setValue(eventVisualiser(e));
				})
			),
			dom.input(
				dom.event(EventType.Change, function (e) {
					value.setValue(eventVisualiser(e));
				})
			),
			dom.select(
				dom.option(dom.text("Value1")),
				dom.option(dom.text("Value2")),
				dom.event(EventType.Change, function (e) {
					value.setValue(eventVisualiser(e));
				})
			)
		);
		dom.attach(document.body, item);

	}());

	//SCROLL EVENTS
	(function () {

		h3 = dom.h3(dom.text('Scroll events'));
		dom.attach(document.body, h3);

		//scroll
		item = dom.div(
			dom.classes("tester", "overflow"),
			dom.css(
				dom.cssGroup(".overflow",
					dom.cssProperty("overflow", "scroll"),
					dom.cssProperty("height", "200px")
				)
			),
			dom.text("Scroll event"),
			dom.div(
				dom.css(
					dom.cssProperty("width", "1000px"),
					dom.cssProperty("height", "2000px")
				)
			),
			dom.event(EventType.Scroll, function (e) {
				value.setValue(eventVisualiser(e));
			})
		);
		dom.attach(document.body, item);

	}());

	//KEY EVENTS
	(function () {

		h3 = dom.h3(dom.text('Key events'));
		dom.attach(document.body, h3);

		//keydown
		item = dom.div(
			dom.classes("tester"),
			dom.text("Keydown event"),
			dom.br(),
			dom.input(
				dom.event(EventType.KeyDown, function (e) {
					value.setValue(eventVisualiser(e));
				})
			)
		);
		dom.attach(document.body, item);

		//keypress
		item = dom.div(
			dom.classes("tester"),
			dom.text("Keypress event"),
			dom.br(),
			dom.input(
				dom.event(EventType.KeyPress, function (e) {
					value.setValue(eventVisualiser(e));
				})
			)
		);
		dom.attach(document.body, item);

		//keypress
		item = dom.div(
			dom.classes("tester"),
			dom.text("Keyup event"),
			dom.br(),
			dom.input(
				dom.event(EventType.KeyUp, function (e) {
					value.setValue(eventVisualiser(e));
				})
			)
		);
		dom.attach(document.body, item);

	}());

	//FORM EVENTS
	(function () {

		h3 = dom.h3(dom.text('Form events'));
		dom.attach(document.body, h3);

		//focus, blur
		item = dom.div(
			dom.classes("tester"),
			dom.text("Focus, blur event"),
			dom.br(),
			dom.input(
				dom.event(EventType.Focus, function (e) {
					value.setValue(eventVisualiser(e));
				}),
				dom.event(EventType.Blur, function (e) {
					value.setValue(eventVisualiser(e));
				})
			),
			dom.select(
				dom.option(dom.text("Value1")),
				dom.option(dom.text("Value2")),
				dom.event(EventType.Focus, function (e) {
					value.setValue(eventVisualiser(e));
				}),
				dom.event(EventType.Blur, function (e) {
					value.setValue(eventVisualiser(e));
				})
			)
		);
		dom.attach(document.body, item);

		//submit, reset
		item = dom.div(
			dom.classes("tester"),
			dom.text("Reset, submit event"),
			dom.br(),
			dom.a(dom.attr('name', 'form')),
			dom.form(
				dom.attr('action', '#form'),
				dom.input(dom.attr('type', 'submit')),
				dom.input(dom.attr('type', 'reset')),
				dom.event(EventType.Submit, function (e) {
					value.setValue(eventVisualiser(e));
				}),
				dom.event(EventType.Reset, function (e) {
					value.setValue(eventVisualiser(e));
				})
			)
		);
		dom.attach(document.body, item);

		//focus, blur
		item = dom.div(
			dom.classes("tester"),
			dom.text("Select event"),
			dom.br(),
			dom.input(
				dom.attr('value', 'Select text here ...'),
				dom.event(EventType.Select, function (e) {
					value.setValue(eventVisualiser(e));
				})
			)
		);
		dom.attach(document.body, item);

	}());


}());
