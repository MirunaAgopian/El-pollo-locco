class CoinBar extends DrawableObject {
    IMAGES_COIN = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
   ];

   IMAGES_COIN_FULL = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
   ];

   constructor(){
    super();
    this.loadImages(this.IMAGES_COIN);
    this.loadImages(this.IMAGES_COIN_FULL);
    this.setPercentage(0);
    this.x = 0;
    this.y = 40;
    this.width = 250;
    this.height = 60;
   }

   setPercentage(percentage){
    this.percentage = Math.min(percentage, 100);
    let images = this.percentage > 0 ? this.IMAGES_COIN_FULL : this.IMAGES_COIN;
    let path = images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
   }

   resolveImageIndex(){
    if(this.percentage == 100) {
        return 5;
    } else if(this.percentage > 80){
        return 4;
    } else if(this.percentage > 60){
        return 3;
    } else if(this.percentage > 40){
        return 2;
    } else if(this.percentage > 20){
        return 1;
    } else {
        return 0;
    }
   }
}