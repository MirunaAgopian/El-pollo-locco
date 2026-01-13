class Level {
    enemies;
    clouds;
    backgroundObjects;
    separators;
    level_end_x = 2800;
   
    constructor(enemies, clouds, backgroundObjects, separators) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.separators = separators;
    }
    
}