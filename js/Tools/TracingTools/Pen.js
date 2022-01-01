import BaseTraceOperation from './BaseTraceOperation.js';

class PenOperation extends BaseTraceOperation {
  constructor() {
    const pointSize = 1;
    function tracePenTool({ ctx, x, y }) {
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.rect(x, y, pointSize, pointSize);
      ctx.stroke();
    }

    super(tracePenTool);
  }
}

export default PenOperation;
