class CoinBar extends DrawableObject {
    IMAGES_COIN = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
   ];

   constructor(){
    super().loadImages(this.IMAGES_COIN);
    this.setPercentage(100);
    this.x = 0;
    this.y = 40;
    this.width = 250;
    this.height = 60;
   }

   setPercentage(percentage){
    this.percentage = percentage;
    let path = this.IMAGES_COIN[this.resolveImageIndex()];
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