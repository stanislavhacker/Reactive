/*globals dom*/
(function () {
	"use strict";

	describe("Css generator", function () {

		afterEach(function () {
			var style = document.getElementById(dom.builder.CssStyleType.GENERATED);
			style.textContent = "";
			dom.cssGenerator().elements = [];
		});

		it("simple css generate", function () {
			var css,
				element = dom.div(
				dom.attr('id', "test"),
				dom.css(
					dom.cssProperty(CssPropertyType.BORDER, "1px solid black")
				)
			);
			dom.cssGenerator().register(element);

			css = dom.cssGenerator().getProductionCss().split("\n");
			expect(css.length).toBe(2);
			expect(css[0]).toBe('#test {border: 1px solid black}');
		});

		it("group css generate", function () {
			var css,
				element = dom.div(
					dom.attr('id', "test1"),
					dom.css(
						dom.cssGroup(":hover",
							dom.cssProperty(CssPropertyType.BORDER, "1px solid red")
						),
						dom.cssProperty(CssPropertyType.BORDER, "1px solid black")
					)
				);
			dom.cssGenerator().register(element);

			css = dom.cssGenerator().getProductionCss().split("\n");
			expect(css.length).toBe(3);
			expect(css[0]).toBe('#test1:hover {border: 1px solid red}');
			expect(css[1]).toBe('#test1 {border: 1px solid black}');
		});

	});

}());