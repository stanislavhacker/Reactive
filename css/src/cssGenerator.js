/**
 * Css production file generator
 * @author Stanislav Hacker
 */
var domCssGenerator = (function(){
	/**
	 * Css generator
	 * @constructor
	 */
	function CssGenerator() {
		/** @type {Array.<dom.Element>}*/
		this.elements = [];
	}

	/**
	 * @public
	 * Register root element for css generating
	 * @param {dom.Element} rootElement
	 */
	CssGenerator.prototype.register = function (rootElement) {
		dom.utils.arrayInsert(this.elements, rootElement);
	};

	/**
	 * @public
	 * Get production css
	 * @returns {string}
	 */
	CssGenerator.prototype.getProductionCss = function () {
		return "#test";
	};

	//instance
	var instance;
	//return interface
	return {
		/**
		 * Get instance
		 * @returns {CssGenerator}
		 */
		getInstance: function(){
			//create instance
			if (instance == null) {
				instance = new CssGenerator();
				instance.constructor = null;
			}
			return instance;
		}
	};

})();