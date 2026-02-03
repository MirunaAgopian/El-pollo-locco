window
  .matchMedia("(orientation: portrait)")
  .addEventListener("change", checkOrientation);
window.addEventListener("resize", checkOrientation);

function checkOrientation() {
  const portrait = window.matchMedia("(orientation: portrait)").matches;
  if (window.innerWidth >= 1030) {
    showOrientationWarning(false);
    return;
  }
  if (portrait) {
    showOrientationWarning(true);
  } else {
    showOrientationWarning(false);
  }
}

function showOrientationWarning(isPortrait) {
  const container = document.getElementById("orientation_warning");
  if (isPortrait) {
    container.style.display = "flex";
  } else {
    container.style.display = "none";
  }
}

function toggleInfoPannel() {
  const gameStory = document.getElementById("game_story_container");
  const gameControls = document.getElementById("game_controls_container");
  gameStory.classList.toggle("d-none");
  gameControls.classList.toggle("d-none");
}

function showStartScreen() {
  const overlay = document.getElementById("start_screen");
  const game = document.getElementById("game_wrapper");
  overlay.classList.remove("d-none");
  game.classList.add("d-none");
}

function toggleYouLostOverlay(show) {
  const overlay = document.getElementById("overlay_you_lost");
  if (show) {
    overlay.classList.remove("d-none");
    audioManager.backgroundMusic.pause();
    audioManager.backgroundMusic.currentTime = 0;
    audioManager.playOneShot(audioManager.youLost, 0.3);
  } else {
    overlay.classList.add("d-none");
  }
}

function toggleYouWonOverlay(show) {
  const overlay = document.getElementById("overlay_you_won");
  if (show) {
    if(world) world.stopGame();
    overlay.classList.remove("d-none");
    audioManager.backgroundMusic.pause();
    audioManager.backgroundMusic.currentTime = 0;
    audioManager.stopCharacterSnoreSound();
    audioManager.endbossDeadSound.pause();
    audioManager.endbossDeadSound.currentTime = 0;
    audioManager.playOneShot(audioManager.youWon, 0.3);
  } else {
    overlay.classList.add("d-none");
  }
}
