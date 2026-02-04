/**
 * Represents the status of the character's energy level.
 * It updates its state according to the number of hits the character gets.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /**
   * Array of strings containing images paths for the health bar.
   */
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
   * Creates the status bar UI element and positions it on the canvas.
   * It also initializes its default image (100% fill).
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.setPercentage(100);
    this.x = 0;
    this.y = 80;
    this.width = 250;
    this.height = 60;
  }

  /**
   * Updates the bar's fill level by displaying the image corresponding to the percentage
   * @param {number} percentage - the current health percentage of the status bar
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let images = this.IMAGES_HEALTH;
    let path = images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the image index corresponding to the percentage of the bar.
   * @returns {number} - the index of the image to display from the array with image paths.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
