let canvas;
let world;
let keyboard = new Keyboard();
let soundIsOn = true;

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
//Sound effects manager

//this function controls sound effects fired by keyboard and collision
//like in world.js (collectibles, jump, throw)
function playSoundEffect(sound, volume = 1) { 
    if(!soundIsOn) return;
    const s = sound.cloneNode();
    s.volume = volume;
    s.play(); 
}


function stopLoopingSound(sound) { 
    sound.pause(); 
    sound.currentTime = 0; 
}

function muteMusicAndSound(isOn){
    soundIsOn = isOn;
    audio.music.backgroundMusic.muted = !isOn;
    Object.values(audio.effects).forEach(effect => {
        effect.muted = !isOn;
    })
}

function toggleSound(){
    muteMusicAndSound(!soundIsOn);
}

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





