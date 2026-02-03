/**
 * Draws the hitbox of a movable object for collision check
 * To be called as a method inside addToMap(mo)
 * @param {Object} mo - The game object to draw the hitbox for.
 */
  function drawFrame(mo) {
    if (
      mo instanceof Character ||
      mo instanceof Chicken ||
      mo instanceof SeparatorObject ||
      mo instanceof SmallChicken ||
      mo instanceof Coin ||
      mo instanceof Bottle ||
      mo instanceof Endboss ||
      mo instanceof ThrowableObject
    ) {
      const hb = mo.getHitbox();
      this.context.beginPath();
      this.context.lineWidth = 2;
      this.context.strokeStyle = "red";
      this.context.rect(
        hb.left,
        hb.top,
        hb.right - hb.left,
        hb.bottom - hb.top,
      );
      this.context.stroke();
    }
  }