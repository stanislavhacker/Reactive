/**
 * Element in Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.html = dom.html || {};

	/**
	 * Classes
	 * @param {Array.<string|dom.data.Contract>} classes
	 * @extends {dom.Element}
	 * @constructor
	 */
	dom.html.Classes = function (classes) {
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();
		/** @type {Array.<dom.data.Contract>}*/
		this.cls = this.createClasses(classes);
	};
	dom.utils.inherit(dom.html.Classes, dom.Element);

	/**
	 * @public
	 * Get classes
	 * @returns {Array.<string>}
	 */
	dom.html.Classes.prototype.getClasses = function () {
		var i,
			cls = this.cls,
			classes  = [];

		for (i = 0; i < cls.length; i++) {
			classes.push(cls[i].getValue());
		}

		return classes;
	};

	/**
	 * @public
	 * Get static classes
	 * @returns {Array.<string>}
	 */
	dom.html.Classes.prototype.getStaticClasses = function () {
		var i,
			clazz,
			cls = this.cls,
			classes  = [];

		for (i = 0; i < cls.length; i++) {
			clazz = cls[i];
			if (clazz instanceof dom.data.UnboundContract) {
				classes.push(clazz.getValue());
			}
		}

		return classes;
	};


	/**
	 * @private
	 * Create classes
	 * @param {Array.<string|dom.data.Contract>} data
	 * @return {Array.<dom.data.Contract>}
	 */
	dom.html.Classes.prototype.createClasses = function (data) {
		var i,
			item,
			contracts = [];

		for (i = 0; i < data.length; i++) {
			item = data[i];
			//is contract
			if (item instanceof dom.data.Contract) {
				item.addChangeEvent(this, this.onClassNameChange);
				contracts.push(item);

			//create contract
			} else {
				contracts.push(new dom.data.UnboundContract(item));
			}
		}

		return contracts;
	};

	/**
	 * @protected
	 * On attribute change
	 */
	dom.html.Classes.prototype.onClassNameChange = function () {
		this.elements.setClassName(this);
	};

}(dom, document, window));
