let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    console.log('My character is', world.character);
    
}

document.addEventListener('keypress', (event) => {
    console.log(event);
    
});

//AMR   06 - Keyboard Objekt - 06:20
