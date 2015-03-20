/*globals dom*/
(function () {

	describe("Dom helper methods", function () {


		describe("html", function () {

			it("dom.div", function () {
				var div = dom.div();
				expect(div.getHtml()).toBe('<div></div>');
			});

			it("dom.span", function () {
				var div = dom.span();
				expect(div.getHtml()).toBe('<span></span>');
			});

			it("dom.text", function () {
				var div = dom.text("Test");
				expect(div.getHtml()).toBe('Test');
			});

			it("dom.attr", function () {
				var attr = dom.attr("id", "test");
				expect(attr.elements.elements.length).toBe(0);
				expect(attr.getName()).toBe('id');
				expect(attr.getValue()).toBe('test');
			});

			it("dom.dataAttr", function () {
				var attr = dom.dataAttr("id", "test");
				expect(attr.elements.elements.length).toBe(0);
				expect(attr.getName()).toBe('data-id');
				expect(attr.getValue()).toBe('test');
			});

			it("dom.classes", function () {
				var classes = dom.classes("circle", "red", "clickable"),
					cls = classes.getClasses();
				expect(classes.elements.elements.length).toBe(0);
				expect(cls.length).toBe(3);
				expect(cls[0]).toBe('circle');
				expect(cls[1]).toBe('red');
				expect(cls[2]).toBe('clickable');
			});

		});

		describe("css", function () {

			it("dom.cssProperty", function () {
				var prop = dom.cssProperty("borderSize", "2px");
				expect(prop.elements.elements.length).toBe(0);
				expect(prop.getName()).toBe('borderSize');
				expect(prop.getValue()).toBe('2px');
				expect(prop.isChangeable()).toBe(false);
			});

			it("dom.cssGroup", function () {
				var prop = dom.cssGroup(":hover",
					dom.cssProperty("borderSize", "2px"),
					dom.cssProperty("borderColor", "red")
				);
				expect(prop.elements.elements.length).toBe(0);
				expect(prop.getName()).toBe(':hover');
				expect(prop.getCss().length).toBe(2);
			});

			it("dom.css", function () {
				var prop = dom.css(
					dom.cssProperty("borderSize", "2px"),
					dom.cssProperty("borderColor", "red")
				);
				expect(prop.elements.elements.length).toBe(0);
				expect(prop.getCss().length).toBe(2);
			});

		});

		describe("data", function () {

			it("dom.contract", function () {
				var data = dom.contract("test");
				expect(data.getValue()).toBe("test");
				data.setValue("test2");
				expect(data.getValue()).toBe("test2");
			});

		});

	});

}());
