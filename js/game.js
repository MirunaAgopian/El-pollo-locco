let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    initMobileControls();
}

document.addEventListener('keydown', (event) => {
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
    if(event.code === "KeyD") {
        keyboard.THROW = true;
    }
});

document.addEventListener('keyup', (event) => {
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
    } if(event.code === "KeyD") {
        keyboard.THROW = false;
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





