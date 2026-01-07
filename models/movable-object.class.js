class MovableObject {
    x = 80;
    y = 240;
    img;
    height = 150;
    width = 80;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        //loops through the image arrays for each character
        let i = this.currentImg % images.length;
        let path = images[i]
        this.img = this.imageCache[path];
        this.currentImg++;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    moveRight(){
        this.x += this.speed;
    }

    applyGravity(){
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0 ) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        return this.y < 180;
    }

    jump() { 
        this.speedY = 25; 
    }

    isColliding(mo) {
        return this.x + this.width > mo.x && 
        this.y + this.height > mo.y && 
        this.x < mo.x + mo.width &&
        this.y < mo.y + mo.height;
    }

    hit(){
        this.energy -= 5;
        if(this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead(){
        return this.energy === 0;
    }  

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;//difference in miliseconds
        timePassed = timePassed / 1000; //difference in seconds
        return timePassed < 1;
    } 
}

