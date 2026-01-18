class CollectibleObject extends DrawableObject {
    offset = { top: 0, bottom: 0, left: 0, right: 0 };
    constructor(x, y, width, height, images, type){
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.loadImages(images);
        this.img = this.imageCache[images[0]];
    }

    //Hitbox for collision test
      getHitbox(){ 
        return { 
            left: this.x + this.offset.left, 
            right: this.x + this.width - this.offset.right, 
            top: this.y + this.offset.top, 
            bottom: this.y + this.height - this.offset.bottom 
        }; 
    }
}