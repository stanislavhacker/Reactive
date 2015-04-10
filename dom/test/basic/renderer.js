/*globals dom*/
(function () {
	"use strict";

	describe("Dom renderer object", function () {

		/**
		 * Spawn functions
		 * @param {dom.render.Renderer} renderer
		 * @param {number} count
		 */
		function spawnFunctions(renderer, count) {
			var i;
			for (i = 0; i < count; i++) {
				renderer.render(dom.div(), Math.random().toString(36), function () {});
			}
		}

		/**
		 * Spawn functions
		 * @param {dom.render.Renderer} renderer
		 * @param {number} count
		 */
		function spawnLongFunctions(renderer, count) {
			var i;
			for (i = 0; i < count; i++) {
				renderer.render(dom.div(), Math.random().toString(36), function () {
					var i,
						data = [];
					for (i = 0; i < 100000; i++) {
						data.push("#");
					}
				});
			}
		}


		it("render small amount of function", function () {
			var renderer = new dom.render.Renderer();

			spyOn(renderer, "changed").and.callThrough();
			spyOn(renderer, "spawnTimer").and.callThrough();

			spawnFunctions(renderer, 6);

			//noinspection JSAccessibilityCheck
			expect(renderer.changed.calls.count()).toBe(6);
			//noinspection JSAccessibilityCheck
			expect(renderer.spawnTimer.calls.count()).toBe(1);


		});

		it("render big amount of function", function (done) {
			var interval,
				renderer = new dom.render.Renderer();

			spyOn(renderer, "changed").and.callThrough();
			spyOn(renderer, "spawnTimer").and.callThrough();

			expect(renderer.MAX_IN_STEP).toBe(10);
			expect(renderer.MAX_TIME).toBe(50);
			expect(renderer.TIMER_SPAWN).toBe(30);

			spawnFunctions(renderer, 15);

			//noinspection JSAccessibilityCheck
			expect(renderer.changed.calls.count()).toBe(15);
			//noinspection JSAccessibilityCheck
			expect(renderer.spawnTimer.calls.count()).toBe(1);

			interval = setInterval(function () {
				//noinspection JSAccessibilityCheck
				if (renderer.spawnTimer.calls.count() === 2) {

					expect(renderer.MAX_IN_STEP).toBeGreaterThan(99);
					expect(renderer.MAX_TIME).toBe(50);
					expect(renderer.TIMER_SPAWN).toBe(30);

					clearInterval(interval);

					done();
				}
			}, 30);


		}, 1000);

		it("render long functions", function (done) {
			var interval,
				renderer = new dom.render.Renderer();

			//set new
			renderer.MAX_TIME = 1;

			spyOn(renderer, "changed").and.callThrough();
			spyOn(renderer, "spawnTimer").and.callThrough();

			expect(renderer.MAX_IN_STEP).toBe(10);
			expect(renderer.MAX_TIME).toBe(1);
			expect(renderer.TIMER_SPAWN).toBe(30);

			spawnLongFunctions(renderer, 5);

			//noinspection JSAccessibilityCheck
			expect(renderer.changed.calls.count()).toBe(5);
			//noinspection JSAccessibilityCheck
			expect(renderer.spawnTimer.calls.count()).toBe(1);

			interval = setInterval(function () {
				//noinspection JSAccessibilityCheck
				if (renderer.queue.count() === 0) {

					expect(renderer.MAX_IN_STEP).toBe(1);
					expect(renderer.MAX_TIME).toBe(1);
					expect(renderer.TIMER_SPAWN).toBe(150);

					//noinspection JSAccessibilityCheck
					expect(renderer.changed.calls.count()).toBe(9);
					//noinspection JSAccessibilityCheck
					expect(renderer.spawnTimer.calls.count()).toBe(5);

					clearInterval(interval);

					done();
				}
			}, 30);


		}, 3000);

		it("render only once", function () {
			var contract = dom.contract('test'),
				element = dom.div(dom.attr('id', contract));

			//render
			dom.attach(document.body, element);

			spyOn(element, "setAttribute").and.callThrough();

			expect(element.setAttribute.calls.count()).toBe(0);

			contract.setValue("test1");
			contract.setValue("test1");

			expect(element.setAttribute.calls.count()).toBe(1);

			element.remove();
		});

	});

	describe("Dom renderer queue", function () {

		it("basics", function () {
			var queue = new dom.render.Queue();

			expect(queue.length).toBe(0);
		});

		it("add into queue", function () {
			var elementOne = dom.div(),
				elementTwo = dom.div(),
				queue = new dom.render.Queue();

			queue.add(elementOne, "test1", function () {});
			queue.add(elementOne, "test2", function () {});
			expect(queue.length).toBe(1);
			expect(elementOne.updates.length).toBe(2);

			queue.add(elementTwo, "test1", function () {});
			queue.add(elementTwo, "test2", function () {});
			expect(queue.length).toBe(2);
			expect(elementTwo.updates.length).toBe(2);
		});

		it("get from queue", function () {
			var elementOne = dom.div(),
				elementTwo = dom.div(),
				queue = new dom.render.Queue();

			queue.add(elementOne, "test1", function () {});
			queue.add(elementOne, "test2", function () {});
			queue.add(elementTwo, "test3", function () {});
			queue.add(elementTwo, "test4", function () {});

			expect(queue.length).toBe(2);
			expect(elementOne.updates.length).toBe(2);
			expect(elementTwo.updates.length).toBe(2);

			queue.get();

			expect(queue.length).toBe(2);
			expect(elementOne.updates.length).toBe(1);
			expect(elementTwo.updates.length).toBe(2);

			queue.get();

			expect(queue.length).toBe(1);
			expect(elementOne.updates.length).toBe(0);
			expect(elementTwo.updates.length).toBe(2);

			queue.get();

			expect(queue.length).toBe(1);
			expect(elementOne.updates.length).toBe(0);
			expect(elementTwo.updates.length).toBe(1);

			queue.get();

			expect(queue.length).toBe(0);
			expect(elementOne.updates.length).toBe(0);
			expect(elementTwo.updates.length).toBe(0);
		});

		it("getFor from queue", function () {
			var elementOne = dom.div(),
				elementTwo = dom.div(),
				queue = new dom.render.Queue();

			queue.add(elementOne, "test1", function () {});
			queue.add(elementOne, "test2", function () {});
			queue.add(elementTwo, "test3", function () {});
			queue.add(elementTwo, "test4", function () {});

			expect(queue.length).toBe(2);
			expect(elementOne.updates.length).toBe(2);
			expect(elementTwo.updates.length).toBe(2);

			expect(queue.getFor(elementOne).length).toBe(2);

			expect(queue.length).toBe(1);
			expect(elementOne.updates.length).toBe(0);
			expect(elementTwo.updates.length).toBe(2);

			expect(queue.getFor(elementTwo).length).toBe(2);

			expect(queue.length).toBe(0);
			expect(elementOne.updates.length).toBe(0);
			expect(elementTwo.updates.length).toBe(0);
		});

	});

}());
