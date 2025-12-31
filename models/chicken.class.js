class Chicken extends MovableObject {
    height = 50;
    width= 35;
    y = 385;
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * 500;
    }

     die(){
        //to be continued
    }
}