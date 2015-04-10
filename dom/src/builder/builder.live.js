/**
 * Builder for Reactive
 * @author Stanislav Hacker
 */
(function (dom) {
	"use strict";

	dom.builder = dom.builder || {};

	/**
	 * Live
	 * @param {dom.html.Element} element
	 * @param {HTMLElement=} parent
	 * @constructor
	 */
	dom.builder.Live = function (element, parent) {
		/** @type {dom.html.Element}*/
		this.element = element;
		/** @type {HTMLElement}*/
		this.parent = parent;
	};

	/**
	 * Get live dom element
	 */
	dom.builder.Live.prototype.getLive = function () {
		//generate content for text element
		this.generateElement();
		this.generateAttributes();
		this.generateClasses();
		this.generateCss();
		this.generateChildren();
	};

	/**
	 * @private
	 * Generate start tag
	 */
	dom.builder.Live.prototype.generateElement = function () {
		var element = this.element,
			parent = this.parent;
		//create element
		element.element = parent || document.createElement(element.getTag());
	};

	/**
	 * @private
	 * Generate attributes
	 */
	dom.builder.Live.prototype.generateAttributes = function () {
		var element = this.element,
			attributes,
			attr,
			name;

		//load attributes
		attributes = element.getAttributes();
		//iterate all attributes
		for (name in attributes) { // jshint ignore:line
			//noinspection JSUnfilteredForInLoop
			attr = attributes[name];
			//check attribute
			if (attr.getValue() !== null) {
				//set attribute
				element.setAttribute(attr.getName(), attr.getValue());
			}
		}
	};

	/**
	 * @private
	 * Generate attributes
	 */
	dom.builder.Live.prototype.generateClasses = function () {
		var element = this.element,
			names = [],
			classNames,
			i;

		//load class names
		classNames = element.getClassNames();

		//generate html for children
		for (i = 0; i < classNames.length; i++) {
			names = names.concat(classNames[i].getClasses());
		}

		//add
		if (names.length > 0) {
			element.setClassName(names);
		}
	};

	/**
	 * @private
	 * Generate css
	 */
	dom.builder.Live.prototype.generateCss = function () {
		var element = this.element,
			css = element.getCss();

		//no css
		if (css === null) {
			return;
		}

		//iterate all
		this.generateCssForGroup(css.getCss());
	};

	/**
	 * @private
	 * Generate css for group
	 * @param {Array.<dom.sheets.CssProperty|dom.sheets.CssGroup>} cssProperties
	 */
	dom.builder.Live.prototype.generateCssForGroup = function (cssProperties) {
		var i,
			group,
			isGroup,
			property,
			isProperty,
			element = this.element;

		//iterate all
		for (i = 0; i < cssProperties.length; i++) {
			//property
			property = cssProperties[i];
			//is property, group
			isProperty = property instanceof dom.sheets.CssProperty;
			isGroup = property instanceof dom.sheets.CssGroup;
			//changeable
			if (isProperty && property.isChangeable()) {
				element.setCssProperty(property.getJsName(), property.getValue());
			}
			//group
			if (isGroup) {
				group = /** @type {dom.sheets.CssGroup} */ property;
				this.generateCssForGroup(group.getCss());
			}
		}
	};

	/**
	 * @public
	 * Generate html for children if there are
	 */
	dom.builder.Live.prototype.generateChildren = function () {
		var element = this.element,
			childrenElement,
			domElement,
			children,
			child,
			i;

		if (!element.isEmpty()) {
			//process children
			children = element.getChildren();
			//generate html for children
			for (i = 0; i < children.length; i++) {
				//child
				child = children[i];
				//children element
				childrenElement = child.getLive();
				//dom element
				domElement = element.element;
				//if not contain, append it
				if (!domElement.contains(childrenElement)) {
					//TODO: Async?
					domElement.appendChild(childrenElement);
					//set parent render state
					child.rendered = element.rendered;
				}
			}
		}
	};

}(dom, document, window));
