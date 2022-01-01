import BaseAreaOperation from './BaseAreaOperation.js';

/********************** Rectangle ************************/

class RectangleOperation extends BaseAreaOperation {
  constructor() {
    function drawFunction({ ctx, startX, startY, endX, endY }) {
      const topRight = [endX, startY],
        bottomLeft = [startX, endY];

      ctx.beginPath();
      ctx.strokeStyle = 'red';

      ctx.moveTo(startX, startY);
      ctx.lineTo(...topRight);
      ctx.lineTo(endX, endY);
      ctx.lineTo(...bottomLeft);
      ctx.lineTo(startX, startY);

      ctx.closePath();
      ctx.stroke();
    }

    super(drawFunction);
  }
}

export default RectangleOperation;
