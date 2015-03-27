/*globals dom*/
(function () {
	"use strict";

	describe("Dom basic css operation", function () {

		describe("simple cssProperty generator", function () {

			it("static", function () {
				var css = dom.cssProperty("border-size", "2px");

				expect(css.getName()).toBe("border-size");
				expect(css.getValue()).toBe("2px");
			});

			it("dynamic", function () {
				var value = dom.contract("2px"),
					css = dom.cssProperty("border-size", value);

				expect(css.getName()).toBe("border-size");
				expect(css.getValue()).toBe("2px");
				value.setValue("3px");
				expect(css.getName()).toBe("border-size");
				expect(css.getValue()).toBe("3px");
			});

		});

		describe("simple cssGroup generator", function () {

			it("static", function () {
				var css = dom.cssGroup(":hover",
					dom.cssProperty("border-size", "2px"),
					dom.cssProperty("border-color", "red")
				);

				expect(css.getName()).toBe(":hover");
				expect(css.getCss().length).toBe(2);
			});

			it("dynamic error", function () {
				var value = dom.contract("2px"),
					css;

				expect(function() {
					css = dom.cssGroup(":hover",
						dom.cssProperty("border-size", value),
						dom.cssProperty("border-color", "red")
					);
				}).toThrow('You can not set changeable css property into group!');
			});

		});

		describe("simple css generator", function () {

			it("static", function () {
				var css = dom.css(
					dom.cssProperty("border-size", "2px"),
					dom.cssProperty("border-color", "red")
				);

				expect(css.elements.elements.length).toBe(0);
				expect(css.getCss().length).toBe(2);
			});

		});

		it("dom.sheets.CssProperty.createJsName", function () {
			expect(dom.sheets.CssProperty.createJsName("border-size")).toBe('borderSize');
			expect(dom.sheets.CssProperty.createJsName("borderSize")).toBe('borderSize');
			expect(dom.sheets.CssProperty.createJsName("border")).toBe('border');
			expect(dom.sheets.CssProperty.createJsName("border-size-top")).toBe('borderSizeTop');
			expect(dom.sheets.CssProperty.createJsName("-webkit-transform")).toBe('webkitTransform');

		});

	});

	describe("Dom basic css generating", function () {

		it("get css with id", function () {
			var el,
				rules,
				div = dom.div(
				dom.attr("id", "test"),
				dom.css(
					dom.cssProperty(dom.sheets.CssPropertyType.DISPLAY, "block"),
					dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "red"),
					dom.cssProperty(dom.sheets.CssPropertyType.WIDTH, "200px"),
					dom.cssProperty(dom.sheets.CssPropertyType.HEIGHT, "180px"),
					dom.cssGroup(":hover",
						dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "blue")
					)
				)
			);

			el = document.createElement('div');
			document.body.appendChild(el);

			dom.attach(el, div);
			rules = div.cssRules;
			expect(rules.length).toBe(2);
			expect(rules[0].name).toBe('#test:hover');
			expect(rules[0].getRuleString()).toBe('#test:hover {background: blue}\n');
			expect(rules[1].name).toBe('#test');
			expect(rules[1].getRuleString()).toBe('#test {display: block;background: red;width: 200px;height: 180px}\n');

			div.remove();
		});

		it("get css with classes", function () {
			var rules,
				div = dom.div(
					dom.classes("square"),
					dom.css(
						dom.cssProperty(dom.sheets.CssPropertyType.DISPLAY, "block"),
						dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "red"),
						dom.cssProperty(dom.sheets.CssPropertyType.WIDTH, "200px"),
						dom.cssProperty(dom.sheets.CssPropertyType.HEIGHT, "180px"),
						dom.cssGroup(":hover",
							dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "blue")
						)
					)
				);

			dom.attach(document.body, div);
			rules = div.cssRules;
			expect(rules.length).toBe(2);
			expect(rules[0].name).toBe('.square:hover');
			expect(rules[0].getRuleString()).toBe('.square:hover {background: blue}\n');
			expect(rules[1].name).toBe('.square');
			expect(rules[1].getRuleString()).toBe('.square {display: block;background: red;width: 200px;height: 180px}\n');

			div.remove();
		});

		it("get css with tag", function () {
			var rules,
				div = dom.div(
					dom.css(
						dom.cssProperty(dom.sheets.CssPropertyType.DISPLAY, "block"),
						dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "red"),
						dom.cssProperty(dom.sheets.CssPropertyType.WIDTH, "200px"),
						dom.cssProperty(dom.sheets.CssPropertyType.HEIGHT, "180px"),
						dom.cssGroup(":hover",
							dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "blue")
						)
					)
				);

			dom.attach(document.body, div);
			rules = div.cssRules;
			expect(rules.length).toBe(2);
			expect(rules[0].name).toBe('div:hover');
			expect(rules[0].getRuleString()).toBe('div:hover {background: blue}\n');
			expect(rules[1].name).toBe('div');
			expect(rules[1].getRuleString()).toBe('div {display: block;background: red;width: 200px;height: 180px}\n');

			div.remove();
		});

	});

	describe("Dom complex css generating", function () {

		it("Two divs inside", function () {
			var divOne,
				divTwo;
			//one
			divOne = dom.div(
				dom.classes("test"),
				dom.css(
					dom.cssProperty(dom.sheets.CssPropertyType.DISPLAY, "block"),
					dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "purple"),
					dom.cssProperty(dom.sheets.CssPropertyType.WIDTH, "20px"),
					dom.cssProperty(dom.sheets.CssPropertyType.HEIGHT, "18px"),
					dom.cssGroup(":hover",
						dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "yellow")
					)
				)
			);
			//two
			divTwo = dom.div(
				dom.classes("test"),
				dom.css(
					dom.cssProperty(dom.sheets.CssPropertyType.DISPLAY, "block"),
					dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "red"),
					dom.cssProperty(dom.sheets.CssPropertyType.WIDTH, "200px"),
					dom.cssProperty(dom.sheets.CssPropertyType.HEIGHT, "180px"),
					dom.cssGroup(":hover",
						dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "blue")
					)
				),
				divOne
			);

			//insert
			dom.attach(document.body, divTwo);

			expect(divOne.cssRules.length).toBe(2);
			expect(divTwo.cssRules.length).toBe(2);

			expect(divOne.cssRules[0].getRuleName()).toBe('BODY .test .test:hover');
			expect(divOne.cssRules[1].getRuleName()).toBe('BODY .test .test');

			expect(divTwo.cssRules[0].getRuleName()).toBe('.test:hover');
			expect(divTwo.cssRules[1].getRuleName()).toBe('.test');

			//try to create again
			expect(function () {
				new dom.builder.Css(divOne).getCss();
			}).toThrow("There is duplicate rule named 'BODY .test .test:hover'. You mas specify one of element that is used on this path.");

			divOne.remove();
			divTwo.remove();
		});

	});

}());
