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
  throwableObjects = [];
  separators = [];
  intervals = [];

  constructor(canvas, keyboard) {
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    //added now
    this.bottleSystem = new BottleSystem(this);
    this.collectibleSystem = new CollectibleSystem(this);
    this.collisionSystem = new CollisionSystem(this);
    this.enemySpawner = new EnemySpawnerSystem(this);
    this.collisionSystem.setVerticalCollisionInterval();
    
    this.setWorld();
  }
  //I. DRAW World, start + stop game
  draw() {
    this.clearCanvas();
    this.moveCamera();
    this.drawWorldObjects();
    this.resetCamera();
    this.drawHUD();
    this.createDrawingLoop();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  moveCamera() {
    this.context.translate(this.camera_x, 0);
  }

  resetCamera() {
    this.context.translate(-this.camera_x, 0);
  }

  createDrawingLoop() {
    this.animationFrameId = requestAnimationFrame(() => this.draw());
  }

  drawWorldObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.separators);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
  }

  drawHUD() {
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.statusBar);
    this.addToMap(this.endbossBar);
  }

  setWorld() {
    this.character.world = this;
    this.character.start();
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
      if (enemy.start) {
        enemy.start();
      }
    });
    this.level.clouds.forEach((cloud) => {
      cloud.world = this;
      cloud.start();
    });
  }

  stopGame() {
    cancelAnimationFrame(this.animationFrameId);
    this.stopIntervals();
  }

  registerInterval(id) {
    this.intervals.push(id);
  }

  stopIntervals() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.visible === false) return;
    this.context.save();
    if (mo.otherDirection && !mo.isSplashing) {
      this.flipImageBackwards(mo);
    } else {
      this.flipImageForwards(mo);
    }
    this.context.restore();
  }

  run() {
    this.registerInterval(
      setInterval(() => {
        this.checkCollisions();
        this.bottleSystem.checkThrowObjects();
        this.checkEndbossTrigger();
        this.updateEndbossBarVisibility();
        this.enemySpawner.checkChickenWaves();
      }, 200),
    );
  }

  //II. Collision logic
  checkCollisions() {
    this.collisionSystem.checkEnemyHorizontalCollision();
    this.collisionSystem.checkSeparatorCollision();
    this.collectibleSystem.checkCoinCollect();
    this.collectibleSystem.checkBottleCollect();
    this.bottleSystem.checkBottleHitsEnemies();
  }


  updateHealthBar() {
    this.statusBar.setPercentage(this.character.energy);
  }

  updateEndbossHealthBar() {
    this.endbossBar.setPercentage(this.level.endboss.energy);
  }

  removeDeadEnemy(enemy) {
    const index = this.level.enemies.indexOf(enemy);
    if (index > -1) {
      this.level.enemies.splice(index, 1);
    }
  }

  removeBottleSplashAnimation(bottle) {
    const index = this.throwableObjects.indexOf(bottle);
    if (index > -1) {
      this.throwableObjects.splice(index, 1);
    }
  }

  flipImageForwards(mo) {
    this.context.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }

  flipImageBackwards(mo) {
    this.context.translate(mo.x + mo.width, 0);
    this.context.scale(-1, 1);
    this.context.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
  }

  checkEndbossTrigger() {
    const boss = this.level.endboss;
    if (!boss) return;
    if (this.character.x >= 2800 && this.level.endboss.isIdle) {
      this.level.endboss.triggerAlert();
      this.enemySpawner.spawnEndFightChicken();
    }
  }

  updateEndbossBarVisibility() {
    const endboss = this.level.endboss;
    const character = this.character;
    if (character.x >= 2100 && character.x < endboss.sectionEnd) {
      this.endbossBar.visible = true;
    } else {
      this.endbossBar.visible = false;
    }
  }

  spawnBottle(x, y) {
    let bottle = new Bottle(x, y);
    this.level.bottles.push(bottle);
  }

  isFinalSection() {
    return this.character.x >= 2200 && this.character.x <= 2800;
  }
}
