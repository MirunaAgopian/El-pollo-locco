class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    //for vertical collision
    previousY = 0;
    //Adjusting sprites rectangle 'padding'
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


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
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    jump() { 
        this.speedY = 25; 
    }

    // isColliding(mo) {
    //     return this.x + this.width > mo.x && 
    //     this.y + this.height > mo.y && 
    //     this.x < mo.x + mo.width &&
    //     this.y < mo.y + mo.height;
    // }

    isColliding(mo) { 
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; 
    }
   
    isCollidingFromAbove(mo) { 
        const horizontallyOverlapping = 
        this.x + this.width > mo.x && 
        this.x < mo.x + mo.width; 
        
        const isFalling = this.speedY < 0;

        const wasAboveBefore = 
        this.previousY + this.height <= mo.y; 

        const isNowOverlappingVertically = 
        this.y + this.height > mo.y; 

        return horizontallyOverlapping && isFalling && wasAboveBefore && isNowOverlappingVertically; 
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
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000; 
        return timePassed < 1;
    } 

    throw(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(()=>{
            this.x += 10;
        }, 25);
    }
    
}

