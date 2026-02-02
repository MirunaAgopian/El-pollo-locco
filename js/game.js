let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();

function init(){
    canvas = document.getElementById('canvas');
    initMobileControls();
    showStartScreen();
}

function startGame(){
    world = new World(canvas, keyboard);
    world.draw();
    world.run();
    world.setVerticalCollisionInterval();
}


//To be used later - it should not refresh the browser
// function restartGame(){
//     this.stopGame();
//     world = new World(canvas, keyboard);
// }

//Keyboard manager

document.addEventListener('keydown', (event) => {
    if(event.code === "ArrowUp") {
        keyboard.UP = true;
        event.preventDefault();    
    } 
     if(event.code === "ArrowDown") {
        keyboard.DOWN = true;
        event.preventDefault();
    } 
    if (event.code === "ArrowLeft") {
        keyboard.LEFT = true;
        event.preventDefault();
    }
    if(event.code === "ArrowRight") {
        keyboard.RIGHT = true;
        event.preventDefault();
    } 
    if(event.code === "Space") {
        keyboard.SPACE = true;
        event.preventDefault();
    }
    if(event.code === "KeyD") {
        keyboard.THROW = true;
        event.preventDefault();
    }
});

document.addEventListener('keyup', (event) => {
    if(event.code === "ArrowUp") {
        keyboard.UP = false;  
        event.preventDefault(); 
    } 
     if(event.code === "ArrowDown") {
        keyboard.DOWN = false;
        event.preventDefault();
    } 
    if (event.code === "ArrowLeft") {
        keyboard.LEFT = false;
        event.preventDefault();
    }
    if(event.code === "ArrowRight") {
        keyboard.RIGHT = false;
        event.preventDefault();
    } 
    if(event.code === "Space") {
        keyboard.SPACE = false;
        event.preventDefault();
    } if(event.code === "KeyD") {
        keyboard.THROW = false;
        event.preventDefault();
    }
});

function setUpTouchButtons(id, key) {
    const btn = document.getElementById(id);

    btn.addEventListener('touchstart', e => {
        e.preventDefault();
        keyboard[key] = true;
        navigator.vibrate?.(30);
    });
    btn.addEventListener('touchend', e => {
        e.preventDefault();
        keyboard[key] = false;
    });
}

function initMobileControls(){
    setUpTouchButtons('btn_right', 'RIGHT');
    setUpTouchButtons('btn_left', 'LEFT');
    setUpTouchButtons('btn_jump', 'SPACE');
    setUpTouchButtons('btn_throw', 'THROW');
}





