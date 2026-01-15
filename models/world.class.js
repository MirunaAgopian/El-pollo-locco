class World {
    character = new Character();
    level = LEVEL_1;
    context;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects= [];
    separators = [];

    constructor(canvas, keyboard){
        this.context = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.assignChickenBoundaries();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //camera moves for world objects
        this.context.translate(this.camera_x, 0);
        //world is being drawn
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.separators);

        //camera reset
        this.context.translate(-this.camera_x, 0)
        //draw Heads‑Up Display
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.statusBar);
        //drawing loop
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
         //test for collision
        this.drawFrame(mo); 

        this.context.restore(); 
    }

    //test for collision - rectangle
    drawFrame(mo) { 
        if (mo instanceof Character || mo instanceof Chicken || mo instanceof SeparatorObject || mo instanceof SmallChicken) { 
            const hb = mo.getHitbox(); 
            this.context.beginPath(); 
            this.context.lineWidth = 2; 
            this.context.strokeStyle = 'red'; 
            this.context.rect( hb.left, hb.top, hb.right - hb.left, hb.bottom - hb.top ); 
            this.context.stroke(); 
        } 
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }


    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            //vertical collision ckeck
        if(this.character.isColliding(enemy)) {
            if(this.character.isCollidingFromAbove(enemy)) {
                this.handleEnemyStomp(enemy);

                setTimeout(()=> {
                    this.removeDeadEnemy(enemy);
                }, 500);
            } else {
                //horizontal collision check
                this.character.hit();
                console.log('HORIZONTAL collision with chicken, energy:', this.character.energy);
            }                
        }
        });

        this.level.separators.forEach((separator) => {
            if(this.character.isCollidingFromAbove(separator) || this.character.isColliding(separator)) {
                this.character.hit();
            }
        });
    }

    handleEnemyStomp(enemy) { 
        enemy.energy = 0; 
        this.character.speedY = 20; 
        console.log('collision with chicken from ABOVE'); 
    }

    
    removeDeadEnemy(enemy) { 
        const index = this.level.enemies.indexOf(enemy); 
        if (index > -1) { this.level.enemies.splice(index, 1); 

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

    checkThrowObjects(){
        if(this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    assignChickenBoundaries() { 
        const s = this.level.separators.sort((a, b) => a.x - b.x); 
        const section1Start = s[0].x + s[0].width; 
        const section1End = s[1].x; 

        const section2Start = s[1].x; 
        const section2End = s[2].x; 

        const section3Start = s[2].x; 
        const section3End = this.level.level_end_x; 

        this.level.enemies.forEach(enemy => { 
            if (enemy instanceof Chicken) { 
                if (enemy.x < section1End) { 
                    enemy.setMovementBoundaries(section1Start, section1End); 
                } else if (enemy.x < section2End) { 
                    enemy.setMovementBoundaries(section2Start, section2End); 
                } else { 
                    enemy.setMovementBoundaries(section3Start, section3End); 
                } 
            } 
        }); 
    }

}