import BaseAreaOperation from './BaseAreaOperation.js';
import { midRange } from './../Common.js';

/********************** Right angled triangle ************************/

class TriangleOperation extends BaseAreaOperation {
  constructor() {
    function drawFunction({ ctx, startX, startY, endX, endY, selectedColor }) {
      const bottomLeft = [startX, endY],
        topCenter = [midRange(startX, endX), startY];

      ctx.beginPath();
      ctx.strokeStyle = selectedColor;

      ctx.moveTo(...topCenter);
      ctx.lineTo(endX, endY);
      ctx.lineTo(...bottomLeft);
      ctx.lineTo(...topCenter);

      ctx.closePath();
      ctx.stroke();
    }

    super(drawFunction);
  }
}

export default TriangleOperation;
