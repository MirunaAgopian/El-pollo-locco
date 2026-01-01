class Cloud extends MovableObject{
    y = 45;
    width = 350;
    height = 250;
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 700;
        this.animate();
    }

    animate(){
        this.moveLeft();
    }
}