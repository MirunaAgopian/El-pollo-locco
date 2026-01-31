window.matchMedia('(orientation: portrait)').addEventListener('change', checkOrientation);
window.addEventListener('resize', checkOrientation);

function checkOrientation(){
    const portrait = window.matchMedia('(orientation: portrait)').matches;
    if(window.innerWidth >= 1030) {
        showOrientationWarning(false);
        return
    }
    if(portrait) {
        showOrientationWarning(true);
    } else {
        showOrientationWarning(false);
    }
}

function showOrientationWarning(isPortrait) {
    const container = document.getElementById('orientation_warning');
    if(isPortrait){
        container.style.display = 'flex';
    } else {
        container.style.display = 'none';    
    }
}

function toggleInfoPannel(){
    const gameStory = document.getElementById('game_story_container');
    const gameControls = document.getElementById("game_controls_container");
    gameStory.classList.toggle('d-none');
    gameControls.classList.toggle('d-none');
}

function toggleStartScreen(){
    const overlay = document.getElementById('start_screen');
    const game = document.getElementById('game_wrapper');
    overlay.classList.toggle('d-none');
    game.classList.toggle('d-none');
}