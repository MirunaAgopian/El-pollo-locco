class World {
    character = new Character();
    enemies = LEVEL_1.enemies;
    clouds = LEVEL_1.clouds;
    backgroundObjects = LEVEL_1.backgroundObjects;
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
    }

    setWorld(){
        this.character.world = this;
    }

    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
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