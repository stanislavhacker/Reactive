/*globals dom*/
(function () {
	"use strict";

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
		item = dom.div(
			dom.classes("tester"),
			dom.css(
				dom.cssProperty("width", "250px"),
				dom.cssProperty("background", "red"),
				dom.cssProperty("color", "white"),
				dom.cssProperty("text-align", "center"),
				dom.cssProperty("padding", "10px"),
				dom.cssProperty("margin", "3px")
			),
			dom.text("Click event"),
			dom.event(EventType.Click, function (e) {
				value.setValue(eventVisualiser(e));
			})
		);
		dom.attach(document.body, item);

		//mouseup, down
		item = dom.div(
			dom.classes("tester"),
			dom.text("Mousedown, mouseup event"),
			dom.event(EventType.MouseDown, function (e) {
				value.setValue(eventVisualiser(e));
			}),
			dom.event(EventType.MouseUp, function (e) {
				value.setValue(eventVisualiser(e));
			})
		);
		dom.attach(document.body, item);

		//double click
		item = dom.div(
			dom.classes("tester"),
			dom.text("Double click event"),
			dom.event(EventType.DblClick, function (e) {
				value.setValue(eventVisualiser(e));
			})
		);
		dom.attach(document.body, item);

		//mouse move
		item = dom.div(
			dom.classes("tester"),
			dom.text("Move event"),
			dom.event(EventType.MouseMove, function (e) {
				value.setValue(eventVisualiser(e));
			})
		);
		dom.attach(document.body, item);

		//mouse over, out
		item = dom.div(
			dom.classes("tester"),
			dom.text("Move over, out"),
			dom.event(EventType.MouseOver, function (e) {
				value.setValue(eventVisualiser(e));
			}),
			dom.event(EventType.MouseOut, function (e) {
				value.setValue(eventVisualiser(e));
			})
		);
		dom.attach(document.body, item);

		//mouse wheel
		item = dom.div(
			dom.classes("tester"),
			dom.text("Move wheel"),
			dom.event(EventType.MouseWheel, function (e) {
				value.setValue(eventVisualiser(e));
			})
		);
		dom.attach(document.body, item);

	}());

	//CHANG EVENTS
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

}());
