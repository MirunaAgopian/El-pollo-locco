class ThrowableObject extends MovableObject {
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

    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.throw();
        // this.loadImages();
        // this.animate();
    }

    // animate(){
    //     setInterval(()=> {
    //         if(this.throw()) {
    //             this.playAnimation(this.THROWABLE_BOTTLE_IMG);
    //         } else {
    //         if(this.isReached()){
    //             this.playAnimation(this.THROWABLE_BOTTLE_SPLASH_IMG);
    //         }
    //     }
    //     });
    // }

}