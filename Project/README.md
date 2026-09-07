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

## September 7: Normal drawing vs. animation

### Drawing once

For a normal drawing, draw the shapes once and leave them on the canvas:

```js
ctx.fillRect(10, 20, 150, 50);

ctx.fillStyle = 'blue';
ctx.strokeStyle = 'blue';
ctx.lineWidth = 10;
ctx.beginPath();
ctx.arc(150, 100, 40, 0, Math.PI * 2);
ctx.stroke();
```

`fillRect()` draws a filled rectangle immediately. For the circle, `beginPath()` starts a new path, `arc()` adds the circular path, and `stroke()` draws its outline. The code runs quickly; after the script finishes, the browser paints the latest canvas drawing on the screen. “Update the screen” means showing that newest canvas drawing to the user.

For a one-time drawing, `requestAnimationFrame()` is not necessary.

### Why animation clears old drawings

For animation, a shape changes position. Usually, the old frame must be removed before the next frame is drawn:

> My takeaway: for animation, the previous frame needs to be deleted. With a normal drawing, it does not matter what was drawn previously because the drawing stays there. But in animation, each frame needs a clean canvas: wipe out the old frame, go to the new frame, and draw again.

```text
Frame 1: clear canvas -> draw circle at x = 100
Frame 2: clear canvas -> draw circle at x = 105
Frame 3: clear canvas -> draw circle at x = 110
```

Without clearing, every old circle stays on the canvas, making a trail:

```text
● ● ● ● ●
```

`clearRect()` clears part of the canvas. This clears the whole canvas:

```js
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

### `requestAnimationFrame()`

```js
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the new frame here.

  requestAnimationFrame(animate);
}

animate();
```

The first `animate()` starts the animation. Inside the function, `requestAnimationFrame(animate)` passes the `animate` function to the browser and means: “Call this function again at the next screen refresh.” The browser gets a chance to paint the current frame before calling it again.

Do not write `requestAnimationFrame(animate())`. Parentheses call `animate` immediately, which repeatedly calls itself without waiting for the browser to paint. That can freeze the page or cause a stack overflow.

### Question: Why clear the current frame instead of the previous one?

**Question:** “Why is it clearing the current frame but not the previous frame? Why is it not drawing on the current frame for `animate`?”

The canvas does not store separate previous-frame and current-frame objects. It is one drawing surface. At the beginning of a new animation loop, the canvas still contains the drawing from the last time `animate()` ran. That existing drawing is what we call the **previous frame**.

```text
Canvas currently shows: circle at x = 100  <- previous frame

animate() runs again:
1. clearRect() removes what is currently on the canvas
2. draw circle at x = 105                <- new/current frame
3. browser displays the new frame
```

The code does draw the current frame. The drawing code after `clearRect()` creates it:

```js
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Remove old circle.
  ctx.arc(x, y, 40, 0, Math.PI * 2);                // Draw new circle.
  requestAnimationFrame(animate);
}
```

Usually, the blank cleared canvas is not visible because JavaScript clears it and draws the new shape before the browser displays the next frame.

## September 7: Random sizes with `Math.random()`

**Question:** “Why does `this.size = Math.random() * 5 + 1` create a random value from 1 to 6? Is `Math` a built-in class and `random` a function?”

```js
this.size = Math.random() * 5 + 1;
```

`Math` is a built-in JavaScript **object**, not a class. `random()` is a built-in method on that object:

```js
Math.random();
```

`Math.random()` returns a decimal number from `0` up to, but not including, `1`:

```text
[0, 1)
```

`[` means the number is included, and `)` means the number is not included. So `Math.random()` can return `0`, but it can get only very close to `1`; it never returns exactly `1`.

```text
Math.random()       -> [0, 1)
Math.random() * 5   -> [0, 5)
Math.random() * 5 + 1 -> [1, 6)
```

**Finding:** The result is exactly `1` at its smallest and can get almost to `6`, but never exactly `6`. It can be values such as `1`, `2.73`, or `5.9999`.
