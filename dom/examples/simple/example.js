/*globals dom*/
(function () {
	"use strict";

	var h1,
		div,
		frames = 0,
		fps = dom.contract(0),
		runtime = dom.contract(0),
		start = new Date().getTime();

	//title
	h1 = dom.h1(dom.text('Simple example - run test'));

	//create
	div = dom.div(
		dom.text('Current run time is '),
		dom.text(runtime),
		dom.text('ms. Current speed is '),
		dom.text(fps),
		dom.text(' fps.')
	);

	//attach
	dom.attach(document.body, h1);
	dom.attach(document.body, div);

	//call
	setInterval(function () {
		var up = new Date().getTime() - start;
		//set enw up
		runtime.setValue(up);
		//frames
		frames++;
		//call
		fps.setValue(Math.round(frames/(up/1000)));
	}, 1);

}());
