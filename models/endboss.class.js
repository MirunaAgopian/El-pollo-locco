class Endboss extends MovableObject {
    height = 250;
    width= 160;
    y = 190;
    speed = 0;
    currentImg = 0;
    offset = { top: 60, left: 30, right: 10, bottom: 5 };
    
    IMAGES_IDLE = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
    ]
    
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor(x, sectionStart, sectionEnd){
        super();
        this.loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
        this.x = x;
        this.sectionStart = sectionStart;
        this.sectionEnd = sectionEnd;
        this.speed = 6;
        this.isIdle = true;
        this.isAlert = false;
        this.isActive = false;
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate(){
        setInterval(() => {
            // if(this.isDead){
            //     this.playAnimation(this.IMAGES_DEAD);
            //     return;
            // }
            // if(this.isHurt){
            //     this.playAnimation(this.IMAGES_HURT);
            //     return;
            // }
            if(this.isAlert) {
                let finished = this.playAnimationOnce(this.IMAGES_ALERT);
                if(finished){
                    this.isAlert = false;
                    this.isActive = true;
                    this.currentImg = 0;
                }
                return;
            }
            if(this.isActive) {
                this.playWalkAnimation();
                return;
            }
            if(this.isIdle) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 150);
    }


    playWalkAnimation(){
        this.playAnimation(this.IMAGES_WALKING);
        if(this.x > this.sectionStart) {
            this.moveLeft();
        }
    }


    triggerAlert(){
        if(this.isIdle){
            this.isIdle = false;
            this.isAlert = true;
            this.currentImg = 0;
        }
    }

}