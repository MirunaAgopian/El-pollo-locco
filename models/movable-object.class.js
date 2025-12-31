class MovableObject {
    x = 80;
    y = 240;
    img;
    height = 150;
    width = 80;
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    moveRight(){
        console.log('object moving right');  
    }
    moveLeft(){
        console.log('object moving left');
        
    }
}

