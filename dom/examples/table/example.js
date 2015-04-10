/*globals dom*/
(function () {
	"use strict";

	var h1,
		number = dom.contract(0);

	//title
	h1 = dom.h1(dom.text('Table example'));

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
