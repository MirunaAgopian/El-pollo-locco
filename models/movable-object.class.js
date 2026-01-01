class MovableObject {
    x = 80;
    y = 240;
    img;
    height = 150;
    width = 80;
    imageCache = {};
    speed = 0.15;

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
    moveRight(){
        console.log('object moving right'); 
        //to be continued 
    }
    moveLeft(){
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}

