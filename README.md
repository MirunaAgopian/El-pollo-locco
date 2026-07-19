# El-pollo-locco
_A 2D jump&run game created with JavaScript Object Oriented Programming, mimicking traditional platformers like "Mario"._

<div align="center">
  <img src="assets/img/epl_project__img.png" width="600" />
</div>

**1. Gameplay**

Assist Pepe, the main character in his journey, navigating though the Mexican desert, in a lively world filled with chickens, chicks, and one very angry giant pollo.
Collect bottles, gather coins, avoid damage, and prepare for the final fight with the endboss.

**2. Start the game**

Open the index.html file in your browser.
No build tools. No dependencies. Just pure JavaScript.

**3. Controls**

| Key       |   Action   | 
|---------- |------------|
|Arrow left | Move left  |
|Arrow right| Move right |
|   Space   | Jump       |
|     D     |Throw bottle|

**4. Clone the repository**
```bash
git clone https://github.com/MirunaAgopian/el-pollo-loco.git
```
**5. Project structure**
```bash
📁 el-pollo-loco
 ├── index.html
 ├── style.css
 ├── script.js
 ├── js/
 │   ├── debug.js
 │   ├── game.js
 ├── levels/
 │   ├── level1.js
 ├── models/
 │   ├── audio-manager.class.js
 │   ├── background-object.class.js
 │   ├── bottle-bar.class.js
 │   ├── bottle.class.js
 │   ├── character.class.js
 │   ├── chicken.class.js
 │   ├── cloud.class.js
 │   ├── coin-bar.class.js
 │   ├── coin.class.js
 │   ├── collectible-object.class.js
 │   ├── drawable-object.class.js
 │   ├── egg.class.js
 │   ├── endboss-bar.class.js
 │   ├── endboss.class.js
 │   ├── keyboard.class.js
 │   ├── level.class.js
 │   ├── movable-object.class.js
 │   ├── separator-object.class.js
 │   ├── small-chicken.class.js
 │   ├── status-bar.class.js
 │   ├── throwable-object.class.js
 │   ├── world.class.js
 ├── systems/
 │   ├── bottle-system.js
 │   ├── character-animation-system.js
 │   ├── collectibles-system.js
 │   ├── collision-system.js
 │   ├── enemy-spawner.js
 ├── html/
 │   ├── legal-notice.html
 │   ├── privacy-policy.html
 ├── audio/
 ├── img/
 ├── fonts/
 ├── LICENSE
 └── README.md
 ```

**6. Development Notes**

- Built entirely without frameworks to strengthen core JavaScript fundamentals

- Manual collision detection for full control

- Sprite‑based animations with frame indexing

- Designed for clarity, maintainability, and learning

**7. License**

Released under the MIT License.
Feel free to learn from it, modify it, or build your own version.
