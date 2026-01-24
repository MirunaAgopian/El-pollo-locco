class ThrowableObject extends MovableObject {
    currentImg = 0;
    THROWABLE_BOTTLE_IMG = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    THROWABLE_BOTTLE_SPLASH_IMG = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, direction){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.isThrown = false;
        this.isSplashing = false;
        this.otherDirection = direction;
        this.loadImages(this.THROWABLE_BOTTLE_IMG);
        this.loadImages(this.THROWABLE_BOTTLE_SPLASH_IMG);
        this.throw();
        this.animate();
    }


    animate(){
        setInterval(()=> {
            if(this.isThrown) {
                this.playAnimation(this.THROWABLE_BOTTLE_IMG);
            }
        }, 1000 / 60);
    }

    throw(){
        this.isThrown = true;
        this.speedY = 10;
        this.applyGravity();
        this.throwInterval = setInterval(()=>{
            if(this.otherDirection){
                this.x -= 10;
            } else if(!this.otherDirection) {
                this.x += 10;
            }
        }, 25);
    }

 //generate enemies and bottles for final fight 
 //animate Endboss + statusbar Endboss
 //add sound effects
}