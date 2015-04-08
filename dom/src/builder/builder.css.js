/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom, document, window) {
	"use strict";

	dom.builder = dom.builder || {};

	/**
	 * @private
	 * Style element, rules
	 * @type {HTMLElement}
	 */
	var generatedStyle = null,
		staticStyle = null,
		rules = {};

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
		var i,
			rules = this.cssRules,
			element = this.element,
			children = element.getChildren(),
			css = this.element.getCss();

		//try find static style
		dom.builder.Css.findStyle();
		//if static style exists, do nothing
		if (staticStyle === true) {
			return;
		}

		//css exists
		if (css) {
			//css rules
			this.getCssRule(dom.builder.Css.getRuleName(element), css.getCss());
		}
		//append to dom
		for (i = 0; i < rules.length; i++) {
			this.appendRule(rules[i]);
		}
		//for all children
		if (!element.isEmpty()) {
			for (i = 0; i < children.length; i++) {
				new dom.builder.Css(children[i]).getCss();
			}
		}
		//add rules
		element.cssRules = rules;
	};

	/**
	 * @private
	 * @param {string} name
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} cssProperties
	 * @returns {dom.sheets.CssRules}
	 */
	dom.builder.Css.prototype.getCssRule = function (name, cssProperties) {
		var i,
			cssRule,
			cssGroup,
			parentCss,
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
		//parent name
		parentCss = dom.builder.Css.getParentRuleName(this.element.parent);
		//parent exists
		if (parentCss) {
			name = [ parentCss, name ].join(" ");
		}
		//rule
		cssRule = new dom.sheets.CssRule(name, rule);
		cssRule.element = this.element;
		//push top rule
		rules.push(cssRule);
	};

	/**
	 * @private
	 * Append generatedStyle
	 * @param {dom.sheets.CssRule} rule
	 */
	dom.builder.Css.prototype.appendRule = function (rule) {
		var name = rule.getRuleName();
		//is already in dom, do nothing
		if (rule.isInDom()) {
			return;
		}
		//check rule exists
		if (rules[name]) {
			dom.utils.logger(LoggerType.INFO, "There is duplicate rule named '" + name + "'. You must specify one of element that is used on this path.");
			return;
		}
		rules[name] = rule;
		//create generatedStyle
		dom.builder.Css.createStyle();
		//register node
		rule.cssElement = document.createTextNode(rule.getRuleString());
		//noinspection JSUnresolvedVariable
		if (generatedStyle.styleSheet) {
			//noinspection JSUnresolvedVariable
			generatedStyle.styleSheet.cssText += rule.cssElement.nodeValue;
		} else {
			generatedStyle.appendChild(rule.cssElement);
		}
	};

	/**
	 * @private
	 * @static
	 * Get id for element
	 * @param  {dom.html.Element} element
	 * @returns {string|null}
	 */
	dom.builder.Css.getId = function (element) {
		var attributes = element.getAttributes(),
			id = attributes[AttributeType.ID];

		//for css we need static attribute
		if (id && !id.isChangeable()) {
			return id.getValue() || null;
		}
		return null;
	};

	/**
	 * @private
	 * @static
	 * Get all static css
	 * @param  {dom.html.Element} element
	 * @returns {Array.<string>}
	 */
	dom.builder.Css.getClasses = function (element) {
		var i,
			staticClasses,
			allClasses = [],
			classNames = element.getClassNames();

		for (i = 0; i < classNames.length; i++) {
			staticClasses = classNames[i].getStaticClasses();
			allClasses = allClasses.concat(staticClasses);
		}
		return allClasses;
	};

	/**
	 * @private
	 * @static
	 * Get rule name
	 * @param  {dom.html.Element} element
	 * @returns {string}
	 */
	dom.builder.Css.getRuleName = function (element) {
		var id,
			classes,
			name = [];

		//get ind and classes
		id = dom.builder.Css.getId(element);
		classes = dom.builder.Css.getClasses(element);
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
			name.push(element.getTag());
		}
		//return
		return name.join("");
	};

	/**
	 * @private
	 * @static
	 * Get rule name
	 * @param  {dom.html.Element} element
	 * @returns {string}
	 */
	dom.builder.Css.getParentRuleName = function (element) {
		var name = [],
			parentIdentifier,
			parent = element,
			isBody = parent === null || element.parent === null;

		//is root
		if (isBody) {
			return "";
		}

		//generate name
		while(!isBody) {
			//get name
			parentIdentifier = dom.builder.Css.getRuleName(parent);
			//add into names array
			if (parentIdentifier) {
				name.unshift(parentIdentifier);
			}
			//get new parent
			parent = parent.parent;
			isBody = parent === null;
		}
		//return name
		return name.join(" ");
	};

	/**
	 * @static
	 * @private
	 * Create generatedStyle
	 */
	dom.builder.Css.createStyle = function () {
		var header;
		//create new generatedStyle
		if (generatedStyle === null) {
			generatedStyle = document.createElement('style');
			generatedStyle.setAttribute("type", "text/css");
			generatedStyle.setAttribute("id", dom.builder.CssStyleType.GENERATED);
			header = document.getElementsByTagName('head')[0];
			header.appendChild(generatedStyle);
		}
	};

	/**
	 * @static
	 * @private
	 * Find staticStyle
	 */
	dom.builder.Css.findStyle = function () {
		//find static style definition
		if (staticStyle === null) {
			staticStyle = Boolean(document.getElementById(dom.builder.CssStyleType.STATIC));
		}
	};

	/**
	 * CssStyle type
	 * @enum {string}
	 */
	dom.builder.CssStyleType = {
		GENERATED: "reactive-generated",
		STATIC: "reactive-static"
	};

	//export
	window['CssStyleType'] = dom.builder.CssStyleType;

}(dom, document, window));
