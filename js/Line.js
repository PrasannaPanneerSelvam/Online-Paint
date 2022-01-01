import BaseAreaOperation from './BaseAreaOperation.js';

/********************** Line ************************/

class LineOperation extends BaseAreaOperation {
  constructor() {
    function drawFunction({ ctx, startX, startY, endX, endY }) {
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.closePath();
      ctx.stroke();
    }

    super(drawFunction);
  }
}

export default LineOperation;
