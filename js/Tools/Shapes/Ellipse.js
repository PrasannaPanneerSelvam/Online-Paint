import BaseAreaOperation from './BaseAreaOperation.js';

/********************** Ellipse ************************/

class EllipseOperation extends BaseAreaOperation {
  constructor() {
    function drawFunction({ ctx, startX, startY, endX, endY }) {
      const delX = endX - startX,
        delY = endY - startY,
        xC = delX / 2,
        yC = delY / 2;

      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.ellipse(
        startX + xC,
        startY + yC,
        Math.abs(delX) / 2,
        Math.abs(delY) / 2,
        0,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }

    super(drawFunction);
  }
}

export default EllipseOperation;
