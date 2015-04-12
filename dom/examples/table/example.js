/*globals dom*/
(function () {
	"use strict";

	var h1,
		description,
		number = dom.contract(0);

	//title
	h1 = dom.h1(dom.text('Table example'));

	//description
	description = dom.p(dom.text('Basically is a non sence do table width 17 000 cells. But there is to see what the library ' +
	'tries. You want to renew the value in cells each millisecond. But this is not possible and even browser can not ' +
	'handle this himself. But it is possible to approach and don\'t freeze a gui. The library will attempt to measure the ' +
	'speed of updating and renders based on browser performance. Therefore, it is possible to see that the table is renewed ' +
	'in pieces. And this approach shows current example.'));

	/**
	 * Create row
	 * @returns {dom.html.Element}
	 */
	function createRow() {
		return dom.tr(
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number)),
			dom.td(dom.text(number))
		);
	}

	/**
	 * Create table
	 * @returns {dom.html.Element}
	 */
	function createTable() {
		var i,
			trs = [],
			table = dom.table();

		for (i = 0; i < 1000; i++) {
			trs.push(createRow());
		}

		table.attach(trs);

		return table;
	}

	//attach
	dom.attach(document.body, h1);
	dom.attach(document.body, description);
	//source
	source('https://github.com/stanislavhacker/Reactive/blob/master/dom/examples/table/example.js');
	dom.attach(document.body, createTable());

	//call
	var interval = setInterval(function () {
		var v = number.getValue();
		v++;
		number.setValue(v);
		//stop
		if (v > 1000) {
			clearInterval(interval);
		}
	}, 1);

}());
