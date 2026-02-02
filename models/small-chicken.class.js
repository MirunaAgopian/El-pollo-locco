class SmallChicken extends MovableObject {
  height = 55;
  width = 40;
  y = 365;
  direction = "left";

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  currentImg = 0;

  constructor(x, sectionStart, sectionEnd) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = x;
    this.sectionStart = sectionStart;
    this.sectionEnd = sectionEnd;
    this.speed = -(0.25 + Math.random() * 0.25);
    this.otherDirection = false;
    this.deadSoundPlayed = false;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
  }

  start() {
    this.animate();
  }

  animate() {
    this.world.registerInterval(
        setInterval(() => {
            this.handleMovementBoundaries();
            this.handleDeathState();
            this.handleMovement();
        }, 1000 / 60)
    );

    this.world.registerInterval(
      setInterval(() => {
        this.handleAnimation();
      }, 100),
    );
  }

  handleMovementBoundaries() {
    //Left boundary
    if (this.x <= this.sectionStart) {
      this.x = this.sectionStart;
      this.speed = Math.abs(this.speed);
      this.otherDirection = true;
      //Right boundary
    }
    if (this.x + this.width > this.sectionEnd) {
      this.x = this.sectionEnd - this.width;
      this.speed = -Math.abs(this.speed);
      this.otherDirection = false;
    }
  }

  handleDeathState() {
    if (this.isDead()) {
      this.speed = 0;
      audioManager.playOneTimeForObject(
        this,
        audioManager.smallChickenDeadSound,
        "deadSoundPlayed",
        0.3,
      );
    }
  }

  handleMovement() {
     this.x += this.speed;
  }

  handleAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }
}
