class Endboss extends MovableObject {
  height = 250;
  width = 160;
  y = 190;
  speed = 0;
  currentImg = 0;
  offset = { top: 60, left: 30, right: 10, bottom: 5 };

  IMAGES_IDLE = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor(x, sectionStart, sectionEnd) {
    super();
    this.loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.x = x;
    this.sectionStart = sectionStart;
    this.sectionEnd = sectionEnd;
    this.otherDirection = false;
    this.speed = 20;
    this.isIdle = true;
    this.isAlert = false;
    this.isActive = false;
    this.isAttacking = false;
    this.isHurt = false;
    this.dead = false;
    this.hasEnteredArena = false;
    this.deadSoundPlayed = false;
    this.alertSoundPlayed = false;
    this.overlayTriggered = false;
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  start() {
    this.animate();
  }

  animate() {
    this.world.registerInterval(
      setInterval(() => {
        this.updateState();
      }, 150),
    );
  }

  updateState() {
    if (this.dead) {
      this.handleDeadState();
      return;
    }
    if (this.isHurt) {
      this.handleHurtState();
      return;
    }
    if (this.isAttacking) {
      this.handleAttackState();
      return;
    }
    if (this.isAlert) {
      this.handleAlertState();
      return;
    }
    if (this.isActive) {
      this.handleActiveState();
      return;
    }
    if (this.isIdle) {
      this.handleIdleState();
    }
  }

  handleDeadState() {
    const finished = this.playAnimationOnce(this.IMAGES_DEAD);
    audioManager.playOneTimeForObject(
      this,
      audioManager.endbossDeadSound,
      "deadSoundPlayed",
      0.4,
    );
    if (finished && !this.overlayTriggered) {
      this.overlayTriggered = true;
      setTimeout(() => toggleYouWonOverlay(true), 3000);
    }
  }

  handleHurtState() {
    let finished = this.playAnimationOnce(this.IMAGES_HURT);
    if (finished) {
      this.isHurt = false;
      this.startAttack();
    }
  }

  handleAttackState() {
    let finished = this.playAnimationOnce(this.IMAGES_ATTACK);
    if (finished) {
      this.isAttacking = false;
    }
  }

  handleAlertState() {
    let finished = this.playAnimationOnce(this.IMAGES_ALERT);
    if (finished) {
      this.isAlert = false;
      this.isActive = true;
      this.currentImg = 0;
    }
    audioManager.playOneTimeForObject(
      this,
      audioManager.endbossAlertSound,
      "alertSoundPlayed",
      0.5,
    );
  }

  handleActiveState() {
    this.handleMovementBoundaries();
    this.playWalkAnimation();
  }

  handleIdleState() {
    this.playAnimation(this.IMAGES_IDLE);
  }

  playWalkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    if (!this.otherDirection) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  }

  handleMovementBoundaries() {
    if (!this.isActive) return;
    if (!this.hasEnteredArena) {
      if (this.x <= this.sectionEnd - this.width) {
        this.hasEnteredArena = true;
      }
      return;
    }

    if (this.x <= this.sectionStart) {
      this.x = this.sectionStart;
      this.otherDirection = true;
    }
    if (this.x + this.width >= this.sectionEnd) {
      this.x = this.sectionEnd - this.width;
      this.otherDirection = false;
    }
  }

  triggerAlert() {
    if (this.isIdle) {
      this.isIdle = false;
      this.isAlert = true;
      this.currentImg = 0;
    }
  }

  hurt() {
    super.hit();
    if (this.energy <= 0) {
      this.die();
      return;
    }
    this.isHurt = true;
    this.isAttacking = false;
    this.isActive = false;
    this.currentImg = 0;
    audioManager.playEndbossHurt();
  }

  die() {
    this.dead = true;
    this.isHurt = false;
    this.isAttacking = false;
    this.isActive = false;
    this.isAlert = false;
    this.currentImg = 0;
  }

  startAttack() {
    this.isAttacking = true;
    this.isActive = true;
    this.currentImg = 0;
  }
}
