class Character extends MovableObject {
  height = 250;
  width = 110;
  y = 180;
  speed = 10;
  world;
  currentImg = 0;
  jumpingIndex = 0;
  longIdleIndex = 0;
  longIdleDelay = 0;
  idleIndex = 0;
  idleDelay = 0;
  bottleCount = 0;
  maxBottle = 6;
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.offset = { top: 100, bottom: 10, left: 10, right: 30 };
    this.longIdleTimer = this.calculateIdleTimer(10);
    this.isInIdleState = false;
    this.wasIdleLastFrame = false;
    this.deathAnimationStarted = false;
    this.deathAnimationPlayed = false;
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  start() {
    this.physicsLoop();
    this.animate();
    this.applyGravity();
  }

  //movement loop - physics
  physicsLoop() {
    this.world.registerInterval(
      setInterval(() => {
        this.handleMovement();
        this.handleJump();
        this.updateCamera();
      }, 1000 / 60),
    );
  }

  //animation loop
  animate() {
    this.world.registerInterval(
      setInterval(() => {
        this.handleAnimationState();
      }, 50),
    );
  }

  handleMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      if (!this.isAboveGround()) {
      }
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      if (!this.isAboveGround()) {
      }
    }
  }

  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      audioManager.playRestartable(audioManager.characterJumpSound, 0.2);
    }
  }

  updateCamera() {
    this.world.camera_x = -this.x + 80;
  }

  handleAnimationState() {
    if (this.handleHurtAnimation()) return;
    if (this.handleDeadAnimation()) return;
    if (this.handleJumpAnimation()) return;
    if (this.handleWalkAnimation()) return;
    this.handleIdleAnimations();
  }

  handleHurtAnimation() {
    if (this.isHurt()) {
      if (this.isInIdleState) {
        this.resetIdleState();
        this.isInIdleState = false;
        this.wasIdleLastFrame = false;
      }
      this.playAnimation(this.IMAGES_HURT);
      this.longIdleTimer.reset();
      return true;
    }
    return false;
  }

  handleDeadAnimation() {
    if (this.isDead()) {
      if (!this.deathAnimationStarted) {
        this.currentImg = 0;
        this.deathAnimationStarted = true;
      }
      this.playAnimation(this.IMAGES_DEAD);
      this.speed = 0;
      this.speedY = 0;
      if (
        this.currentImg === this.IMAGES_DEAD.length - 1 &&
        !this.deathAnimationPlayed
      ) {
        this.deathAnimationPlayed = true;
        setTimeout(() => toggleYouLostOverlay(true), 3000);
      }
      return true;
    }
    return false;
  }

  handleJumpAnimation() {
    if (this.isAboveGround()) {
      if (this.isInIdleState) {
        this.resetIdleState();
        this.isInIdleState = false;
        this.wasIdleLastFrame = false;
      }
      this.smoothJumpAnimation();
      this.longIdleTimer.reset();
      return true;
    } else {
      this.jumpingIndex = 0;
      return false;
    }
  }

  handleWalkAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      if (this.isInIdleState) {
        this.resetIdleState();
        this.isInIdleState = false;
        this.wasIdleLastFrame = false;
      }
      this.playAnimation(this.IMAGES_WALKING);
      this.longIdleTimer.reset();
      return true;
    }
    return false;
  }

  //here I MUST mention that I use a time-driven animation
  //as compared to the state-driven animation of the Endboss
  handleIdleAnimations() {
    if (!this.wasIdleLastFrame) {
      this.img = this.imageCache[this.IMAGES_IDLE[0]];
    }
    this.wasIdleLastFrame = true;
    this.isInIdleState = true;
    this.longIdleTimer.start();
    if (this.world.keyboard.THROW) {
      if (this.isInIdleState) {
        this.resetIdleState();
        this.isInIdleState = false;
        this.wasIdleLastFrame = false;
      }
      this.smoothIdleAnimation();
      this.longIdleTimer.reset();
    } else if (this.longIdleTimer.hasReached()) {
      this.smoothLongIdleAnimation();
    } else {
      this.smoothIdleAnimation();
    }
    return true;
  }

  resetIdleState() {
    this.idleDelay = 0;
    this.idleIndex = 0;
    this.longIdleDelay = 0;
    this.longIdleIndex = 0;
    audioManager.stopCharacterSnoreSound();
  }

  smoothJumpAnimation() {
    if (this.speedY > 0) {
      this.manageIndexInterval(0, 3);
    } else if (this.speedY < 0 && this.isAboveGround()) {
      this.manageIndexInterval(4, 6);
    } else if (!this.isAboveGround()) {
      this.manageIndexInterval(7, 8);
    } else {
      this.img = this.imageCache[this.IMAGES_JUMPING[0]];
    }
  }

  manageIndexInterval(start, end) {
    if (this.jumpingIndex < start) {
      this.jumpingIndex = start;
    } else if (this.jumpingIndex <= end) {
      this.img = this.imageCache[this.IMAGES_JUMPING[this.jumpingIndex]];
      this.jumpingIndex++;
    } else {
      this.jumpingIndex = end;
      this.img = this.imageCache[this.IMAGES_JUMPING[end]];
    }
  }

  smoothIdleAnimation() {
    this.idleDelay++;
    if (this.idleDelay < 8) {
      return;
    }
    this.idleDelay = 0;
    if (this.idleIndex < this.IMAGES_IDLE.length) {
      this.img = this.imageCache[this.IMAGES_IDLE[this.idleIndex]];
      this.idleIndex++;
    } else {
      this.idleIndex = 0;
    }
  }

  smoothLongIdleAnimation() {
    this.longIdleDelay++;
    if (this.longIdleDelay < 10) {
      return;
    }
    this.longIdleDelay = 0;
    if (this.longIdleIndex < this.IMAGES_LONG_IDLE.length) {
      this.img = this.imageCache[this.IMAGES_LONG_IDLE[this.longIdleIndex]];
      this.longIdleIndex++;
    } else {
      this.longIdleIndex = 0;
    }
    audioManager.playCharacterSnoreSound();
  }

  manageBottleCount(delta) {
    let newCount = this.bottleCount + delta;
    if (newCount > this.maxBottle) {
      newCount = this.maxBottle;
    }
    if (newCount < 0) {
      newCount = 0;
    }
    this.bottleCount = newCount;
    this.world.bottleBar.setPercentage(
      (this.bottleCount / this.maxBottle) * 100,
    );
  }
}
