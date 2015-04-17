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
		/** @type {dom.builder.Event}*/
		this.events = null;
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
		this.generateEvents();
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
				//set parent render state
				child.rendered = element.rendered;
				//children element
				childrenElement = child.getLive();
				//dom element
				domElement = element.element;
				//if not contain, append it
				if (!domElement.contains(childrenElement)) {
					//TODO: Async?
					domElement.appendChild(childrenElement);
				}
			}
		}
	};

	/**
	 * @private
	 * Generate events for element
	 */
	dom.builder.Live.prototype.generateEvents = function () {
		var element = this.element,
			events = element.getEvents();
		//no events
		if (events.length === 0) {
			return;
		}
		//process all
		this.events = new dom.builder.Event(element);
		this.events.bindEvents();
	};




	/**
	 * @public
	 * Set attribute
	 * @param {AttributeType|string} name
	 * @param {string} value
	 */
	dom.builder.Live.prototype.setAttribute = function (name, value) {
		var element = this.element.element;

		//abstract attribute
		switch(name) {
			case AttributeType.VALUE:
				element.value = value;
				break;
			case AttributeType.ID:
				element.id = value;
				break;
			case AttributeType.ACCESSKEY:
				element.accessKey = value;
				break;
			case AttributeType.ACTION:
				element.action = value;
				break;
			case AttributeType.ALINK:
				element.alink = value;
				break;
			case AttributeType.ALT:
				element.alt = value;
				break;
			case AttributeType.CHECKED:
				element.checked = !!value;
				break;
			case AttributeType.CITE:
				element.cite = value;
				break;
			case AttributeType.COLS:
				element.cols = value;
				break;
			case AttributeType.COLSPAN:
				element.colSpan = value;
				break;
			case AttributeType.DISABLED:
				element.disabled = !!value;
				break;
			case AttributeType.HREF:
				element.href = value;
				break;
			case AttributeType.FOR:
				element.htmlFor = value;
				break;
			case AttributeType.LANG:
				element.lang = value;
				break;
			case AttributeType.MEDIA:
				element.media = value;
				break;
			case AttributeType.METHOD:
				element.method = value;
				break;
			case AttributeType.NAME:
				element.name = value;
				break;
			case AttributeType.READONLY:
				element.readOnly = !!value;
				break;
			case AttributeType.REL:
				element.rel = value;
				break;
			case AttributeType.ROWS:
				element.rows = value;
				break;
			case AttributeType.ROWSPAN:
				element.rowSpan = value;
				break;
			case AttributeType.SRC:
				element.src = value;
				break;
			case AttributeType.TABINDEX:
				element.tabIndex = value;
				break;
			case AttributeType.TARGET:
				element.target = value;
				break;
			case AttributeType.TITLE:
				element.title = value;
				break;
			default:
				element.setAttribute(name, value);
				break;
		}
	};

	/**
	 * @public
	 * Set css property
	 * @type {string} name
	 * @type {string} value
	 */
	dom.builder.Live.prototype.setCssProperty = function (name, value) {
		var element = this.element.element;
		element.style[name] = value;
	};

	/**
	 * @public
	 * Set class name
	 * @type {Array.<string>} value
	 */
	dom.builder.Live.prototype.setClassName = function (value) {
		var element = this.element.element;
		element.className = value.join(" ");
	};

	/**
	 * @public
	 * Remove
	 */
	dom.builder.Live.prototype.remove = function () {
		var events = this.events,
			element = this.element,
			parent = element.parent;

		//remove all events
		if (events) {
			events.remove();
		}
		//parent element exists
		if (parent && parent.element) {
			//remove from dom
			parent.element.removeChild(element.element);
			//remove from children
			element.setParent(null);
		}
	};

}(dom, document, window));
