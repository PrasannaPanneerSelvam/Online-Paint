import BaseAreaOperation from './BaseAreaOperation.js';

/********************** Right angled triangle ************************/

class RightAngledTriangleOperation extends BaseAreaOperation {
  constructor() {
    function drawFunction({ ctx, startX, startY, endX, endY, selectedColor }) {
      const bottomLeft = [startX, endY];

      ctx.beginPath();
      ctx.strokeStyle = selectedColor;

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineTo(...bottomLeft);
      ctx.lineTo(startX, startY);

      ctx.closePath();
      ctx.stroke();
    }

    super(drawFunction);
  }
}

export default RightAngledTriangleOperation;
