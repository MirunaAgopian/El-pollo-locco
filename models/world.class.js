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
        this.setWorld();
        this.draw();
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
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

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
        if (mo instanceof Character || mo instanceof Chicken 
            || mo instanceof SeparatorObject || 
            mo instanceof SmallChicken || mo instanceof Coin ||
            mo instanceof Bottle) { 
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
                this.updateHealthBar();
                console.log('HORIZONTAL collision with object, energy:', this.character.energy);
            }                
        }
        });

        this.level.separators.forEach((separator) => {
            if(this.character.isCollidingFromAbove(separator) || this.character.isColliding(separator)) {
                this.character.hit();
                this.updateHealthBar();
            }
        });

        this.level.coins.forEach(coin => {
            if(this.character.isColliding(coin)) {
                this.collectItem(coin);
            }
        });

        this.level.bottles.forEach(bottle => { 
            if(this.character.isColliding(bottle)) { 
                this.collectItem(bottle); 
            } 
        });
    }

    updateHealthBar(){
        this.statusBar.setPercentage(this.character.energy);
    }

    handleEnemyStomp(enemy) { 
        enemy.energy = 0; 
        this.character.speedY = 20; 
        console.log('collision with object from ABOVE'); 
    }

    
    removeDeadEnemy(enemy) { 
        const index = this.level.enemies.indexOf(enemy); 
        if (index > -1) { 
            this.level.enemies.splice(index, 1); 

        } 
    }

    removeCollectibleItem(item) {
        const type = item.type;
        if(type === 'coin') {
            this.level.coins = this.level.coins.filter(c=> c !== item);
        }
        if(type === 'bottle'){
            this.level.bottles = this.level.bottles.filter(b => b !== item);
        }
    }

    collectItem(item){
        const type = item.type;
        if(type === 'coin'){
            this.coinBar.setPercentage(this.coinBar.percentage + 20);
            console.log("CoinBar percentage:", this.coinBar.percentage);
        }
        if(type == 'bottle'){
            this.bottleBar.setPercentage(this.bottleBar.percentage + 20);
            console.log("BotteBar percentage:", this.bottleBar.percentage);
        }

        this.removeCollectibleItem(item);
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
}