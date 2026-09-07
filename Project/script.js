//0. Gets an HTML <canvas> element and prepares it for drawing.

//1. Finds the element with id="canvas1" in your HTML
const canvas = document.getElementById('canvas1');

//2.Gets the canvas's 2D drawing context and stores it in ctx
// use ctx to draw shapes, text, images, lines and more
// A drawing context is the object that gives you the tools to draw onto a canvas.
const ctx = canvas.getContext('2d') // Hey, give me tools to draw 2D things on Canvas

//3. Check if canvas is succesfully in showing in browser if its console.log('canvas')
//3. Chek if Javascripts has succesfully found canvas. -> need to go to browswer and inspect, then hit console 
// to see that java prints out the value in the console
//3.5 Prints the 2D drawing tools (ctx) to the Console, so you can confirm they were created.
console.log(ctx);

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// THis means: “Listen for an event happening in the browser window.”
//It needs:
//1. The event name, such as 'resize'
//2. A function to run when it happens
window.addEventListener('resize', function(){
  // make sure canvas is the same size as the browswer window
  // so rect dont distort when we change size of window
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  // draw again because canvas.width and canvas.height clears the entire canvas
  //resizing the canvas like replacing it with a fresh blank drawing surface.
  ctx.fillStyle = 'white'
  ctx.fillRect(10,20,150,50);
  // Draw a circle
  ctx.fillStyle = 'blue'
  /*For lines, you not only need to 
  speficy values first, you need to first all beginPath() as well*/
  ctx.strokeStyle = 'blue'
  ctx.lineWidth = 10;
  ctx.beginPath();
  // ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  ctx.arc(150,200,50,0,Math.PI * 2)// coordinates (100,100) is the central point
  //ctx.fill();
  ctx.stroke();

  
})
/* addEventListensor the event is automatically created when the user 
resize window, it automatically gets created and 
pass in. and after that the function() will automaiclaly 
get called too*/


// Custom mouse object. its a global object
const mouse = {
  x: undefined, // Inittially, the mouse will contain x and y  properties
  y: undefined, // x and y is set to undefined because we what to start with blnk canvas 

}


// addEventListener takes in a clikc object and a callback function.
canvas.addEventListener('click', function(event){ 
  /*The canvas listens for a user input. 
  Once the user click, 'click' object is created automatically
  , and autoamtically get pass in addEventListener(), the function(event)
  also gets called automatically because the event object inside 
  function(event) inside contains all the information that the 'click'
  event that just occured. such as x, y cooridinates of the click and more */
  mouse.x = event.x;
  mouse.y = event.y;
  //drawCircle(); 

  /*since mouse is a global object, 
  now the information stored in the event
  object is globally avaliable! 
  */

   // Now check if the event is created in Javascript
  console.log(event);
  /*you dont have to name it 
  'event'. any variable name works
   cuz javascript knows argument passed to a
  call back function(event) on event listener
  refers the the built-in event object that 
  browswer just created when the user clicks
   */

})

// What if you want the canvas to paint circles when you mouse moves across the canvas?
canvas.addEventListener('mousemove',function(event){
  mouse.x = event.x
  mouse.y = event.y
  //drawCircle(); // drawCircle is being called over and over again 
  //console.log(event); // omg so much haha 
})

// What if we want to draw multiple circles
// Make a resusable function: so we can draw circles easy over and over again
// This is called function declaration. but javascript will not run the code.
// it only kepts in memeroy 
function drawCircle(){
  ctx.fillStyle = 'orange';
  //ctx.beginPath();
  //ctx.arc(mouse.x, mouse.y, 20,0,Math.PI*2);
  ctx.fillRect(mouse.x, mouse.y, 20,20);// fills rectangle based on mouse movement already 
  ctx.fill();
}

// try to draw using ctx and see if it appears on the screen
ctx.fillStyle = 'white'
ctx.fillRect(10,20,150,50);// coordinates (10,20) is the upper left starting point

// Draw a circle
ctx.fillStyle = 'blue'
ctx.strokeStyle = 'blue'
/*For lines, you not only need to 
speficy values first, you need to first all beginPath() as well*/
ctx.lineWidth = 10;
ctx.beginPath();
// ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
ctx.arc(150,100,40,0,Math.PI * 2)// coordinates (100,100) is the central point
//ctx.fill();
ctx.stroke(); // stroke() is for not filled circle
// check again in console. all these are stored in the ctx variable
console.log(ctx);


// Custom class - yay create own object in javascript!. To create particle system
class Particle{

  // mandatory constructor method
  constructor(){
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random()*5 + 1 // one to almost 6. [1, 6)
    this.speedX = Math.random()*3 - 1.5 //[-1.5, 1.5)
    this.speedY = Math.random()*3 - 1.5 //[-1.5, 1.5)
  }
  // behavior will be defined as methods of this class. its functions of the object
}





//custom function  will be called over and over creating a function loop
function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear whats its currently on canvas
  drawCircle(); // draw on current canvas. the (x,y)is moving. so everytime it makes a new location drawing, clearRect will delete the previous one
  // BUilt-in function : it just calls function as we pass it as an argument
  // this function is just for repetition
  requestAnimationFrame(animate);
  // this is like person on the whilteboard: wipe, draw. again. wipe, draw. again. wipe, draw..
}
animate();
