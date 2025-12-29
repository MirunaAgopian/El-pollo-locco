class Cloud extends MovableObject{
    y = 15;
    width = 350;
    heigth = 200;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 700;
    }
}