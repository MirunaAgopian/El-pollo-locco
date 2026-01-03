let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
}

document.addEventListener('keydown', (event) => {
    console.log(event);
    if(event.code === "ArrowUp") {
        keyboard.UP = true;    
    } 
     if(event.code === "ArrowDown") {
        keyboard.DOWN = true;
    } 
    if (event.code === "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if(event.code === "ArrowRight") {
        keyboard.RIGHT = true;
    } 
    if(event.code === "Space") {
        keyboard.SPACE = true;
    }
});

document.addEventListener('keyup', (event) => {
    console.log(event);
    if(event.code === "ArrowUp") {
        keyboard.UP = false;   
    } 
     if(event.code === "ArrowDown") {
        keyboard.DOWN = false;
    } 
    if (event.code === "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if(event.code === "ArrowRight") {
        keyboard.RIGHT = false;
    } 
    if(event.code === "Space") {
        keyboard.SPACE = false;
    }
});

//AMR -   13
