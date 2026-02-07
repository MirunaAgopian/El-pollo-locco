class BottleSystem {
  constructor(world) {
    this.world = world;
  }

  createThrowBottle() {
    return new ThrowableObject(
      this.world.character.x + 40,
      this.world.character.y + 10,
      this.world.character.otherDirection,
    );
  }

  checkThrowObjects() {
    if (this.world.keyboard.THROW && this.world.character.bottleCount > 0) {
      this.world.character.manageBottleCount(-1);

      const bottle = this.createThrowBottle();

      bottle.world = this.world;
      bottle.start();
      this.world.throwableObjects.push(bottle);
      audioManager.playOneShot(audioManager.throwBottleSound, 0.3);
    }
  }

  checkBottleHitsEnemies() {
    this.world.throwableObjects.forEach((bottle) => {
      if (bottle.hasHit) return;

      this.world.level.enemies.forEach((enemy) => {
        if (bottle.hasHit) return;
        if (!bottle.isColliding(enemy)) return;

        this.handleBottleEnemyCollision(bottle, enemy);
      });
    });
  }

  handleBottleEnemyCollision(bottle, enemy) {
    if (enemy instanceof Endboss) {
      this.handleBottleHitEndboss(bottle, enemy);
      this.world.updateEndbossHealthBar();
    }
    if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
      this.handleBottleHitRegularEnemy(bottle, enemy);
    }
    audioManager.playOneShot(audioManager.bottleCollisionSound, 0.3);
  }

  handleBottleHitRegularEnemy(bottle, enemy) {
    bottle.hasHit = true;
    this.killRegularEnemy(enemy);
    this.stopBottleMovement(bottle);
    this.startBottleSplash(bottle);
    this.scheduleBottleRemoval(bottle);
  }

  killRegularEnemy(enemy) {
    enemy.energy = 0;
    this.world.removeDeadEnemy(enemy);
  }

  stopBottleMovement(bottle) {
    bottle.speedY = 0;
    bottle.acceleration = 0;
    clearInterval(bottle.throwInterval);
  }

  startBottleSplash(bottle) {
    bottle.isSplashing = true;
    bottle.isThrown = false;
    bottle.img = bottle.imageCache[bottle.THROWABLE_BOTTLE_SPLASH_IMG[0]];
    bottle.playSplashAnimation();
  }

  scheduleBottleRemoval(bottle) {
    setTimeout(() => {
      this.world.removeBottleSplashAnimation(bottle);
    }, 200);
  }

  handleBottleHitEndboss(bottle, endboss) {
    bottle.hasHit = true;
    this.applyEndbossDamage(endboss);
    this.stopBottleMovement(bottle);
    this.startBottleSplash(bottle);
    this.scheduleBottleRemoval(bottle);
  }

  applyEndbossDamage(endboss) {
    endboss.hurt();
    if (endboss.isDead()) {
      this.handleEndbossDeath();
    }
  }

  handleEndbossDeath(endboss) {
    this.world.removeDeadEnemy(endboss);
  }
}
