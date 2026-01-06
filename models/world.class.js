class World {
    character = new Character();
    level = LEVEL_1;
    context;
    canvas;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard){
        this.context = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld(){
        this.character.world = this;
    }

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)) {
                    this.character.energy -= 5;
                    // console.log('collision with', this.character.energy);                       
                }
            });
        }, 200);
    }

    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.context.translate(-this.camera_x, 0)
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(mo) {
        this.context.save();
        if(mo.otherDirection){
            this.flipImageBackwards(mo);
        } else {
            this.flipImageForwards(mo);
        }
        this.context.restore();

        //test for collision
        this.drawFrame(mo);  
    }

    drawFrame(mo){
         //test for collision
         if(mo instanceof Character || mo instanceof Chicken) {
            this.context.beginPath();
            this.context.lineWidth = 4;
            this.context.strokeStyle = 'blue';
            this.context.rect(mo.x, mo.y, mo.width, mo.height);
            this.context.stroke();
         }
    }

    flipImageForwards(mo){
        this.context.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

    flipImageBackwards(mo){
        this.context.translate(mo.x + mo.width, 0);
        this.context.scale(-1, 1);
        this.context.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
    }

}