let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    initMobileControls();
    showStartScreen();
}

function startGame(){
    world = new World(canvas, keyboard);
}

function controlBackgroundMusic(isOn){
    if(isOn){
        audio.music.backgroundMusic.play();
        audio.music.backgroundMusic.volume = 0.1;
        audio.music.backgroundMusic.currentTime = 0;
        audio.music.backgroundMusic.loop = true;
    } else {
        audio.music.backgroundMusic.pause();
    }
}

function muteMusicAndSound(isOn){
    let musicElement = audio.music.backgroundMusic;
    
    if(isOn){
        musicElement.muted = false;
        Object.values(audio.effects).forEach(element => {
        element.muted = false;
    });
    } else {
        musicElement.muted = true;
        Object.values(audio.effects).forEach(element => {
        element.muted = true;
    });
    }
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





