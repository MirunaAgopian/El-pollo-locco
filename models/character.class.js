class Character extends MovableObject {
  height = 250;
  width = 110;
  y = 180;
  speed = 10;
  world;
  currentImg = 0;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    //walk to right by increasing/decreasing movement on x-axis
    setInterval(() => {
      if(this.world.keyboard.RIGHT) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if(this.world.keyboard.LEFT) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x;
    }, 1000 / 60);

    setInterval(() => {
      //walk animation - ulpoad images
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let path = this.IMAGES_WALKING[this.currentImg];
        this.img = this.imageCache[path];
        this.currentImg++;
        if (this.currentImg >= this.IMAGES_WALKING.length) {
          this.currentImg = 0;
        }
      }
    }, 50);
  }

  jump() {
    //to be continued
  }
}
