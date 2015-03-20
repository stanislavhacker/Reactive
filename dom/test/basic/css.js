/*globals dom*/
(function () {

	describe("Dom basic css operation", function () {

		describe("simple cssProperty generator", function () {

			it("static", function () {
				var css = dom.cssProperty("borderSize", "2px");

				expect(css.getName()).toBe("borderSize");
				expect(css.getValue()).toBe("2px");
			});

			it("dynamic", function () {
				var value = dom.contract("2px"),
					css = dom.cssProperty("borderSize", value);

				expect(css.getName()).toBe("borderSize");
				expect(css.getValue()).toBe("2px");
				value.setValue("3px");
				expect(css.getName()).toBe("borderSize");
				expect(css.getValue()).toBe("3px");
			});

		});

		describe("simple cssGroup generator", function () {

			it("static", function () {
				var css = dom.cssGroup(":hover",
					dom.cssProperty("borderSize", "2px"),
					dom.cssProperty("borderColor", "red")
				);

				expect(css.getName()).toBe(":hover");
				expect(css.getCss().length).toBe(2);
			});

			it("dynamic error", function () {
				var value = dom.contract("2px"),
					css;

				expect(function() {
					css = dom.cssGroup(":hover",
						dom.cssProperty("borderSize", value),
						dom.cssProperty("borderColor", "red")
					);
				}).toThrow('You can not set changeable css property into group!');
			});

		});

		describe("simple css generator", function () {

			it("static", function () {
				var css = dom.css(
					dom.cssProperty("borderSize", "2px"),
					dom.cssProperty("borderColor", "red")
				);

				expect(css.elements.elements.length).toBe(0);
				expect(css.getCss().length).toBe(2);
			});

		});

	});

}());
