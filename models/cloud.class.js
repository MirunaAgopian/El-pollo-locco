class Cloud extends MovableObject{
    y = 10;
    width = 350;
    height = 300;
    constructor(levelEnd){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.levelEnd = levelEnd;
        this.x = Math.random() * this.levelEnd;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            if(this.x + this.width < 10) {
                this.x = this.levelEnd;
            }
        }, 1000 / 40);
        
    }
}