# Canvas Basics

**Date:** September 6

This project is a first practice with the HTML `<canvas>` element and JavaScript drawing.

## What I learned

### 1. Select the canvas from HTML

```js
const canvas = document.getElementById('canvas1');
```

This finds the HTML element with `id="canvas1"` and saves it in the `canvas` variable.

```html
<canvas id="canvas1"></canvas>
```

### 2. Get 2D drawing tools

```js
const ctx = canvas.getContext('2d');
```

`getContext('2d')` means: “Canvas, give me the tools to draw 2D things on you.”

`ctx` is the drawing context. It is the object used to draw shapes, lines, text, images, and colors on the canvas.

### 3. Use the browser console

```js
console.log(canvas);
console.log(ctx);
```

`console.log()` prints a value in the browser Developer Tools Console. It helps a programmer check that JavaScript found the canvas and created its drawing context. Normal users do not see console messages.

### 4. Draw a filled rectangle

```js
ctx.fillStyle = 'white';
ctx.fillRect(10, 20, 150, 50);
```

- `fillStyle` chooses the color for filled shapes.
- `fillRect(x, y, width, height)` draws a filled rectangle.
- This rectangle starts 10 pixels from the left and 20 pixels from the top. It is 150 pixels wide and 50 pixels tall.

Anything drawn with `ctx` appears on the webpage canvas, so users can see it.

### 5. Match the canvas to the browser window

```js
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

- `window.innerWidth` is the width of the visible browser window.
- `window.innerHeight` is the height of the visible browser window.

### 6. Respond when the browser window is resized

```js
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
```

`addEventListener` tells the browser to listen for an event. When the user resizes the window, the browser fires a `resize` event and automatically calls the function. The function then updates the canvas size.

### 7. Where `ctx` drawing methods come from

`CanvasRenderingContext2D` is a built-in browser interface. It describes the kind of object returned by:

```js
const ctx = canvas.getContext('2d');
```

You can think of it as the browser's built-in collection of 2D canvas drawing tools. More precisely, it is an interface/type, not a library that you install. The browser already includes tools such as:

```js
ctx.arc();
ctx.fillRect();
ctx.fill();
ctx.stroke();
ctx.fillText();
```

The browser already provides the drawing methods. The shared methods live on a JavaScript object called a **prototype**:

```js
CanvasRenderingContext2D.prototype.arc
CanvasRenderingContext2D.prototype.fillRect
CanvasRenderingContext2D.prototype.fill
```

The prototype does **not** inherit from `CanvasRenderingContext2D`. It is the prototype object associated with that built-in interface. `ctx` is the object that inherits access to this prototype.

Both `ctx` and the prototype are objects, but they have different jobs:

```text
ctx       = your specific drawing toolbox
prototype = the shared object containing built-in drawing tools
```

`ctx` is **not** the prototype object. Instead, `ctx` **inherits access** to the methods on the prototype. That is why you can use built-in methods such as `arc()`, `fill()`, and `fillRect()` without creating them yourself.

```text
ctx -> CanvasRenderingContext2D.prototype -> Object.prototype
```

The arrow means: “if `ctx` needs a method, it can look on its prototype.”

For example, when JavaScript sees this:

```js
ctx.arc(200, 200, 50, 0, Math.PI * 2);
```

it looks for `arc` on `ctx`. If it is not directly on `ctx`, JavaScript follows the prototype chain and finds `arc` on `CanvasRenderingContext2D.prototype`.

You do not normally use the prototype directly. You use `ctx`:

```js
ctx.arc(...);
```

In short: `ctx` is your drawing object. It inherits access to the browser's shared drawing methods from its prototype.

## Important note

Set the canvas size once when the page first loads as well as when the window resizes. Otherwise, the resize code only runs after the user changes the window size.

```js
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
```

## September 7: `const`

`const` creates a variable whose value cannot be reassigned later.

```js
const canvas = document.getElementById('canvas1');
```

This creates a variable named `canvas` and stores the canvas element in it. You cannot replace `canvas` with a different value:

```js
canvas = 'hello'; // Error
```

However, `canvas` refers to an object, and you can still change that object's properties:

```js
canvas.width = 800; // Allowed
```

Use `const` when a variable should keep referring to the same value or object.

## September 7: Click events and `function(event)`

```js
canvas.addEventListener('click', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
```

`addEventListener` takes two things:

1. An event name, such as `'click'`.
2. A callback function: code the browser should run later when that event happens.

`function` is a built-in JavaScript keyword that creates a function. The function in this example is written by us; we decide what it does.

```js
function (event) {
  // Code here runs after the canvas is clicked.
}
```

`event` is a parameter. It means: “When the browser calls this function, give the click information to me and call it `event`.” When the user clicks the canvas, the browser automatically creates a click-event object and passes it to the callback function.

```text
User clicks canvas
      ↓
Browser creates a click-event object
      ↓
Browser calls the callback function and passes in that object
      ↓
event refers to that click-event object
```

The event object includes information about the click, including its position:

```js
event.x // horizontal click position
event.y // vertical click position
```

These lines save that position in a `mouse` object:

```js
mouse.x = event.x;
mouse.y = event.y;
```

The parameter can technically have any name, but `event` is the normal, clear name.

### Checking the event object

```js
// Check the event object JavaScript receives after a click.
console.log(event);
```

You do not have to name the callback parameter `event`; any variable name works. The browser calls the callback function on the event listener and passes in the built-in event object that it created when the user clicked.

```js
canvas.addEventListener('click', function (clickInfo) {
  console.log(clickInfo);
});
```

In this example, `clickInfo` refers to the same click-event object that was called `event` in the earlier example.

### Why the Console shows `PointerEvent`

When a user clicks, modern browsers often create a `PointerEvent`. This is normal. A `PointerEvent` includes the usual mouse information and extra information for other input devices, such as touchscreens and styluses.

```text
PointerEvent
    ↓ inherits from
MouseEvent
    ↓ inherits from
UIEvent
    ↓ inherits from
Event
```

Because `PointerEvent` inherits from `MouseEvent`, it still has mouse-style position properties:

```js
event.x
event.y
event.clientX
event.clientY
```

It can also provide extra pointer information:

```js
event.pointerId
event.pressure
event.width
event.height
```

Browsers use `PointerEvent` so the same click code can work with a mouse, touchscreen, or stylus.
