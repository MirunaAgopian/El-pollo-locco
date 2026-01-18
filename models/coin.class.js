class Coin extends CollectibleObject {
  static  COIN_IMAGES = [
        'img/8_coin/coin_1.png'
    ];
    constructor(x, y) {
        super(x, y, 80, 80, Coin.COIN_IMAGES, 'coin');
        this.offset = { top: 20, bottom: 20, left: 20, right: 20 };
    }
}