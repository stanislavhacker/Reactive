/*globals dom*/
(function () {
	"use strict";

	describe("Dom basic render", function () {

		var headless = navigator.userAgent.indexOf("PhantomJS") >= 0;

		describe("element with attribute", function () {

			it("static", function () {
				//noinspection JSCheckFunctionSignatures
				var div = dom.div(dom.attr('id', "circle"));
				expect(div.getHtml()).toBe('<div id="circle"></div>');
			});

			it("dynamic", function () {
				//noinspection JSCheckFunctionSignatures
				var variable = dom.contract("initValue"),
					div = dom.div(dom.attr('id', variable));

				expect(div.getHtml()).toBe('<div id="initValue"></div>');
				variable.setValue("test");
				expect(div.getHtml()).toBe('<div id="test"></div>');
			});

		});

		describe("element with data- attribute", function () {

			it("static", function () {
				//noinspection JSCheckFunctionSignatures
				var div = dom.div(dom.dataAttr('id', "circle"));
				expect(div.getHtml()).toBe('<div data-id="circle"></div>');
			});

			it("dynamic", function () {
				//noinspection JSCheckFunctionSignatures
				var variable = dom.contract("initValue"),
					div = dom.div(dom.dataAttr('id', variable));

				expect(div.getHtml()).toBe('<div data-id="initValue"></div>');
				variable.setValue("test");
				expect(div.getHtml()).toBe('<div data-id="test"></div>');
			});

		});

		describe("element with text node", function () {

			it("static", function () {
				//noinspection JSCheckFunctionSignatures
				var div = dom.div(dom.text('Hi George!'));
				expect(div.getHtml()).toBe('<div>Hi George!</div>');
			});

			it("dynamic", function () {
				//noinspection JSCheckFunctionSignatures
				var variable = dom.contract("Hi George!"),
					div = dom.div(dom.text(variable));

				expect(div.getHtml()).toBe('<div>Hi George!</div>');
				variable.setValue("Hi Lucas!");
				expect(div.getHtml()).toBe('<div>Hi Lucas!</div>');
			});

		});

		describe("element with classes", function () {

			it("static", function () {
				//noinspection JSCheckFunctionSignatures
				var div = dom.div(dom.classes("class1", "class2", "class3"));
				expect(div.getHtml()).toBe('<div class="class1 class2 class3"></div>');
			});

			it("dynamic", function () {
				//noinspection JSCheckFunctionSignatures
				var classOne = dom.contract("class1"),
					classTwo = dom.contract("class2"),
					div = dom.div(dom.classes(classOne, classTwo, "class3"));

				expect(div.getHtml()).toBe('<div class="class1 class2 class3"></div>');
				classOne.setValue("class10");
				expect(div.getHtml()).toBe('<div class="class10 class2 class3"></div>');
				classTwo.setValue("class20");
				expect(div.getHtml()).toBe('<div class="class10 class20 class3"></div>');
			});

		});

		describe("element with css", function () {

			it("static", function () {
				var div = dom.div(
					dom.attr('id', 'css'),
					dom.css(
						dom.cssGroup(":hover",
							dom.cssProperty(CssPropertyType.BORDER_COLOR, "blue")
						),
						dom.cssProperty(CssPropertyType.BORDER_COLOR, "red")
					)
				);

				expect(div.getHtml()).toBe('<div id="css"></div>');
			});

			it("dynamic", function () {
				var borderColor = dom.contract('red'),
					div = dom.div(
						dom.attr('id', 'css'),
						dom.css(
							dom.cssGroup(":hover",
								dom.cssProperty(CssPropertyType.BORDER_COLOR, "blue")
							),
							dom.cssProperty(CssPropertyType.BORDER_COLOR, borderColor)
						)
					);

				if (headless) {
					expect(div.getHtml()).toBe('<div id="css" style="border-top-color: red; border-right-color: red; border-bottom-color: red; border-left-color: red; "></div>');
				} else {
					expect(div.getHtml()).toBe('<div id="css" style="border-color: red;"></div>');
				}
				borderColor.setValue("yellow");
				if (headless) {
					expect(div.getHtml()).toBe('<div id="css" style="border-top-color: yellow; border-right-color: yellow; border-bottom-color: yellow; border-left-color: yellow; "></div>');
				} else {
					expect(div.getHtml()).toBe('<div id="css" style="border-color: yellow;"></div>');
				}
			});

			it("double css fail", function () {
				var div;

				expect(function () {
					div = dom.div(
						dom.css(
							dom.cssProperty(CssPropertyType.BORDER_COLOR, "test")
						),
						dom.css(
							dom.cssProperty(CssPropertyType.BORDER_COLOR, "test")
						)
					);
				}).toThrow('Can not set css twice on element.');
			});

		});

		describe("element with cssGroup", function () {

			it("div create without nothing", function () {
				var div = dom.div(
					dom.attr('id', 'css'),
					dom.cssGroup(":hover",
						dom.cssProperty(CssPropertyType.BORDER_COLOR, "blue")
					)
				);

				expect(div.getHtml()).toBe('<div id="css"></div>');
			});

		});


		describe("complex elements structure", function () {
			var color,
				title,
				name;

			beforeEach(function () {
				color = dom.contract("red");
				title =  dom.contract("This is title");
				name = dom.contract("Name");
			});

			it("dynamic", function () {
				var elementOne,
					elementTwo;

				//element one
				elementOne = dom.div(
					dom.classes("title", color),
					dom.attr("id", "main-title"),
					dom.text(title),
					dom.text(" for: "),
					dom.div(
						dom.classes("name", color),
						dom.span(
							dom.classes("inner"),
							dom.text(name)
						)
					)
				);

				//element two
				elementTwo = dom.span(
					dom.classes(color),
					dom.text("Hello. "),
					dom.text(title),
					dom.text(" for: "),
					dom.text(name)
				);

				expect(elementOne.getHtml()).toBe('<div id="main-title" class="title red">This is title for: <div class="name red"><span class="inner">Name</span></div></div>');
				expect(elementTwo.getHtml()).toBe('<span class="red">Hello. This is title for: Name</span>');

				color.setValue("blue");

				expect(elementOne.getHtml()).toBe('<div id="main-title" class="title blue">This is title for: <div class="name blue"><span class="inner">Name</span></div></div>');
				expect(elementTwo.getHtml()).toBe('<span class="blue">Hello. This is title for: Name</span>');

				name.setValue("Stanley");

				expect(elementOne.getHtml()).toBe('<div id="main-title" class="title blue">This is title for: <div class="name blue"><span class="inner">Stanley</span></div></div>');
				expect(elementTwo.getHtml()).toBe('<span class="blue">Hello. This is title for: Stanley</span>');


			});

		});

		describe("use element multiple times", function () {

			it("span use and change parent", function () {
				//noinspection JSCheckFunctionSignatures
				var divOne,
					divTwo,
					id = dom.attr('id', 'test'),
					span = dom.span(id, dom.text("Test"));

				expect(span.element).toBe(null);
				expect(span.parent).toBe(null);
				expect(span.getHtml()).toBe('<span id="test">Test</span>');
				expect(span.element.nodeType).toBe(1);
				expect(span.parent).toBe(null);
				expect(id.elements.elements.length).toBe(1);

				//noinspection JSCheckFunctionSignatures
				divOne = dom.div(span);
				expect(span.parent instanceof dom.html.Element).toBeTruthy();
				expect(divOne.children.length).toBe(1);
				expect(divOne.children[0]).toBe(span);
				expect(id.elements.elements.length).toBe(1);
				expect(divOne.getHtml()).toBe('<div><span id="test">Test</span></div>');

				//noinspection JSCheckFunctionSignatures
				divTwo = dom.div(span);
				expect(span.parent instanceof dom.html.Element).toBeTruthy();
				expect(id.elements.elements.length).toBe(1);
				expect(divTwo.getHtml()).toBe('<div><span id="test">Test</span></div>');
				expect(divTwo.children.length).toBe(1);
				expect(divTwo.children[0]).toBe(span);

				expect(divOne.getHtml()).toBe('<div></div>');
				expect(divOne.children.length).toBe(0);

			});

		});

		describe("remove element", function () {

			it("span remove and check usages", function () {
				//noinspection JSCheckFunctionSignatures
				var div,
					text = dom.text(dom.contract("Test")),
					id = dom.attr('id', 'test'),
					span = dom.span(id, text);

				expect(span.getHtml()).toBe('<span id="test">Test</span>');
				expect(id.elements.elements.length).toBe(1);
				expect(id.elements.elements[0]).toBe(span);

				//noinspection JSCheckFunctionSignatures
				div = dom.div(span);
				expect(div.children.length).toBe(1);
				expect(div.children[0]).toBe(span);
				expect(text.text.changeEvents.length).toBe(1);

				expect(div.getHtml()).toBe('<div><span id="test">Test</span></div>');

				span.remove();

				expect(div.getHtml()).toBe('<div></div>');
				expect(div.children.length).toBe(0);
				expect(id.elements.elements.length).toBe(0);
				expect(text.text.changeEvents.length).toBe(0);


			});

			it("span remove and check usages", function () {
				//noinspection JSCheckFunctionSignatures
				var div,
					classes = dom.classes("test", "one"),
					prop = dom.cssProperty("borderSize", "10px"),
					group = dom.cssGroup(":hover",
						dom.cssProperty("color", "red")
					),
					css = dom.css(prop, group),
					span = dom.span(classes, css);

				expect(span.getHtml()).toBe('<span class="test one"></span>');
				expect(classes.elements.elements.length).toBe(1);
				expect(classes.elements.elements[0]).toBe(span);
				expect(css.elements.elements.length).toBe(1);
				expect(css.elements.elements[0]).toBe(span);
				expect(prop.elements.elements.length).toBe(1);
				expect(prop.elements.elements[0]).toBe(css);

				//noinspection JSCheckFunctionSignatures
				div = dom.div(span);
				expect(div.getHtml()).toBe('<div><span class="test one"></span></div>');

				span.remove();

				expect(div.getHtml()).toBe('<div></div>');
				expect(div.children.length).toBe(0);
				expect(classes.elements.elements.length).toBe(0);
				expect(css.elements.elements.length).toBe(0);
				expect(prop.elements.elements.length).toBe(1); //element on property is css!!!!!

			});

		});

	});

}());
