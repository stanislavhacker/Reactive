/**
 * Created by Stanislav on 20. 3. 2015.
 */
var examples = {};
(function () {
	"use strict";

	examples.basicUsage = function (id) {

		//var div = dom.div();
		//document.body.appendChild(div.getLive());

		var div = dom.div();
		document.getElementById(id).appendChild(document.createTextNode(div.getHtml()));
	}

}());