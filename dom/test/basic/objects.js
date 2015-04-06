/*globals dom*/
(function () {
	"use strict";

	describe("Dom objects", function () {

		it("dom.html.TextElement", function () {
			var el = new dom.html.TextElement("test");

			expect(el.isEmpty()).toBe(true);
			expect(el.getValue ()).toBe("test");
			expect(el.setAttribute("test", "test")).toBe(undefined);
			expect(el.setCssProperty ("test", "test")).toBe(undefined);
			expect(el.setClassName(["test"])).toBe(undefined);

		});

		it("dom.Element", function () {
			var el = new dom.Element();

			expect(el.elements).toBeDefined();
			expect(el.parent).toBe(null);

		});

		it("dom.data.UnboundContract", function () {
			//noinspection JSAccessibilityCheck
			var el = new dom.data.UnboundContract();

			//noinspection JSAccessibilityCheck
			expect(el.addChangeEvent()).toBe(undefined);
			//noinspection JSAccessibilityCheck
			expect(el.removeChangeEvent()).toBe(undefined);

		});

		it("dom.utils.logger", function () {
			dom.utils.logger(LoggerType.INFO, "Test info");
			expect(function () {
				dom.utils.logger("xx", "Test info");
			}).toThrow();
		});

	});

}());
