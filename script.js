let highestZ = 1;
class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  
  init(paper) {
    document.addEventListener('mousemove', (e) => this.handleMove(e.clientX, e.clientY));
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });
  }
  
  handleMove(clientX, clientY) {
    if (!this.rotating) {
      this.mouseX = clientX;
      this.mouseY = clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
    }
    const dirX = clientX - this.mouseTouchX;
    const dirY = clientY - this.mouseTouchY;
    const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
    const dirNormalizedX = dirX / dirLength;
    const dirNormalizedY = dirY / dirLength;
    const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
  }
}
