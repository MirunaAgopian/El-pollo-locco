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