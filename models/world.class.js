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
    endbossBar = new EndbossBar();
    throwableObjects= [];
    separators = [];
    endFightChickens = [];
    chickensPerWave = 3;

    constructor(canvas, keyboard){
        this.context = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
        this.setVerticalCollisionInterval();
    }

    setWorld(){
        this.character.world = this;
    }

    draw(){
        // 1. Clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //2. camera moves for world objects
        this.context.translate(this.camera_x, 0);
        //3. world is being drawn
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.separators);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        //4.camera reset
        this.context.translate(-this.camera_x, 0)
        //5.draw Heads‑Up Display
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.statusBar);
        this.addToMap(this.endbossBar);
        //6.drawing loop
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    
    addToMap(mo) {
        if(mo.visible === false) return;
        this.context.save();
        if(mo.otherDirection && !mo.isSplashing){
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
            mo instanceof Bottle || mo instanceof Endboss || mo instanceof ThrowableObject) { 
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
            this.checkEndbossTrigger();
            this.updateEndbossBarVisibility();
            this.checkChickenWaves();
        }, 200);
    }

    checkCollisions(){
        this.checkEenemyHorizontalCollision();
        this.checkSeparatorCollision();
        this.checkCoinCollisions();
        this.checkBottleCollect();
        this.checkBottleHitsEnemies();

    }

    //Refractor:
    //Works at 5FPS
    checkEenemyHorizontalCollision(){ 
        this.level.enemies.forEach(enemy => { 
            if (enemy.energy <= 0) return; 
            if (this.character.isColliding(enemy)) { 
                if (!this.character.isCollidingFromAbove(enemy)) { 
                    if (!this.character.isHurt()) { 
                        this.character.hit(); 
                        this.updateHealthBar();  
                    } 
                } 
            } 
        }); 
    }

    //Works at 60FPS
    checkVerticalEnemyCollisions() { 
        this.level.enemies.forEach(enemy => { 
            if (enemy.energy <= 0) return; 
            if (this.character.isColliding(enemy)) { 
                if (this.character.isCollidingFromAbove(enemy)) { 
                    this.handleEnemyStomp(enemy); 
                    setTimeout(() => this.removeDeadEnemy(enemy), 500); 
                } 
            } 
        }); 
    }

    setVerticalCollisionInterval(){
        setInterval(() => {
            this.checkVerticalEnemyCollisions();
        }, 1000 / 60);
    }

    checkSeparatorCollision(){
        this.level.separators.forEach((separator) => {
            if(this.character.isCollidingFromAbove(separator) || this.character.isColliding(separator)) {
                this.character.hit();
                this.updateHealthBar();
            }
        });
    }

    checkCoinCollisions(){
        this.level.coins.forEach(coin => {
            if(this.character.isColliding(coin)) {
                this.collectItem(coin);
            }
        });
    }

    checkBottleCollect(){
        this.level.bottles.forEach(bottle => { 
            if(this.character.isColliding(bottle)) { 
                if(this.character.bottleCount < this.character.maxBottle){
                    this.collectItem(bottle); 
                    this.character.manageBottleCount(+1);
                }
            } 
        });
    }

    checkBottleHitsEnemies(){
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if(enemy instanceof Endboss && !bottle.hasHit &&
                    bottle.isColliding(enemy)){
                    this.handleBottleHitEndboss(bottle, enemy);
                    this.updateEndbossHealthBar();
                    this.playSoundEffect(audio.effects.bottleHit, 0.2);
                }

                if((enemy instanceof Chicken || enemy instanceof SmallChicken) && !bottle.hasHit
                    && bottle.isColliding(enemy)) {
                    this.handleBottleHitRegularEnemy(bottle, enemy);
                    this.playSoundEffect(audio.effects.bottleHit, 0.2);
                }
            });
        });
    }

    handleBottleHitEndboss(bottle, endboss) {
        bottle.hasHit = true;
        endboss.hurt();
        this.isSplashing = true;
        bottle.speedY = 0;
        bottle.acceleration = 0;
        bottle.isThrown = false;
        clearInterval(bottle.throwInterval);
        bottle.playAnimation(bottle.THROWABLE_BOTTLE_SPLASH_IMG);
        setTimeout(()=> {
            this.removeBottleSplashAnimation(bottle);
        }, 200);
        if(endboss.isDead()){
            this.handleEndbossDeath();
        }
    }

    handleBottleHitRegularEnemy(bottle, enemy){
        bottle.hasHit = true;
        bottle.markForRemoval = true;
        enemy.energy = 0;
        this.isSplashing = true;
        bottle.speedY = 0;
        bottle.acceleration = 0;
        bottle.isThrown = false;
        clearInterval(bottle.throwInterval);
        bottle.playAnimation(bottle.THROWABLE_BOTTLE_SPLASH_IMG);
        setTimeout(()=> {
            this.removeBottleSplashAnimation(bottle);
        }, 200);
        this.removeDeadEnemy(enemy);
    }

    updateHealthBar(){
        this.statusBar.setPercentage(this.character.energy);
    }

    updateEndbossHealthBar(){
        this.endbossBar.setPercentage(this.level.endboss.energy);
        console.log('Endboss energy level:', this.level.endboss.energy);
        
    }

    handleEnemyStomp(enemy) { 
        enemy.energy = 0; 
        this.character.speedY = 25; 
        if(this.isFinalSection() && enemy instanceof SmallChicken){
            this.spawnBottle(enemy.x, enemy.y);
        }
    }
    
    removeDeadEnemy(enemy) { 
        const index = this.level.enemies.indexOf(enemy); 
        if (index > -1) { 
            this.level.enemies.splice(index, 1); 

        } 
    }

    handleEndbossDeath(endboss){
        this.removeDeadEnemy(endboss);
    }

    removeBottleSplashAnimation(bottle){
        const index = this.throwableObjects.indexOf(bottle);
        if(index > -1) {
            this.throwableObjects.splice(index, 1);
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
            this.playSoundEffect(audio.effects.collectCoin, 0.3);
        }
        if(type == 'bottle'){
            this.bottleBar.setPercentage(this.bottleBar.percentage + 20);
            this.playSoundEffect(audio.effects.collectBottle, 0.2);
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
        if(this.keyboard.THROW && this.character.bottleCount > 0) {
            this.character.manageBottleCount(-1);
            let bottle = new ThrowableObject(
                this.character.x + 40, 
                this.character.y + 10, 
                this.character.otherDirection
            );
            this.throwableObjects.push(bottle);
            audio.effects.bottleThrow.play();
        }
    }

    checkEndbossTrigger(){
        const boss = this.level.endboss;
        if(!boss) return;
        if(this.character.x >= 2800 && this.level.endboss.isIdle){
            this.level.endboss.triggerAlert();
            this.spawnEndFightChicken();
        }
    }

    updateEndbossBarVisibility(){
        const endboss = this.level.endboss;
        const character = this.character;
        if(character.x >= 2100 && character.x < endboss.sectionEnd){
            this.endbossBar.visible = true;
        } else {
            this.endbossBar.visible = false;
        }
    }

    spawnEndFightChicken(){
        for(let index = 0; index < this.chickensPerWave; index++){
            let chicken = new SmallChicken(3200, 2400, 2800);
            chicken.x = 2 + Math.random() * 400;
            chicken.y = 365; 
            chicken.speed -= 0.3;
            this.endFightChickens.push(chicken);
            this.level.enemies.push(chicken);   
        }
    }

    
    checkChickenWaves(){
        const alive = this.endFightChickens.filter(c => c.energy > 0);
        if(alive.length === 0){
            this.spawnEndFightChicken();
        }
    }

    spawnBottle(x, y){
        let bottle = new Bottle(x, y);
        this.level.bottles.push(bottle);
    }

    isFinalSection(){
        return this.character.x >= 2200 && this.character.x <= 2800;
    }

    playSoundEffect(sound, volume = 1) { 
        const s = sound.cloneNode();
        s.volume = volume;
        s.play(); 
    }
}