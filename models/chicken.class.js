class Chicken extends MovableObject {
    height = 60;
    width= 40;
    y = 360;
    direction = 'left';
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    currentImg = 0;

    constructor(levelEnd){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.levelEnd = levelEnd;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD); 
        this.x = 300 + Math.random() * (levelEnd);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate(){
        setInterval( () => {
            if(!this.isDead()) {
                this.moveLeft();
            } if(this.x < 150) {
                this.x = 150 ;
                this.speed *= -1;
                this.otherDirection = true;
            }
        }, 1000 / 60);

    

        setInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
} 


