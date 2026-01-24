class EndbossBar extends DrawableObject {
    IMAGES_ENDBOSS_BAR_FULL = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    constructor(){
        super();
        this.loadImages(this.IMAGES_ENDBOSS_BAR_FULL);
        this.setPercentage(100);
        this.x = 720 - this.width - 180;
        this.y = 10;
        this.width = 250;
        this.height = 60;
        this.visible = false;
    }

    setPercentage(percentage){
    this.percentage = Math.min(percentage, 100);
    let images = this.IMAGES_ENDBOSS_BAR_FULL;
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