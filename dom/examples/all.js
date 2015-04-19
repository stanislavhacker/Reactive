/*globals dom*/
/**
 * Link
 * @param {string} link
 */
function source(link) {
	"use strict";

	//source
	var a = dom.div(
		dom.classes("source-code"),
		dom.css(
			dom.cssProperty(CssPropertyType.DISPLAY, "block"),
			dom.cssProperty(CssPropertyType.WIDTH, "100%"),
			dom.cssProperty(CssPropertyType.TEXT_ALIGN, "center"),
			dom.cssProperty(CssPropertyType.COLOR, "black"),
			dom.cssProperty(CssPropertyType.FONT_STYLE, "italic")
		),
		dom.a(
			dom.css(
				dom.cssProperty(CssPropertyType.COLOR, "black")
			),
			dom.attr('href', link),
			dom.attr('target', '_blank'),
			dom.text('view source code')
		)
	);
	dom.attach(document.body, a);
}


/**
 * Event visualizer
 * @param {*} event
 * @return {string}
 */
function eventVisualiser(event) {
	var key;

	//noinspection JSValidateTypes
	event.event = event.event.toString();
	delete event.handledBy;
	//contract change
	for (key in event) {
		if (event.hasOwnProperty(key)) {
			if (event[key] instanceof dom.data.Contract) {
				event[key] = "[object dom.data.Contract] (value: " + event[key].getValue() + ")";
			}
		}
	}
	return JSON.stringify(event, null, "  ");
}
