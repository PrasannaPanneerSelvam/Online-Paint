import BaseAreaOperation from './BaseAreaOperation.js';
import { midRange } from './../Common.js';

/********************** Rectangle ************************/

class DiamondOperation extends BaseAreaOperation {
  constructor() {
    function drawFunction({ ctx, startX, startY, endX, endY }) {
      const midX = midRange(startX, endX),
        midY = midRange(startY, endY);

      ctx.beginPath();
      ctx.strokeStyle = 'red';

      ctx.moveTo(midX, startY);
      ctx.lineTo(endX, midY);
      ctx.lineTo(midX, endY);
      ctx.lineTo(startX, midY);
      ctx.lineTo(midX, startY);

      ctx.closePath();
      ctx.stroke();
    }

    super(drawFunction);
  }
}

export default DiamondOperation;
