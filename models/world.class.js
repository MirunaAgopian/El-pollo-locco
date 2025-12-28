class World {
    context;
    canvas;
    character = new Character();
    enemies = [
        new Chicken(), 
        new Chicken(), 
        new Chicken()
    ];

    constructor(canvas){
        this.context = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.context.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
}