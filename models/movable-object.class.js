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
        let i = this.currentImg % this.IMAGES_WALKING.length;
        let path = images[i]
        this.img = this.imageCache[path];
        this.currentImg++;
    }
    moveLeft(){
        //moves the chickens to left
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
    applyGravity(){
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
    isAboveGround(){
        return this.y < 180;
    }
}

