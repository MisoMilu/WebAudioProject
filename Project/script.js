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
//console.log(ctx);



// THis means: “Listen for an event happening in the browser window.”
//It needs:
//1. The event name, such as 'resize'
//2. A function to run when it happens
window.addEventListener('resize', function(){
  // make sure canvas is the same size as the browswer window
  // so rect dont distort when we change size of window
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})
/* addEventListenso the event is automatically created when the user 
resize window, it automatically gets created and 
pass in. and after that the function() will automaiclaly 
get called too*/

// try to draw using ctx and see if it appears on the screen
ctx.fillStyle = 'white'
ctx.fillRect(10,20,150,50);