class Bottle extends CollectibleObject {
    static BOTTLE_IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];
    constructor(x, y){
        super(x, y, 60, 60, Bottle.BOTTLE_IMAGES, 'bottle');
        this.offset = { top: 10, bottom: 8, left: 20, right: 10  };
    }
}