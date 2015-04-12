/*globals dom*/
(function () {
	"use strict";

	var h1,
		table,
		number = dom.contract(0);

	//title
	h1 = dom.h1(dom.text('Table example - small table'));

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

		for (i = 0; i < 100; i++) {
			trs.push(createRow());
		}

		table.attach(trs);

		return table;
	}

	//attach
	dom.attach(document.body, h1);
	//source
	source('https://github.com/stanislavhacker/Reactive/blob/master/dom/examples/table2/example.js');
	//table
	table = createTable();
	dom.attach(document.body, table);
	//call
	setInterval(function () {
		var v = number.getValue();
		v++;
		number.setValue(v);
	}, 1);

}());
