/*global dom*/
/**
 * Builder for shadow dom
 */
(function () {
	"use strict";

	/**
	 * Css
	 * @param {dom.html.Element} element
	 * @constructor
	 */
	dom.builder.Css = function (element) {
		/** @type {dom.html.Element}*/
		this.element = element;
		/** @type {dom.sheets.CssRules}*/
		this.cssRules = new dom.sheets.CssRules();
	};

	/**
	 * Get css for element
	 */
	dom.builder.Css.prototype.getCss = function () {
		var css = this.element.getCss();
		//css exists
		if (css) {
			//css rules
			this.getCssRule(this.getRuleName(), css.getCss());
		}
		//add rules
		this.element.cssRules = this.cssRules;
	};

	/**
	 * @private
	 * @param {string} name
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} cssProperties
	 * @returns {dom.sheets.CssRules}
	 */
	dom.builder.Css.prototype.getCssRule = function (name, cssProperties) {
		var i,
			cssGroup,
			rule = [],
			cssProperty,
			rules = this.cssRules;

		//process all
		for (i = 0; i < cssProperties.length; i++) {
			//load property
			cssProperty = cssProperties[i];
			//css group
			if (cssProperty instanceof dom.sheets.CssGroup) {
				cssGroup = /** @type {dom.sheets.CssGroup}*/cssProperty;
				this.getCssRule(name + cssGroup.getName(), cssGroup.getCss());
			//only non changeable and filled
			} else if (!cssProperty.isChangeable() && cssProperty.getValue() !== null) {
				rule.push(cssProperty.getName() + ": " + cssProperty.getValue());
			}
		}
		//push top rule
		rules.push(new dom.sheets.CssRule(name, rule));
	};

	/**
	 * @private
	 * Get id for element
	 * @returns {string|null}
	 */
	dom.builder.Css.prototype.getId = function () {
		var attributes = this.element.getAttributes(),
			id = attributes[dom.html.AttributeType.ID];

		//for css we need static attribute
		if (id && !id.isChangeable()) {
			return id.getValue() || null;
		}
		return null;
	};

	/**
	 * @private
	 * Get all static css
	 * @returns {Array.<string>}
	 */
	dom.builder.Css.prototype.getClasses = function () {
		var i,
			staticClasses,
			allClasses = [],
			classNames = this.element.getClassNames();

		for (i = 0; i < classNames.length; i++) {
			staticClasses = classNames[i].getStaticClasses();
			allClasses = allClasses.concat(staticClasses);
		}
		return allClasses;
	};

	/**
	 * @private
	 * Get rule name
	 * @returns {string}
	 */
	dom.builder.Css.prototype.getRuleName = function () {
		var id,
			classes,
			name = [],
			element = this.element;

		//get ind and classes
		id = this.getId();
		classes = this.getClasses();
		//add id
		if (id !== null) {
			name.push("#" + id);
		}
		//add classes
		if (classes.length) {
			classes.unshift("");
			name.push(classes.join("."));
		}
		//nothing
		if (name.length === 0) {
			name.push(element.getTag())
		}
		//return
		return name.join("");
	};

}());
