/*globals dom*/
(function () {
	"use strict";

	var h1,
		item,
		changeEvent,
		clickEventInner,
		clickEventOuter,
		clickedInner = dom.contract(0),
		clickedOuter = dom.contract(0),
		state = dom.contract("inactive");

	//title
	h1 = dom.h1(dom.text('Events example'));

	//events
	changeEvent = dom.event(EventType.Change, function (e) {
		state.setValue(e.checked ? "active" : "inactive");
		return true; //event is handled and stop propagation
	});
	clickEventInner = dom.event(EventType.Click, function (e) {
		clickedInner.setValue(clickedInner.getValue() + 1);
		return true;
	});
	clickEventOuter = dom.event(EventType.Click, function (e) {
		clickedOuter.setValue(clickedOuter.getValue() + 1);
		return true;
	});

	//item
	item = dom.div(
		//attr
		dom.attr(AttributeType.ID, "container"),
		//css
		dom.css(
			dom.cssGroup(":hover",
				dom.cssProperty(CssPropertyType.BACKGROUND, "#C4C4C4")
			),
			dom.cssProperty(CssPropertyType.PADDING, "10px"),
			dom.cssProperty(CssPropertyType.BACKGROUND, "#D6D6D6")
		),
		//children
		dom.div(
			//css
			dom.css(
				dom.cssGroup(":hover",
					dom.cssProperty(CssPropertyType.BACKGROUND, "red")
				),
				dom.cssGroup(".active",
					dom.cssProperty(CssPropertyType.BACKGROUND, "yellow"),
					dom.cssGroup(" .clicked",
						dom.cssProperty(CssPropertyType.COLOR, "black")
					)
				),
				dom.cssProperty(CssPropertyType.MARGIN, "0px auto"),
				dom.cssProperty(CssPropertyType.WIDTH, "200px"),
				dom.cssProperty(CssPropertyType.HEIGHT, "50px"),
				dom.cssProperty(CssPropertyType.BACKGROUND, "gray")
			),
			//classes
			dom.classes(state),
			//attr
			dom.attr(AttributeType.ID, "item"),
			//children
			dom.input(
				//css
				dom.css(
					dom.cssProperty(CssPropertyType.MARGIN, "5px")
				),
				//attr
				dom.attr('type', 'checkbox'),
				//events
				changeEvent
			),
			dom.div(
				//classes
				dom.classes("clicked"),
				//css
				dom.css(
					dom.cssProperty(CssPropertyType.COLOR, "white"),
					dom.cssProperty(CssPropertyType.TEXT_ALIGN, "center")
				),
				//children
				dom.text("Clicked: "),
				dom.text(clickedInner),
				dom.text(" times")
			),
			//events
			clickEventInner
		),
		dom.text("Clicked: "),
		dom.text(clickedOuter),
		dom.text(" times"),
		//events
		clickEventOuter
	);

	//attach
	dom.attach(document.body, h1);
	//source
	source('https://github.com/stanislavhacker/Reactive/blob/master/dom/examples/events/example.js');
	//item
	dom.attach(document.body, item);
}());
