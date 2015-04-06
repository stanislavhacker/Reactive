/**
 * Css property in reactive
 * @author Stanislav Hacker
 */
(function (dom, document, window) {
	"use strict";

	dom.sheets = dom.sheets || {};

	/**
	 * @private
	 * @type {Object<string, string>}
	 */
	var jsNamesMap = {};

	/**
	 * Css property
	 * @param {dom.sheets.CssPropertyType|string} name
	 * @param {string|dom.data.Contract} value
	 * @extends {dom.Element}
	 * @constructor
	 */
	dom.sheets.CssProperty = function (name, value) {
		/** @type {dom.sheets.CssPropertyType|string}*/
		this.name = name;
		/** @type {string}*/
		this.jsName = dom.sheets.CssProperty.createJsName(name);
		/** @type {dom.data.Contract}*/
		this.value = value instanceof dom.data.Contract ? value : new dom.data.UnboundContract(value);
		/** @type {dom.html.Elements}*/
		this.elements = new dom.html.Elements();

		//register change
		this.value.addChangeEvent(this, this.onCssChange);
	};
	dom.utils.inherit(dom.sheets.CssProperty, dom.Element);

	/**
	 * @public
	 * Get name
	 * @returns {dom.sheets.CssPropertyType|string}
	 */
	dom.sheets.CssProperty.prototype.getName = function () {
		return this.name;
	};

	/**
	 * @public
	 * Get name for js creation
	 * @returns {string}
	 */
	dom.sheets.CssProperty.prototype.getJsName = function () {
		return this.jsName;
	};

	/**
	 * @public
	 * Return value contract
	 * @returns {string}
	 */
	dom.sheets.CssProperty.prototype.getValue = function () {
		var value = this.value.getValue();
		return value ? value.toString() : null;
	};

	/**
	 * @public
	 * Is changeable
	 * @returns {boolean}
	 */
	dom.sheets.CssProperty.prototype.isChangeable = function () {
		var unbound = this.value instanceof dom.data.UnboundContract;
		return unbound === false;
	};

	/**
	 * @protected
	 * On attribute change
	 */
	dom.sheets.CssProperty.prototype.onCssChange = function () {
		this.elements.setCssProperty(this);
	};


	/**
	 * Replace char at
	 * @param {string} text
	 * @param {number} index
	 * @param {string|null} character
	 * @returns {string}
	 */
	function replaceAt(text, index, character) {
		if (character === null) {
			return text.substr(0, index) + text.substr(index + 1);
		}
		return text.substr(0, index) + character + text.substr(index + character.length);
	}

	/**
	 * @static
	 * @param {string} cssName
	 * @returns {string}
	 */
	dom.sheets.CssProperty.createJsName = function (cssName) {
		var index,
			jsName = cssName,
			delimiter = "-",
			nameInCache = jsNamesMap[cssName];

		//return cssName in cache
		if (nameInCache) {
			return nameInCache;
		}
		//index
		index = jsName.indexOf(delimiter);
		//create cssName
		while (index >= 0) {
			if (index > 0) {
				jsName = replaceAt(jsName, index, null);
				jsName = replaceAt(jsName, index, jsName[index].toUpperCase());
			} else {
				jsName = replaceAt(jsName, index, null);
			}
			index = jsName.indexOf(delimiter);
		}
		//save cssName into map
		jsNamesMap[cssName] = jsName;
		//return new cssName
		return jsName;
	};

	/**
	 * Css property type
	 * @enum {string}
	 */
	dom.sheets.CssPropertyType = {
		ACCELERATOR: "accelerator",
		AZIMUTH: "azimuth",
		BACKGROUND: "background",
		BACKGROUND_ATTACHMENT: "background-attachment",
		BACKGROUND_COLOR: "background-color",
		BACKGROUND_IMAGE: "background-image",
		BACKGROUND_POSITION: "background-position",
		BACKGROUND_POSITION_X: "background-position-x",
		BACKGROUND_POSITION_Y: "background-position-y",
		BACKGROUND_REPEAT: "background-repeat",
		BEHAVIOR: "behavior",
		BORDER: "border",
		BORDER_BOTTOM: "border-bottom",
		BORDER_BOTTOM_COLOR: "border-bottom-color",
		BORDER_BOTTOM_STYLE: "border-bottom-style",
		BORDER_BOTTOM_WIDTH: "border-bottom-width",
		BORDER_COLLAPSE: "border-collapse",
		BORDER_COLOR: "border-color",
		BORDER_LEFT: "border-left",
		BORDER_LEFT_COLOR: "border-left-color",
		BORDER_LEFT_STYLE: "border-left-style",
		BORDER_LEFT_WIDTH: "border-left-width",
		BORDER_RIGHT: "border-right",
		BORDER_RIGHT_COLOR: "border-right-color",
		BORDER_RIGHT_STYLE: "border-right-style",
		BORDER_RIGHT_WIDTH: "border-right-width",
		BORDER_SPACING: "border-spacing",
		BORDER_STYLE: "border-style",
		BORDER_TOP: "border-top",
		BORDER_TOP_COLOR: "border-top-color",
		BORDER_TOP_STYLE: "border-top-style",
		BORDER_TOP_WIDTH: "border-top-width",
		BORDER_WIDTH: "border-width",
		BOTTOM: "bottom",
		CAPTION_SIDE: "caption-side",
		CLEAR: "clear",
		CLIP: "clip",
		COLOR: "color",
		CONTENT: "content",
		COUNTER_INCREMENT: "counter-increment",
		COUNTER_RESET: "counter-reset",
		CUE: "cue",
		CUE_AFTER: "cue-after",
		CUE_BEFORE: "cue-before",
		CURSOR: "cursor",
		DIRECTION: "direction",
		DISPLAY: "display",
		ELEVATION: "elevation",
		EMPTY_CELLS: "empty-cells",
		FILTER: "filter",
		FLOAT: "float",
		FONT: "font",
		FONT_FAMILY: "font-family",
		FONT_SIZE: "font-size",
		FONT_SIZE_ADJUST: "font-size-adjust",
		FONT_STRETCH: "font-stretch",
		FONT_STYLE: "font-style",
		FONT_VARIANT: "font-variant",
		FONT_WEIGHT: "font-weight",
		HEIGHT: "height",
		IME_MODE: "ime-mode",
		INCLUDE_SOURCE: "include-source",
		LAYER_BACKGROUND_COLOR: "layer-background-color",
		LAYER_BACKGROUND_IMAGE: "layer-background-image",
		LAYOUT_FLOW: "layout-flow",
		LAYOUT_GRID: "layout-grid",
		LAYOUT_GRID_CHAR: "layout-grid-char",
		LAYOUT_GRID_CHAR_SPACING: "layout-grid-char-spacing",
		LAYOUT_GRID_LINE: "layout-grid-line",
		LAYOUT_GRID_MODE: "layout-grid-mode",
		LAYOUT_GRID_TYPE: "layout-grid-type",
		LEFT: "left",
		LETTER_SPACING: "letter-spacing",
		LINE_BREAK: "line-break",
		LINE_HEIGHT: "line-height",
		LIST_STYLE: "list-style",
		LIST_STYLE_IMAGE: "list-style-image",
		LIST_STYLE_POSITION: "list-style-position",
		LIST_STYLE_TYPE: "list-style-type",
		MARGIN: "margin",
		MARGIN_BOTTOM: "margin-bottom",
		MARGIN_LEFT: "margin-left",
		MARGIN_RIGHT: "margin-right",
		MARGIN_TOP: "margin-top",
		MARKER_OFFSET: "marker-offset",
		MARKS: "marks",
		MAX_HEIGHT: "max-height",
		MAX_WIDTH: "max-width",
		MIN_HEIGHT: "min-height",
		MIN_WIDTH: "min-width",
		ORPHANS: "orphans",
		OUTLINE: "outline",
		OUTLINE_COLOR: "outline-color",
		OUTLINE_STYLE: "outline-style",
		OUTLINE_WIDTH: "outline-width",
		OVERFLOW: "overflow",
		OVERFLOW_X: "overflow-X",
		OVERFLOW_Y: "overflow-Y",
		PADDING: "padding",
		PADDING_BOTTOM: "padding-bottom",
		PADDING_LEFT: "padding-left",
		PADDING_RIGHT: "padding-right",
		PADDING_TOP: "padding-top",
		PAGE: "page",
		PAGE_BREAK_AFTER: "page-break-after",
		PAGE_BREAK_BEFORE: "page-break-before",
		PAGE_BREAK_INSIDE: "page-break-inside",
		PAUSE: "pause",
		PAUSE_AFTER: "pause-after",
		PAUSE_BEFORE: "pause-before",
		PITCH: "pitch",
		PITCH_RANGE: "pitch-range",
		PLAY_DURING: "play-during",
		POSITION: "position",
		QUOTES: "quotes",
		RICHNESS: "richness",
		RIGHT: "right",
		RUBY_ALIGN: "ruby-align",
		RUBY_OVERHANG: "ruby-overhang",
		RUBY_POSITION: "ruby-position",
		SIZE: "size",
		SPEAK: "speak",
		SPEAK_HEADER: "speak-header",
		SPEAK_NUMERAL: "speak-numeral",
		SPEAK_PUNCTUATION: "speak-punctuation",
		SPEECH_RATE: "speech-rate",
		STRESS: "stress",
		TABLE_LAYOUT: "table-layout",
		TEXT_ALIGN: "text-align",
		TEXT_ALIGN_LAST: "text-align-last",
		TEXT_DECORATION: "text-decoration",
		TEXT_INDENT: "text-indent",
		TEXT_JUSTIFY: "text-justify",
		TEXT_OVERFLOW: "text-overflow",
		TEXT_SHADOW: "text-shadow",
		TEXT_TRANSFORM: "text-transform",
		TEXT_AUTOSPACE: "text-autospace",
		TEXT_KASHIDA_SPACE: "text-kashida-space",
		TEXT_UNDERLINE_POSITION: "text-underline-position",
		TOP: "top",
		UNICODE_BIDI: "unicode-bidi",
		VERTICAL_ALIGN: "vertical-align",
		VISIBILITY: "visibility",
		VOICE_FAMILY: "voice-family",
		VOLUME: "volume",
		WHITE_SPACE: "white-space",
		WIDOWS: "widows",
		WIDTH: "width",
		WORD_BREAK: "word-break",
		WORD_SPACING: "word-spacing",
		WORD_WRAP: "word-wrap",
		WRITING_MODE: "writing-mode",
		Z_INDEX: "z-index",
		ZOOM: "zoom"
};

	//export
	window['CssPropertyType'] = dom.sheets.CssPropertyType;

}(dom, document, window));
