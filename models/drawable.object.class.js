class DrawableObject {
    x = 80;
    y = 240;
    height = 150;
    width = 80;
    img; 
    imageCache = {};

     loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

      loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}