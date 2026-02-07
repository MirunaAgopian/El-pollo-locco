class EnemySpawnerSystem {
  constructor(world) {
    this.world = world;
    this.endFightChickens = [];
    this.chickensPerWave = 3;
  }

  spawnEndFightChicken() {
    const positions = this.createSpacingBetweenChickens();
    positions.forEach((x) => {
      const chicken = this.createEndFightChicken(x);
      this.registerEndFightChicken(chicken);
    });
  }

  createEndFightChicken(x) {
    const chicken = new SmallChicken(x, 2400, 2800);
    chicken.y = 365;
    chicken.world = this.world;
    chicken.start();
    return chicken;
  }

  registerEndFightChicken(chicken) {
    this.endFightChickens.push(chicken);
    this.world.level.enemies.push(chicken);
  }

  createSpacingBetweenChickens() {
    const minDistance = 40;
    const usedPositions = [];
    const spawnStart = 2400;
    const spawnWidth = 400;
    for (let i = 0; i < this.chickensPerWave; i++) {
      let x;
      let attempts = 0;
      do {
        x = spawnStart + Math.random() * spawnWidth;
        attempts++;
      } while (
        usedPositions.some((prevX) => Math.abs(prevX - x) < minDistance) &&
        attempts < 50
      );
      usedPositions.push(x);
    }
    return usedPositions;
  }
  checkChickenWaves() {
    const alive = this.endFightChickens.filter((c) => c.energy > 0);
    if (alive.length === 0) {
      this.spawnEndFightChicken();
    }
  }
}
