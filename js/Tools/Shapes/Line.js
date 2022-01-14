import BaseAreaOperation from './BaseAreaOperation.js';

/********************** Line ************************/

class LineOperation extends BaseAreaOperation {
  constructor() {
    function drawFunction({ ctx, startX, startY, endX, endY, selectedColor }) {
      ctx.beginPath();
      ctx.strokeStyle = selectedColor;
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.closePath();
      ctx.stroke();
    }

    super(drawFunction);
  }
}

export default LineOperation;
