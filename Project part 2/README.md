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

## September 7: Object properties such as `speedX` and `speedY`

**Question:** “How does JavaScript know there is a `speedX` and `speedY` property? Why do they not need to write the properties at the top first?”

```js
this.speedX = Math.random() * 3 - 1.5;
this.speedY = Math.random() * 3 - 1.5;
```

`this` means the current object being created or used. JavaScript objects can have properties added whenever needed. When JavaScript reaches this line:

```js
this.speedX = 1;
```

it checks whether the current object already has a `speedX` property. If it does not, JavaScript creates that property automatically. Therefore, the properties do not need to be declared at the top first.

`speedX` and `speedY` are names chosen by the programmer. After the assignments, an object could look like this:

```js
{
  speedX: 0.82,
  speedY: -1.14
}
```

They can be used later to move the object:

```js
this.x += this.speedX; // Move left or right.
this.y += this.speedY; // Move up or down.
```

**Finding:** In JavaScript, assigning a value to a new property name automatically creates that property on the object. Some stricter programming languages require properties to be declared first, but JavaScript does not.

**Use Arrays to organize multiple copies of particles**

For example, array and its built in method .push(pass in object), to add elements at the end of the array. 

For example: 
arrayParticle.push(new Particle()) -> notice! use the *new*
keyword to initialize a custom object. 


```markdown
---

## Notes: Particle System Architecture & Motion Logic

### 1. Code Implementation

```javascript
class Particle {
  constructor() {
    // Initial random placement when the particle is created
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 20;

    // Velocities (speed + direction)
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  // State / Physics Step
  update() {
    this.x += this.speedX; // Left: negative, Right: positive
    this.y += this.speedY; // Up: negative, Down: positive
  }

  // Render Step
  draw() {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

```

---

### 2. Method Breakdown & Conceptual Reasoning

#### `update()` — State & Motion

* **Logic:** Updates the coordinates by adding velocity (`speedX`, `speedY`) to the current coordinates (`x`, `y`).
* **2D Vector Math:** Operates on the standard Euler integration formula:

$$\text{New Position} = \text{Current Position} + \text{Velocity}$$


* **Directional Axes in Canvas:**
* Horizontal ($x$): Adding negative values moves left; adding positive moves right.
* Vertical ($y$): The canvas origin $(0, 0)$ is top-left, so negative moves **up** and positive moves **down**.


* **Key Distinction:** `update()` does **not** teleport or reassign the particle to a random position. Spawning/random initialization happens in the `constructor()`; `update()` simply advances the particle along its trajectory frame by frame.

#### `draw()` — Rendering

* **Logic:** Translates stored instance properties (`this.x`, `this.y`, `this.size`) into visible canvas paths using 2D context methods (`beginPath()`, `arc()`, `fill()`).
* **Role:** Purely responsible for displaying current state on screen; contains no motion or collision calculations.

---

### 3. Architectural Design

* **Separation of Concerns:** Splitting state recalculation (`update()`) and visual rendering (`draw()`) into separate methods mirrors standard game loops and graphics engine patterns.
* **Maintainability:** Decoupling physics from rendering ensures cleaner, modular code that is easy to extend (e.g., adding gravity, edge collisions, or opacity fade-out without modifying canvas drawing calls).

```

```
```markdown
---

## Q&A & Developer Notes: Particle System Architecture

### 1. Code Implementation

```javascript
class Particle {
  constructor() {
    // Initial random placement when the particle is instantiated
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 20;

    // Velocities (speed + direction)
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  // State / Physics Step
  update() {
    this.x += this.speedX; // Left: negative, Right: positive
    this.y += this.speedY; // Up: negative, Down: positive
  }

  // Render Step
  draw() {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

```

---

### 2. Method Breakdown & Conceptual Reasoning

#### `update()` — State & Motion

* **Developer Query / Thought:** Does calling `update()` just assign the particle to a random place?
* **Clarification:** No. `update()` advances current position along a trajectory using 2D vector movement:

$$\text{New Position} = \text{Current Position} + \text{Velocity}$$


* Horizontal ($x$): Adding negative values moves left; adding positive moves right.
* Vertical ($y$): Canvas origin $(0, 0)$ is top-left, so negative values move **up** and positive values move **down**.


* **Key Rule:** Initial random placement belongs in the `constructor()`. `update()` handles frame-by-frame delta movement, not teleportation.

#### `draw()` — Rendering

* **Developer Query / Thought:** Does `draw()` just mean to draw it out?
* **Clarification:** Yes. Its sole job is translating stored instance values (`x`, `y`, `size`, color) into canvas API calls (`beginPath()`, `arc()`, `fill()`).

#### Separation of Concerns

* **Developer Query / Thought:** Organizing them in separate function calls helps people understand and write cleaner code.
* **Clarification:** Exactly. Splitting state/physics (`update()`) from rendering (`draw()`) decouples logic from visuals—mirroring standard game engines and animation loops.

---

### 3. Data Structures: Why Store Particles in Arrays?

#### Developer Question

```javascript
function init() {
  for (let i = 0; i < 100; i++) {
    /* Inside the for loop, need a data structure to hold particle objects */
    particlesArray.push(new Particle());
  }
}

```

*Why store particles in an array instead of separate variables?*

#### 1. Avoiding Variable Bloat (The Roll Call Analogy)

* **Without an Array:** Managing 100 particles requires 100 unique variable names (`particle1`, `particle2`, etc.) and 200 lines of manual function calls inside the animation loop.
* **With an Array:** It acts like an egg carton or roll call. A single loop executes the exact same operations across every slot in 3 lines:
```javascript
for (let i = 0; i < particlesArray.length; i++) {
  particlesArray[i].update();
  particlesArray[i].draw();
}

```



#### 2. Memory Structure Comparison

**Loose Variables (Manual & Fixed):**

```text
RAM (Memory)
+---------------+---------------+---------------+
|  particle1    |  particle2    |  particle3    | ... up to particle100
|  { x, y... }  |  { x, y... }  |  { x, y... }  |
+---------------+---------------+---------------+

```

**Array Structure (Single Indexed Reference):**

```text
                  particlesArray
                 +---------------+
                 |  Length: 100  |
                 +---------------+
                         |
       +-----------------+-----------------+-----------------+
       | [0]             | [1]             | [2]             | ... [99]
       v                 v                 v                 v
+---------------+ +---------------+ +---------------+ +---------------+
|   Particle    | |   Particle    | |   Particle    | |   Particle    |
|   Object      | |   Object      | |   Object      | |   Object      |
| - x: 142      | | - x: 89       | | - x: 310      | | - x: 45       |
| - y: 55       | | - y: 204      | | - y: 12       | | - y: 400      |
| - speedX: 1.2 | | - speedX:-0.5 | | - speedX: 2.1 | | - speedX:-1.8 |
| - speedY:-0.8 | | - speedY: 1.1 | | - speedY: 0.4 | | - speedY:-0.2 |
+---------------+ +---------------+ +---------------+ +---------------+

```

#### 3. Dynamic Lifecycles (Spawning & Pruning)

Particle counts change continuously at runtime:

* **Spawning:** Inject new particles on mouse move or triggers using `.push()`:
```text
[ Particle 0 ] -> [ Particle 1 ]  +  .push()  =>  [ Particle 0 ] -> [ Particle 1 ] -> [ Particle 2 ]

```


* **Pruning:** Remove dead particles (shrunk or off-screen) using `.splice(i, 1)`:
```text
[ Particle 0 ] -> [ Particle 1 (DEAD) ] -> [ Particle 2 ]
                         |
                   .splice(1, 1)
                         v
[ Particle 0 ] --------------------------> [ Particle 1 ] (re-indexed)

```

### 4. Lifecycle Timing: Why `mouse.x` & `mouse.y` Remain `undefined`

#### Developer Question
*Why are the `x` and `y` properties of the 100 particle objects still `undefined` when hovering over the canvas? Doesn't `mousemove` detect cursor position and pass the coordinates to the particles?*

#### Developer Summary & Core Realization
*“Oh, so it called `init()` before the user can use the mouse, right?”*  
**Verdict:** Exactly right.

#### The Execution Timeline Breakdown

1. Page Loads:
   Script executes synchronously top-to-bottom in milliseconds.
   mouse initialized: { x: undefined, y: undefined }

2. init() is called immediately:
   All 100 Particle instances are created right away.
   In constructor():
     this.x = mouse.x  --> receives undefined
     this.y = mouse.y  --> receives undefined

3. User moves mouse later:
   mousemove fires: mouse.x = event.x, mouse.y = event.y
   Existing particles do NOT update because values are copied, not linked.


#### Key Mechanics: Pass-by-Value vs. Live Links

* `this.x = mouse.x` copies the snapshot value of `mouse.x` at the exact millisecond the particle is instantiated.
* It does **not** bind a live reference or link. Updating `mouse.x` later has no effect on particles created earlier.

#### Solutions Depending on Desired Behavior

* **Mouse Trail Effect (Dynamic Spawning):** Do not generate particles inside `init()`. Instead, run `.push(new Particle())` directly inside the `mousemove` event listener so each particle reads the updated coordinates at birth.
* **Ambient Floating Field (Pre-Spawned):** If pre-generating in `init()`, initialize coordinates using canvas dimensions (`Math.random() * canvas.width`) rather than the mouse object.


# Explain `animate()`, `update()`, and `draw()` Timing Sequence and How It Works

When making animations with Canvas, the typical game loop looks like this:

```javascript
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    update();
    draw();

    requestAnimationFrame(animate);
}
```
# Explain `animate()`, `update()`, and `draw()` Timing Sequence and How It Works

When making animations with Canvas, the typical game loop looks like this:

```javascript
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    update();
    draw();

    requestAnimationFrame(animate);
}
```

---
---

# What Each Function Does

## `update()`

Updates the object's data.

Example:

```javascript
x += velocity;
```

If:

```javascript
x = 100;
velocity = 5;
```

then after:

```javascript
update();
```

the value becomes:

```javascript
x = 105;
```

---

## `draw()`

Draws the current values onto the canvas.

Example:

```javascript
ctx.fillRect(x, y, 50, 50);
```

If:

```javascript
x = 105;
```

then the square is drawn at:

```text
x = 105
```

---

## `animate()`

The main animation loop.

Its job is to:

```text
1. Clear current frame
2. Update values
3. Draw new frame
4. Schedule next frame
5. Repeat
```

### Why "clear current frame" instead of "clear previous frame"?

Because when `animate()` starts running, the canvas is currently showing a frame on the screen.

So:

```javascript
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

feels more like:

```text
Clear the current frame that is visible right now
```

than:

```text
Clear the previous frame
```

Even though technically they refer to the same drawing.

---

# Why Does The User See The Updated Value First?

For example:

```javascript
x = 100;
velocity = 5;
```

The game starts:

```javascript
clearRect();   // wipes nothing
update();      // x becomes 105
draw();        // draw x = 105
```

The user sees:

```text
x = 105
```

not:

```text
x = 100
```

because it was meant to be that way.

The user wouldn't see the original value because the value has to fall/move as soon the game starts.

The user will never see when:

```javascript
x = 100;
```

That value only exists in memory before the first frame is rendered.

So:

```text
x = 100
```

exists briefly in memory,

then:

```text
update()
```

changes it to:

```text
x = 105
```

and the first visible frame is:

```text
x = 105
```

---

# Why Is `clearRect()` At The Beginning?

A common question:

> if its frame one, it will clear frame immideatly?

Yes, but Frame 1 is special.

Canvas starts as:

```text
[empty]
```

So:

```javascript
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

does:

```text
[empty] -> [empty]
```

Nothing visible happens.

There is nothing to erase yet.

The reason programmers still put it there is because they want the exact same sequence every frame:

```text
clear
update
draw
requestAnimationFrame
```

instead of:

```text
Frame 1:
update
draw

Frame 2+:
clear
update
draw
```

---

# Visual Timeline

## Initial State

```javascript
x = 100;
```

Canvas:

```text
[empty]
```

Nothing has been drawn yet.

---

## Frame 1

```text
clearRect()
    nothing to erase

update()
    x = 105

draw()
    draw x = 105

requestAnimationFrame()
```

### Why call `requestAnimationFrame()`?

Because we want `draw()` to stay on the screen for a few seconds before `animate()` runs again.

If `animate()` was called immediately:

```text
draw x = 105
↓
animate()
↓
clearRect()
```

the drawing would be wiped out immediately, too fast for humans to see.

Instead:

```text
draw x = 105
↓
requestAnimationFrame()
↓
wait a few seconds so the user can see the drawing
↓
animate() runs again
↓
clearRect()
↓
update()
↓
draw()
```

Browser shows:

```text
x = 105
```

---

## Frame 2

```text
clearRect()
    erase x = 105

update()
    x = 110

draw()
    draw x = 110

requestAnimationFrame()
```

Again:

```text
draw x = 110
↓
requestAnimationFrame()
↓
wait a few seconds so the user can see the drawing
↓
animate() runs again
↓
clearRect()
```

Browser shows:

```text
x = 110
```

---

## Frame 3

```text
clearRect()
    erase x = 110

update()
    x = 115

draw()
    draw x = 115

requestAnimationFrame()
```

Again:

```text
draw x = 115
↓
requestAnimationFrame()
↓
wait a few seconds so the user can see the drawing
↓
animate() runs again
↓
clearRect()
```

Browser shows:

```text
x = 115
```

---

# What Would Happen Without `requestAnimationFrame()`?

Imagine:

```javascript
function animate() {
    clearRect();
    update();
    draw();

    animate(); // BAD
}
```

JavaScript would do:

```text
clear
update
draw
clear
update
draw
clear
update
draw
clear
update
draw
...
```

over and over.

The drawing would get wiped out immediately before the user could see it.

That's why:

```javascript
requestAnimationFrame(animate);
```

acts like a pause between frames.

Mental model:

```text
draw()
↓
requestAnimationFrame()
↓
wait a few seconds
↓
animate()
↓
clearRect()
↓
update()
↓
draw()
```

This gives the user time to actually see the drawing before it gets replaced by the next frame.

---

# My Conclusion

> if its frame one, it will clear frame immideatly? oh its because you dont want the user to see the original value, you want users to see the updated value. Frame 1 original value-> animate immideiatly clears that, user cant even see it. update value -> draw() -> requestAnimationFrame let it show for a few seconds-> then call animate to clear frame. function ends. Frame 2-> update()-> draw()-> wait for few seconds->call animate again until ctx.clearRect(0, 0, canvas.width, canvas.height) to wipe out the the previous drawing. so its only frame one value that gets wiped out immideately. and when the value is updated, thats when requestAnimationFrame() could wait for draw for a few seconds.

So your conclusion is spot on:

> `clearRect()` is really for Frame 2, Frame 3, Frame 4, etc. Frame 1 technically runs it too, but there's nothing there yet. The original value exists only in memory. The user doesn't see it because the game immediately updates and draws the new value. `requestAnimationFrame()` then lets that drawn frame stay on screen until the next refresh, where `animate()` runs again and `clearRect()` can wipe the previous drawing.

## Final Mental Model

```text
Initial value:
x = 100
(user never sees this)

Frame 1:
clearRect()      -> wipes nothing
update()         -> x = 105
draw()           -> draw x = 105
requestAnimationFrame()
wait a few seconds
show x = 105

Frame 2:
clearRect()      -> wipe current frame (x = 105)
update()         -> x = 110
draw()           -> draw x = 110
requestAnimationFrame()
wait a few seconds
show x = 110

Frame 3:
clearRect()      -> wipe current frame (x = 110)
update()         -> x = 115
draw()           -> draw x = 115
requestAnimationFrame()
wait a few seconds
show x = 115
```

**Key takeaway:** The user never sees `x = 100`. The first visible frame is already the updated value, and `requestAnimationFrame()` prevents `animate()` from immediately wiping out what `draw()` just drew. It gives the drawing time to stay visible before the next frame begins.


A common question:

> wouldn't that mean animate() will happen infinitely?


## Animation Loop Lifecycle

The animation loop continues running because each call to `animate()` schedules the next call using `requestAnimationFrame()`.

```javascript
function animate() {
    update();
    draw();

    requestAnimationFrame(animate);
}
```

When the animation starts:

```javascript
animate();
```

the sequence becomes:

```text
animate()
↓
update()
↓
draw()
↓
requestAnimationFrame(animate)
↓
animate() ends

(wait)

animate()
↓
update()
↓
draw()
↓
requestAnimationFrame(animate)
↓
animate() ends
```

This process repeats continuously, creating the animation loop.

### Why Doesn't This Cause Infinite Recursion?

The loop does **not** work like this:

```javascript
function animate() {
    animate();
}
```

which would immediately call itself over and over until the program crashes.

Instead, `requestAnimationFrame()` tells the browser to start a **new** `animate()` call later.

```text
animate()
↓
requestAnimationFrame(animate)
↓
animate() ends
↓
wait a few seconds
↓
browser starts a new animate() call
```

Each execution finishes before the next one begins.

### Stopping The Animation

The animation stops when a new frame is no longer scheduled.

```javascript
let gameOver = false;

function animate() {

    if (gameOver) {
        return;
    }

    update();
    draw();

    requestAnimationFrame(animate);
}
```

When:

```javascript
gameOver = true;
```

the next call to `animate()` exits before reaching:

```javascript
requestAnimationFrame(animate);
```

Because no new frame is scheduled, the animation loop stops.

### Mental Model

```text
animate()
↓
update()
↓
draw()
↓
requestAnimationFrame()
↓
wait a few seconds
↓
animate()
↓
update()
↓
draw()
↓
requestAnimationFrame()
↓
wait a few seconds
↓
repeat
```

`animate()` is only called manually once.

```javascript
animate();
```

After that, `requestAnimationFrame()` keeps the animation running by scheduling the next frame.

# JavaScript Fundamentals: The `let` Keyword

A quick-reference guide explaining the `let` keyword in JavaScript, how it manages state and variable reassignment, and how it differs from `const` and `var`.

---

## What is `let`?

Introduced in ECMAScript 2015 (ES6), **`let`** declares a reassignable, block-scoped local variable. It tells JavaScript to allocate memory for a variable whose value is expected to change over time.

```javascript
let hue = 0;
hue = hue + 1; // Valid: hue is now 1
