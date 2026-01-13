class SeparatorObject extends DrawableObject {
    offset = { top: 10, left: 30, right: 30, bottom: 0 };
    
    constructor(path, x, y, width, height){
        super();
        this.loadImage(path);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}