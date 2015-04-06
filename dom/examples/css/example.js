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
				dom.cssProperty(CssPropertyType.BACKGROUND_COLOR, "red")
			),
			dom.cssProperty(CssPropertyType.DISPLAY, "block"),
			dom.cssProperty(CssPropertyType.WIDTH, "200px"),
			dom.cssProperty(CssPropertyType.HEIGHT, "200px"),
			dom.cssProperty(CssPropertyType.COLOR, "white"),
			dom.cssProperty(CssPropertyType.BACKGROUND_COLOR, "gray"),
			dom.cssProperty(CssPropertyType.BORDER, "1px solid black")
		),
		dom.div(
			dom.classes("text"),
			dom.css(
				dom.cssProperty(CssPropertyType.TEXT_ALIGN, "center"),
				dom.cssProperty(CssPropertyType.MARGIN_TOP, "50px")
			),
			dom.text("Hover on me!")
		)
	);

	//create hover
	hover = dom.cssGroup(":hover",
		dom.cssProperty(CssPropertyType.BACKGROUND_COLOR, "black")
	);

	//create square 2
	squareTwo = dom.div(
		dom.classes("square", "outer"),
		dom.css(
			hover,
			dom.cssProperty(CssPropertyType.DISPLAY, "inline-block"),
			dom.cssProperty(CssPropertyType.PADDING, "20px"),
			dom.cssProperty(CssPropertyType.BACKGROUND_COLOR, "blue"),
			dom.cssProperty(CssPropertyType.MARGIN_TOP, "20px")
		),
		dom.div(
			dom.classes("square", "inner"),
			dom.css(
				hover,
				dom.cssProperty(CssPropertyType.DISPLAY, "inline-block"),
				dom.cssProperty(CssPropertyType.PADDING, "20px"),
				dom.cssProperty(CssPropertyType.BACKGROUND_COLOR, "red")
			),
			dom.div(
				dom.classes("square", "last"),
				dom.css(
					hover,
					dom.cssProperty(CssPropertyType.DISPLAY, "block"),
					dom.cssProperty(CssPropertyType.WIDTH, "200px"),
					dom.cssProperty(CssPropertyType.HEIGHT, "200px"),
					dom.cssProperty(CssPropertyType.BACKGROUND_COLOR, "green")
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