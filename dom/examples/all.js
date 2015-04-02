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
			dom.cssGroup("a",
				dom.cssProperty(dom.sheets.CssPropertyType.COLOR, "black")
			),
			dom.cssProperty(dom.sheets.CssPropertyType.DISPLAY, "block"),
			dom.cssProperty(dom.sheets.CssPropertyType.WIDTH, "100%"),
			dom.cssProperty(dom.sheets.CssPropertyType.TEXT_ALIGN, "center"),
			dom.cssProperty(dom.sheets.CssPropertyType.COLOR, "black"),
			dom.cssProperty(dom.sheets.CssPropertyType.FONT_STYLE, "italic")
		),
		dom.a(
			dom.attr('href', link),
			dom.attr('target', '_blank'),
			dom.text('view source code')
		)
	);
	dom.attach(document.body, a);
}
