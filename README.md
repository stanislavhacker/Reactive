# Reactive
Shadow DOM library without jQuery, React and other stuff. Fully adaptable on browser performance and current load.

## Create dom element
The basic element in making use in DOM. All the most popular elements have shortened own function. So for `<span>` it is `dom.span()` and for `<b>` it is `dom.b();`.

##### JS code

```javascript
var div = dom.div();
document.body.appendChild(div.getLive());
```

##### Html output

```html
<div></div>
```


## Create attribute in element
The creation of the attribute are used two functions. It is a function `dom.attr()` and `dom.dataAttr()`. As you can see, data attributes have a separate function because automatically added name `data-` before attribute name. Nothing complicated.

##### JS code

```javascript
var div = dom.div(
	dom.attr(dom.html.AttributeType.LANG, "en"),
	dom.dataAttr("my-data", "test")
);
document.body.appendChild(div.getLive());
```

##### Html output

```html
<div lang="en" data-my-data="test"></div>
```

## Create classes in element
Class names are like attributes. Just call `dom.classes()` with parameters and you have what you need. Of course you can also use the method for binding attributes, but this method is a little smarter.

##### JS code

```javascript
var div = dom.div(
	dom.classes("square", "red", "test")
);
document.body.appendChild(div.getLive());
```

##### Html output

```html
<div class="square red test"></div>
```

## Create styles in element
Creating styles operates on a similar principle. Just call `dom.css()` and then use the parameters`dom.cssProperty()`. But if you look at the HTML, you will find that there are no css! How then used? It's very simple. Static css are very slow on the elements. Therefore, there are a generated CSS styles that can be connected as a statics css file on page!

##### JS code

```javascript
var div = dom.div(
	dom.attr('id', 'square'),
	dom.css(
		dom.cssProperty(dom.sheets.CssPropertyType.BACKGROUND, "red"),
		dom.cssProperty(dom.sheets.CssPropertyType.BORDER, "1px solid red")
	)
);
document.body.appendChild(div.getLive());
```

##### Html output

```html
<div id="square"></div>
```

##### Css output

```css
#square {background: red;border:1px solid red}
```
