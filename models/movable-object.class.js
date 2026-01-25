class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    previousY = 0;
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

    playAnimationOnce(images){
        let i = this.currentImg;
        this.img = this.imageCache[images[i]];
        this.currentImg++;
        if(this.currentImg >= images.length){
            this.currentImg = images.length - 1;
            return true;
        }
        return false;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    moveRight(){
        this.x += this.speed;
    }

    applyGravity(){
        setInterval(() => {
            //added now
            this.previousY = this.y;
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

    isColliding(mo) { 
        const a = this.getHitbox(); 
        const b = mo.getHitbox(); 
        return ( 
            a.right > b.left && 
            a.left < b.right && 
            a.bottom > b.top && 
            a.top < b.bottom 
        ); 
    }

    isCollidingFromAbove(mo){
        const a = this.getHitbox(); 
        const b = mo.getHitbox()
        const isFalling = this.speedY < 0;
        const prevBottom = this.previousY + this.height - this.offset.bottom;
        const wasAboveBefore = prevBottom <= b.top;
        const isNowOverlappingVertically = a.bottom >= b.top;
        const horizontallyOverlapping = a.right > b.left && a.left < b.right;
        return ( isFalling && wasAboveBefore && isNowOverlappingVertically && horizontallyOverlapping );
    }

  

    getHitbox(){ 
        return { 
            left: this.x + this.offset.left, 
            right: this.x + this.width - this.offset.right, 
            top: this.y + this.offset.top, 
            bottom: this.y + this.height - this.offset.bottom 
        }; 
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

    // throw(){
    //     this.isThtrown = true;
    //     this.speedY = 30;
    //     this.applyGravity();
    //     setInterval(()=>{
    //         this.x += 10;
    //     }, 25);
    // }

    calculateIdleTimer(seconds){
        const threshold = seconds * 1000;
        let startTime = null;
        return {
            start(){
                if(startTime === null) {
                    startTime = Date.now();
                }
            },
            hasReached(){
                if(startTime === null) return false;
                return Date.now() - startTime >= threshold;
            },
            reset(){
                startTime = null;
            }
        };
    }

}

