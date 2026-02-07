class CollectibleSystem {
  constructor(world) {
    this.world = world;
  }

  checkCoinCollect() {
    this.world.level.coins.forEach((coin) => {
      if (this.world.character.isColliding(coin)) {
        this.collectItem(coin);
      }
    });
  }

  checkBottleCollect() {
    this.world.level.bottles.forEach((bottle) => {
      if (this.world.character.isColliding(bottle)) {
        if (this.world.character.bottleCount < this.world.character.maxBottle) {
          this.collectItem(bottle);
          this.world.character.manageBottleCount(+1);
        }
      }
    });
  }

  collectItem(item) {
    const type = item.type;
    if (type === "coin") {
      this.world.coinBar.setPercentage(this.world.coinBar.percentage + 20);
      audioManager.playOneShot(audioManager.collectCoinSound, 0.2);
    }
    if (type == "bottle") {
      this.world.bottleBar.setPercentage(this.world.bottleBar.percentage + 20);
      audioManager.playOneShot(audioManager.collectBottleSound, 0.2);
    }
    this.removeCollectibleItem(item);
  }

  removeCollectibleItem(item) {
    const type = item.type;
    if (type === "coin") {
      this.world.level.coins = this.world.level.coins.filter((c) => c !== item);
    }
    if (type === "bottle") {
      this.world.level.bottles = this.world.level.bottles.filter(
        (b) => b !== item,
      );
    }
  }
}
