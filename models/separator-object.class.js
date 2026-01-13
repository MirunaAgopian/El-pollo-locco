class SeparatorObject extends DrawableObject {
    offset = { top: 10, left: 40, right: 40, bottom: 0 };
    
    constructor(path, x, y, width, height){
        super();
        this.loadImage(path);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}