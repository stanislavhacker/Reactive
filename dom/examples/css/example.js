/*globals dom, source*/
(function () {
	"use strict";

	var h1,
		hover,
		squareOne,
		squareTwo;

	//title
	h1 = dom.h1(dom.text('Css example - generating css'));

	//create square 1
	squareOne = dom.div(
		dom.classes("square1"),
		dom.css(
			dom.cssGroup(":hover",
				dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND_COLOR, "red")
			),
			dom.cssProperty(dom.sheets.CssPropertyType.DISPLAY, "block"),
			dom.cssProperty(dom.sheets.CssPropertyType.WIDTH, "200px"),
			dom.cssProperty(dom.sheets.CssPropertyType.HEIGHT, "200px"),
			dom.cssProperty(dom.sheets.CssPropertyType.COLOR, "white"),
			dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND_COLOR, "gray"),
			dom.cssProperty(dom.sheets.CssPropertyType.BORDER, "1px solid black")
		),
		dom.div(
			dom.classes("text"),
			dom.css(
				dom.cssProperty(dom.sheets.CssPropertyType.TEXT_ALIGN, "center"),
				dom.cssProperty(dom.sheets.CssPropertyType.MARGIN_TOP, "50px")
			),
			dom.text("Hover on me!")
		)
	);

	//create hover
	hover = dom.cssGroup(":hover",
		dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND_COLOR, "black")
	);

	//create square 2
	squareTwo = dom.div(
		dom.classes("square", "outer"),
		dom.css(
			hover,
			dom.cssProperty(dom.sheets.CssPropertyType.DISPLAY, "inline-block"),
			dom.cssProperty(dom.sheets.CssPropertyType.PADDING, "20px"),
			dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND_COLOR, "blue"),
			dom.cssProperty(dom.sheets.CssPropertyType.MARGIN_TOP, "20px")
		),
		dom.div(
			dom.classes("square", "inner"),
			dom.css(
				hover,
				dom.cssProperty(dom.sheets.CssPropertyType.DISPLAY, "inline-block"),
				dom.cssProperty(dom.sheets.CssPropertyType.PADDING, "20px"),
				dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND_COLOR, "red")
			),
			dom.div(
				dom.classes("square", "last"),
				dom.css(
					hover,
					dom.cssProperty(dom.sheets.CssPropertyType.DISPLAY, "block"),
					dom.cssProperty(dom.sheets.CssPropertyType.WIDTH, "200px"),
					dom.cssProperty(dom.sheets.CssPropertyType.HEIGHT, "200px"),
					dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND_COLOR, "green")
				)
			)
		)
	);

	//attach
	dom.attach(document.body, h1);
	//source
	source('https://github.com/stanislavhacker/Reactive/blob/master/dom/examples/css/example.js');
	dom.attach(document.body, squareOne);
	dom.attach(document.body, squareTwo);

}());