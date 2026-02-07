class CollisionSystem {
    constructor(world) {
        this.world = world;
    }

    //Works at 5 FPS
    checkEnemyHorizontalCollision() {
    this.world.level.enemies.forEach((enemy) => {
      if (
        enemy.energy > 0 &&
        this.world.character.isColliding(enemy) &&
        !this.world.character.isCollidingFromAbove(enemy) &&
        !this.world.character.isHurt()
      ) {
        this.world.character.hit();
        this.world.updateHealthBar();
      }
    });
  }

  //Works at 60FPS
  checkVerticalEnemyCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (
        enemy.energy > 0 &&
        this.world.character.isColliding(enemy) &&
        this.world.character.isCollidingFromAbove(enemy)
      ) {
        this.handleEnemyStomp(enemy);
        setTimeout(() => this.world.removeDeadEnemy(enemy), 500);
      }
    });
  }

  handleEnemyStomp(enemy) {
    enemy.energy = 0;
    this.world.character.speedY = 25;
    if (this.world.isFinalSection() && enemy instanceof SmallChicken) {
      this.world.spawnBottle(enemy.x, enemy.y);
    }
  }

  setVerticalCollisionInterval() {
    this.world.registerInterval(
      setInterval(() => {
        this.checkVerticalEnemyCollisions();
      }, 1000 / 60),
    );
  }

  checkSeparatorCollision() {
    this.world.level.separators.forEach((separator) => {
      if (
        (this.world.character.isColliding(separator) ||
          this.world.character.isCollidingFromAbove(separator)) &&
        !this.world.character.isHurt()
      ) {
        this.world.character.hit();
        this.world.updateHealthBar();
      }
    });
  }

}