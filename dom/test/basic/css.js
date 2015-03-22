/*globals dom*/
(function () {

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
			var rules,
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

			rules = div.getCssRules();
			expect(rules.length).toBe(2);
			expect(rules[0].name).toBe('#test:hover');
			expect(rules[0].getRuleString()).toBe('#test:hover {background: blue}\n');
			expect(rules[1].name).toBe('#test');
			expect(rules[1].getRuleString()).toBe('#test {display: block;background: red;width: 200px;height: 180px}\n');
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

			rules = div.getCssRules();
			expect(rules.length).toBe(2);
			expect(rules[0].name).toBe('.square:hover');
			expect(rules[0].getRuleString()).toBe('.square:hover {background: blue}\n');
			expect(rules[1].name).toBe('.square');
			expect(rules[1].getRuleString()).toBe('.square {display: block;background: red;width: 200px;height: 180px}\n');
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

			rules = div.getCssRules();
			expect(rules.length).toBe(2);
			expect(rules[0].name).toBe('div:hover');
			expect(rules[0].getRuleString()).toBe('div:hover {background: blue}\n');
			expect(rules[1].name).toBe('div');
			expect(rules[1].getRuleString()).toBe('div {display: block;background: red;width: 200px;height: 180px}\n');
		});

	});

}());
