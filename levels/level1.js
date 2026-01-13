let enemies = [];


const LEVEL_1 = new Level (
    [
        new Chicken(1500), 
        new Chicken(1500), 
        new Chicken(1500),
        new Chicken(1500), 
        new Chicken(400), 
        new Chicken(200),
        new Endboss()
    ],
    [
        new Cloud(3200),
        new Cloud(3200),
        new Cloud(3200),
        new Cloud(3200),
        new Cloud(3200),
        new Cloud(3200),
        new Cloud(3200),
        new Cloud(3200),
        new Cloud(3200)
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

        new BackgroundObject('img/5_background/layers/air.png', 720*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720*2),

        new BackgroundObject('img/5_background/layers/air.png', 720 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 720* 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720* 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720* 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720* 4),

    ],
    [
        new SeparatorObject('img/5_background/small_cactus.png', 1000, 300, 160, 140),
        new SeparatorObject('img/5_background/big_cactus.png', 2200, 330, 140, 120),
        new SeparatorObject('img/5_background/start.png', -8, 280, 80, 140)
    ]
);
