/*globals dom*/
(function () {
	"use strict";

	/**
	 * Simulate event
	 * @param {HTMLElement} element
	 * @param {string} type
	 * @return {Event}
	 */
	function simulateMouse(element, type) {
		var evt = document.createEvent("MouseEvent");
		//noinspection JSDeprecatedSymbols
		evt.initMouseEvent(
			type,
			/* bubble */
			true,
			/* cancelable */
			true,
			window,
			null,
			/* coordinates */
			0, 0, 0, 0,
			/* modifier keys */
			false, false, false, false,
			/*left*/
			0,
			null
		);
		element.dispatchEvent(evt);
		return evt;
	}

	describe("Dom event simple function", function () {

		it("bind click event", function () {
			var div,
				clicked = 0,
				active = dom.div(
					dom.event(EventType.MouseDown, function () {
						clicked++;
					})
				);

			expect(clicked).toBe(0);

			//append to body
			div = dom.div(active);
			dom.attach(document.body, div);

			simulateMouse(active.element, "mousedown");
			expect(clicked).toBe(1);

			simulateMouse(active.element, "click");
			expect(clicked).toBe(1);

			simulateMouse(div.element, "mousedown");
			expect(clicked).toBe(1);

			div.remove();
		});

		it("enable / disable", function () {
			var div,
				clicked = 0,
				event = dom.event(EventType.MouseDown, function () {
					clicked++;
				}),
				active = dom.div(event);

			expect(clicked).toBe(0);
			expect(event.isActive()).toBe(true);

			//append to body
			div = dom.div(active);
			dom.attach(document.body, div);

			expect(event.isActive()).toBe(true);

			simulateMouse(active.element, "mousedown");
			expect(clicked).toBe(1);

			event.disable();
			expect(event.isActive()).toBe(false);

			simulateMouse(active.element, "mousedown");
			expect(clicked).toBe(1);

			event.enable();
			expect(event.isActive()).toBe(true);

			simulateMouse(active.element, "mousedown");
			expect(clicked).toBe(2);

			div.remove();
		});

		it("trigger mousedown", function () {
			var div,
				createdEvent,
				givenEvent = null,
				event = dom.event(EventType.MouseDown, function (evnt) {
					givenEvent = evnt;
				}),
				active = dom.div(event);

			//append to body
			div = dom.div(active);
			dom.attach(document.body, div);

			expect(givenEvent).toBe(null);

			createdEvent = simulateMouse(active.element, "mousedown");
			expect(givenEvent.getEvent()).toBe(createdEvent);
			expect(givenEvent instanceof dom.events.EventMessage).toBe(true);

			event.trigger(null);
			expect(givenEvent).toBe(null);

			div.remove();
		});

		it("trigger mousedown - propagation", function () {
			var div,
				called = 0,
				eventOne = dom.event(EventType.MouseDown, function () {
					called += 1;
				}),
				eventTwo = dom.event(EventType.MouseDown, function () {
					called += 10;
				}),
				active = dom.div(eventOne);

			//append to body
			div = dom.div(active, eventTwo);
			dom.attach(document.body, div);

			simulateMouse(active.element, "mousedown");
			expect(called).toBe(11);

			simulateMouse(active.element, "mousedown");
			expect(called).toBe(22);

			simulateMouse(div.element, "mousedown");
			expect(called).toBe(32);

			div.remove();
		});

		it("trigger mousedown - stop propagation", function () {
			var div,
				called = 0,
				eventOne = dom.event(EventType.MouseDown, function () {
					called += 1;
					return true;
				}),
				eventTwo = dom.event(EventType.MouseDown, function () {
					called += 10;
				}),
				active = dom.div(eventOne);

			//append to body
			div = dom.div(active, eventTwo);
			dom.attach(document.body, div);

			simulateMouse(active.element, "mousedown");
			expect(called).toBe(1);

			simulateMouse(active.element, "mousedown");
			expect(called).toBe(2);

			simulateMouse(div.element, "mousedown");
			expect(called).toBe(12);

			simulateMouse(active.element, "mouseup");

			div.remove();
		});

		it("trigger change", function () {
			var div,
				builder,
				createdEvent,
				givenEvent = null,
				event = dom.event(EventType.Change, function (evnt) {
					givenEvent = evnt;
				}),
				active = dom.input(event, dom.attr('type', 'checkbox'));
			//append to body
			div = dom.div(active);
			dom.attach(document.body, div);

			builder = new dom.builder.Event(active);
			//noinspection JSAccessibilityCheck
			createdEvent = builder.createEvent(event, active, null);
			expect(createdEvent.getEvent()).toBe(null);
			expect(createdEvent instanceof dom.events.ChangeEventMessage).toBe(true);
			expect(createdEvent.newValue.getValue()).toBe("");
			expect(createdEvent.checked.getValue()).toBe(false);

			div.remove();
		});

		describe("trigger mouse events", function () {

			it("trigger mouse basic", function () {
				var div,
					builder,
					createdEvent,
					givenEvent = null,
					event = dom.event(EventType.Click, function (evnt) {
						givenEvent = evnt;
					}),
					active = dom.div(event);
				//append to body
				div = dom.div(active);
				dom.attach(document.body, div);

				builder = new dom.builder.Event(active);
				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {});
				expect(createdEvent.getEvent()).not.toBe(null);
				expect(createdEvent instanceof dom.events.MouseEventMessage).toBe(true);
				expect(createdEvent.buttons instanceof dom.events.mouse.Buttons);
				expect(createdEvent.positions instanceof dom.events.mouse.Position);
				expect(createdEvent.modifiers instanceof dom.events.key.Modifiers);
				expect(createdEvent.wheel).toBe(0);

				div.remove();
			});

			it("trigger mouse basic - otjer event", function () {
				var div,
					builder,
					createdEvent,
					givenEvent = null,
					event = dom.event(EventType.MouseMove, function (evnt) {
						givenEvent = evnt;
					}),
					active = dom.div(event);
				//append to body
				div = dom.div(active);
				dom.attach(document.body, div);

				builder = new dom.builder.Event(active);
				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {});
				expect(createdEvent.getEvent()).not.toBe(null);
				expect(createdEvent instanceof dom.events.MouseEventMessage).toBe(true);
				expect(createdEvent.buttons instanceof dom.events.mouse.Buttons);
				expect(createdEvent.positions instanceof dom.events.mouse.Position);
				expect(createdEvent.modifiers instanceof dom.events.key.Modifiers);
				expect(createdEvent.wheel).toBe(0);

				div.remove();
			});

			it("buttons fill test - which", function () {
				var createdEvent,
					event = dom.event(EventType.Click, function (evnt) {}),
					active = dom.div(event),
					builder = new dom.builder.Event(active);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					which: 1
				});
				expect(createdEvent.buttons.left).toBe(true);
				expect(createdEvent.buttons.right).toBe(false);
				expect(createdEvent.buttons.middle).toBe(false);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					which: 2
				});
				expect(createdEvent.buttons.left).toBe(false);
				expect(createdEvent.buttons.right).toBe(false);
				expect(createdEvent.buttons.middle).toBe(true);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					which: 3
				});
				expect(createdEvent.buttons.left).toBe(false);
				expect(createdEvent.buttons.right).toBe(true);
				expect(createdEvent.buttons.middle).toBe(false);

			});

			it("buttons fill test - button", function () {
				var createdEvent,
					event = dom.event(EventType.Click, function (evnt) {}),
					active = dom.div(event),
					builder = new dom.builder.Event(active);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					button: 0
				});
				expect(createdEvent.buttons.left).toBe(false);
				expect(createdEvent.buttons.right).toBe(false);
				expect(createdEvent.buttons.middle).toBe(false);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					button: 1
				});
				expect(createdEvent.buttons.left).toBe(true);
				expect(createdEvent.buttons.right).toBe(false);
				expect(createdEvent.buttons.middle).toBe(false);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					button: 2
				});
				expect(createdEvent.buttons.left).toBe(false);
				expect(createdEvent.buttons.right).toBe(true);
				expect(createdEvent.buttons.middle).toBe(false);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					button: 3
				});
				expect(createdEvent.buttons.left).toBe(true);
				expect(createdEvent.buttons.right).toBe(true);
				expect(createdEvent.buttons.middle).toBe(false);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					button: 4
				});
				expect(createdEvent.buttons.left).toBe(false);
				expect(createdEvent.buttons.right).toBe(false);
				expect(createdEvent.buttons.middle).toBe(true);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					button: 5
				});
				expect(createdEvent.buttons.left).toBe(true);
				expect(createdEvent.buttons.right).toBe(false);
				expect(createdEvent.buttons.middle).toBe(true);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					button: 6
				});
				expect(createdEvent.buttons.left).toBe(false);
				expect(createdEvent.buttons.right).toBe(true);
				expect(createdEvent.buttons.middle).toBe(true);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					button: 7
				});
				expect(createdEvent.buttons.left).toBe(true);
				expect(createdEvent.buttons.right).toBe(true);
				expect(createdEvent.buttons.middle).toBe(true);


			});

			it("wheel fill test", function () {
				var createdEvent,
					event = dom.event(EventType.Click, function (evnt) {}),
					active = dom.div(event),
					builder = new dom.builder.Event(active);

				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					wheelDelta: 120
				});
				expect(createdEvent.wheel).toBe(120);
				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					wheelDelta: 240
				});
				expect(createdEvent.wheel).toBe(240);
				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					detail: -3
				});
				expect(createdEvent.wheel).toBe(120);
				//noinspection JSAccessibilityCheck
				createdEvent = builder.createEvent(event, active, {
					detail: -6
				});
				expect(createdEvent.wheel).toBe(240);

			});

		});

		it("unbind click event", function () {
			var div,
				clicked = 0,
				active = dom.div(
					dom.event(EventType.MouseDown, function () {
						clicked++;
					})
				);

			expect(clicked).toBe(0);

			//append to body
			div = dom.div(active);
			dom.attach(document.body, div);

			simulateMouse(active.element, "mousedown");
			expect(clicked).toBe(1);
			simulateMouse(active.element, "mousedown");
			expect(clicked).toBe(2);

			div.remove();

			simulateMouse(active.element, "mousedown");
			expect(clicked).toBe(2);
		});

	});

	describe("Dom event message", function () {

		it("message", function () {
			var message = new dom.events.EventMessage(EventType.MouseMove, null);
			expect(message.getEvent()).toBe(null);
			expect(message.getType()).toBe('mousemove');
		});

		it("message change", function () {
			var message = new dom.events.ChangeEventMessage(EventType.Change, null);
			expect(message.getEvent()).toBe(null);
			expect(message.getType()).toBe('change');
			expect(message.newValue instanceof dom.data.Contract);
			expect(message.checked instanceof dom.data.Contract);
		});

		it("message mouse", function () {
			var message = new dom.events.MouseEventMessage(EventType.MouseMove, null);
			expect(message.getEvent()).toBe(null);
			expect(message.getType()).toBe('mousemove');
			expect(message.buttons instanceof dom.events.mouse.Buttons);
			expect(message.positions instanceof dom.events.mouse.Position);
			expect(message.modifiers instanceof dom.events.key.Modifiers);
			expect(message.wheel).toBe(0);
		});

	});

}());
