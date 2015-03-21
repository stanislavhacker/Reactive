/*globals dom*/
(function () {

	describe("Dom renderer object", function () {

		/**
		 * Spawn functions
		 * @param {dom.render.Renderer} renderer
		 * @param {number} count
		 */
		function spawnFunctions(renderer, count) {
			var i;
			for (i = 0; i < count; i++) {
				//noinspection JSAccessibilityCheck
				renderer.render(dom.div(), function () {});
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
				//noinspection JSAccessibilityCheck
				renderer.render(dom.div(), function () {
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

			spawnFunctions(renderer, 15);

			//noinspection JSAccessibilityCheck
			expect(renderer.changed.calls.count()).toBe(15);
			//noinspection JSAccessibilityCheck
			expect(renderer.spawnTimer.calls.count()).toBe(1);

			interval = setInterval(function () {
				//noinspection JSAccessibilityCheck
				if (renderer.spawnTimer.calls.count() === 2) {

					expect(renderer.MAX_IN_STEP).toBe(100);
					expect(renderer.MAX_TIME).toBe(50);

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

					//noinspection JSAccessibilityCheck
					expect(renderer.changed.calls.count()).toBe(9);
					//noinspection JSAccessibilityCheck
					expect(renderer.spawnTimer.calls.count()).toBe(5);

					clearInterval(interval);

					done();
				}
			}, 30);


		}, 3000);

	});

	describe("Dom renderer queue", function () {

	});

}());
