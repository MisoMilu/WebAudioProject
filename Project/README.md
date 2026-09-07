# Canvas Basics

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
