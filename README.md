# Reactive
Shadow DOM library without jQuery, React and other stuff. Fully adaptable on browser performance and current load.

## Basic usage
The basic element in making use in DOM. All the most popular elements have shortened own function. So for `<span>` it is `dom.span()` and for `<b>` it is `dom.b();`.

##### JS code

```javascript
var div = dom.div();
document.body.appendChild(div.getLive());
```

##### Html output

```html
<div><div>
```

